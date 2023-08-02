
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  extendTheme,
  ChakraProvider,
  Center,
  Text,
} from "@chakra-ui/react";
//import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import EventForm from './Form';
const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

function Calendar({ events, onDayClick }) {
  const [calenderevents, setCalenderEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState("all");

  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);

    let period = "AM";
    let formattedHours = parsedHours;

    if (parsedHours > 12) {
      period = "PM";
      formattedHours = parsedHours - 12;
    } else if (parsedHours === 12) {
      period = "PM";
    } else if (parsedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter events based on the search term
  const filteredEvents = calenderevents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedEvents = filteredEvents.sort((a, b) =>
    a.extendedProps.empName.localeCompare(b.extendedProps.empName)
  );


  useEffect(() => {
    fetchAllTimesheets();
  }, []);
    // Fetch events from MongoDB
    // Example using axios:
    // axios.get('/api/events').then(response => setEvents(response.data));

    // For demonstration, let's use mock data
    const fetchAllTimesheets = () => {
      axios
        .get("http://localhost:8000/api/employees/timesheets")
        .then((response) => {
          // Assuming the response data is an array of timesheets, you can set the state accordingly.
          const allTimesheets = response.data;
          console.log(allTimesheets)
          // Transform the timesheet data to the format expected by the calendar
          const calendarEvents = allTimesheets.map((timesheet) => ({
            title: timesheet.employeeName,
            start: timesheet.date ,
            extendedProps: {
              date:timesheet.date,
              empName:timesheet.employeeName,
              startTime:formatTimeTo12Hour(timesheet.fromTime),
              endTime:formatTimeTo12Hour(timesheet.toTime),
              file:timesheet.documents,
              note: timesheet.notes,
              timespent:timesheet.timeDifference||"Na",
            },
           
          }));
          // Set the state with the transformed data
          setCalenderEvents(calendarEvents);
        })
        .catch((error) => {
          console.error("Error fetching timesheets:", error);
        });
    };
  


 

  const renderEventDetails = (event) => {
      return `
        
      <p>Date: ${event.extendedProps.date}</p>
      <p>Employee Name: ${event.extendedProps.empName}</p>
      <p>From: ${event.extendedProps.startTime}</p>
      <p>To: ${event.extendedProps.endTime}</p>
      <p>Time Spent:${event.extendedProps.timespent}</p>
      <p>Note: ${event.extendedProps.note}</p>
      <p>Attachements:${event.extendedProps.file}</p>
      `;
    
  };

  return (
    <div>
      <Center >
      
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search events"
        mr={2}
        mt={5}
        mb={{ base: "2", sm: "0" }}
        borderWidth="2px"
        borderRadius="md"
        borderColor="black"
        width = "50%"      
        />
      </Center>
          
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={sortedEvents}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: renderEventDetails(info.event),
            html: true,
          });
        }}
        dateClick={(info) => {
          onDayClick(new Date(info.dateStr));
        }}
      />
    </div>
  );
}

export default Calendar;