import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LeaveCalendar({ events, onDayClick }) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    // Fetch events from MongoDB
    // Example using axios:
    // axios.get('/api/events').then(response => setEvents(response.data));
    // For demonstration, let's use mock data
    const mockEvents = [
      {
        title: "Leave1",
        start: "2023-07-17",
        reason: "Vacation",
        fromTime: "10:00 AM",
        toTime: "02:00 PM",
      },
      {
        title: "Leave2",
        start: "2023-07-18",
        reason: "Personal Leave",
        fromTime: "09:00 AM",
        toTime: "01:30 PM",
      },
      ...events,
    ];
    setCalendarEvents(mockEvents);
  }, [events]);

  const renderEventDetails = (event) => {
    if (event.title === "Short Leave") {
      return `
        <p>From: ${event.extendedProps.fromTime}</p>
        <p>To: ${event.extendedProps.toTime}</p>
        <p>${event.extendedProps.reason}</p>
      `;
    } else {
      return `<p>${event.extendedProps.reason}</p>`;
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={calendarEvents}
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
export default LeaveCalendar;