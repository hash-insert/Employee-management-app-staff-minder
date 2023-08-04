
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
//import Timesheet from './EmployeeTimesheet';


function Calendar({userEmail, onDayClick }) {
  const [calenderevents, setCalenderEvents] = useState([]);
 
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

  useEffect(() => {
    axios
      .get(`https://staff-minder-backend.onrender.com/api/employees`)
      .then((response) => {
        // Find the employee with the given email
        const employee = response.data.find(
          (employee) => employee.email === userEmail
        );

        if (employee) {
          //console.log(employee._id)
          axios
            .get(
              `https://staff-minder-backend.onrender.com/api/employee/${employee._id}/timesheets`
            )
            .then((TimesheetRequestsResponse) => {
              // Map the leave requests to calendar events format
              const TimesheetRequests = TimesheetRequestsResponse.data.map(
                (TimesheetRequest) => ({
                  title: TimesheetRequest.timeDifference, // You can set the title here
                  start: TimesheetRequest.date,
                  
                  //startTime:TimesheetRequest.fromTime,
                  extendedProps: {
                    date:TimesheetRequest.date,
                    empName:TimesheetRequest.employeeName,
                    startTime:formatTimeTo12Hour(TimesheetRequest.fromTime),
                    endTime:formatTimeTo12Hour(TimesheetRequest.toTime),
                    file:TimesheetRequest.documents,
                    note: TimesheetRequest.notes,
                  },
                })
              );
                  // Combine both leave requests and short leave requests into a single array
                  const allEvents = [...TimesheetRequests];
                  console.log(allEvents)
                  setCalenderEvents(allEvents);
                })
              
                .catch((error) => {
                  console.error(
                    "Error fetching employee's  timesheet requests:",
                    error
                  );
                });
            }
          })  
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [userEmail]);



  

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
        eventContent={(info) => {
          return (
            <div
              className="fc-event-title fc-sticky"
              style={{
                backgroundColor:
                  info.event.title === " ",
                color: "black",
                padding: "2px 5px",
                borderRadius: "5px",
              }}
            >
              {info.event.title}
            </div>
          );
            }}
      />
    </div>
  );
}

export default Calendar;