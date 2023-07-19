import React, { useEffect, useState } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Calendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Fetch events from MongoDB
    // Example using axios:
    // axios.get('/api/events').then(response => setEvents(response.data));
    // For demonstration, let's use mock data
    const mockEvents = [
      { title: 'Event 1', start: '2023-07-17' },
      { title: 'Event 2', start: '2023-07-18' },
    ];
    setEvents(mockEvents);
  }, []);
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
        events={events}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content:
              "<p>Hello</p>",
            html: true,
          });
        }}
      />
    </div>
  );
}
export default Calendar;