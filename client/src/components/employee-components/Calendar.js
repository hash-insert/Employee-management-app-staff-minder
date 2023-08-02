
import React, { useEffect, useState } from 'react';
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
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Calendar({ events, onDayClick }) {
  const [calenderevents, setCalenderEvents] = useState([]);
 

  useEffect(() => {
    // Fetch events from MongoDB
    // Example using axios:
    // axios.get('/api/events').then(response => setEvents(response.data));
    //  fetchEvents();
//}, []);

    // For demonstration, let's use mock data
    const mockEvents = [
      {
        title: "event1",
        date: "2023-07-17",
        empName:"John",
        note: "Vacation",
        fromTime: "10:00 ",
        toTime: "02:00",
      },
      {
        title: "event2",
        empName:"James",
        date: "2023-07-18",
        note: "Personal Leave",
        fromTime: "09:00 AM",
        toTime: "01:30 PM",
      },
      
      ...events,
    ];
    setCalenderEvents(mockEvents);
  }, [events]);

 /* const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/employee/employeeId/timesheets'); // Replace '/api/events' with your backend API endpoint to fetch events
      setCalendarEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
*/
  

  const renderEventDetails = (event) => {
      return `
        
        <p>Date: ${event.extendedProps.date}</p>
        <p>Employee Name: ${event.extendedProps.empName}</p>
        <p>From: ${event.extendedProps.startTime}</p>
        <p>To: ${event.extendedProps.endTime}</p>
        <p>Note: ${event.extendedProps.note}</p>
        <p>Attachements:${event.extendedProps.file}</p>
        
      `;
    
  };

  return (
    <div>
    
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={calenderevents}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            //title: info.event.title,
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