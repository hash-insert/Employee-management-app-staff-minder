import React, { useEffect }from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import Calendar from "./AdminCalendar";
import EventForm from "./AdminEventForm";
import AdminNavbar from "./AdminNavbar";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});


const Timesheet = () => {
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [selectedDates, setSelectedDates] = React.useState({
    starttime: null,
    endtime: null,
    file : null
  });

  useEffect(() => {
    fetchAllTimesheets();
  }, []);

  //const [form, setForm] = React.useState(false);
  //const [showLongLeaveForm, setShowLongLeaveForm] = React.useState(false);

  //const handleApplyLeave = () => {
    //setShowLongLeaveForm(true);
  //};

  //const handleForm = () => {
    //setForm(true);
  //};

  const fetchAllTimesheets = () => {
    axios
      .get("http://localhost:8000/api/employees/timesheets")
      .then((response) => {
        // Assuming the response data is an array of timesheets, you can set the state accordingly.
        const allTimesheets = response.data;
        // Transform the timesheet data to the format expected by the calendar
        const calendarEvents = allTimesheets.map((timesheet) => ({
          title: timesheet.employeeName,
          //startTime: timesheet.fromTime,
          date: timesheet.date, // Assuming the timesheet represents a single day event
          // Add any other relevant properties from the timesheet object
          // such as color, description, etc.
        }));
        // Set the state with the transformed data
        setCalendarEvents(calendarEvents);
      })
      .catch((error) => {
        console.error("Error fetching timesheets:", error);
      });
  };

  //const updateCalendarEvents = (eventData) => {
   // setCalendarEvents([...calendarEvents, eventData]);
  //};

  const handleDateSelect = (date) => {
    setSelectedDates((prevDates) => {
      if (!prevDates.startDate) {
        return { startDate: date, endDate: date };
      } else if (prevDates.startDate && !prevDates.endDate) {
        return date < prevDates.startDate
          ? { startDate: date, endDate: prevDates.startDate }
          : { startDate: prevDates.startDate, endDate: date };
      } else {
        const isShortLeave = date.toDateString() === prevDates.startDate.toDateString();
        if (isShortLeave) {
          return { startDate: date, endDate: date };
        } else {
          return date > prevDates.startDate
            ? { startDate: prevDates.startDate, endDate: new Date(date.getTime() + 86400000) }
            : { startDate: date, endDate: prevDates.startDate };
        }
      }
    });
  };
  
  return (
    <Box>
<AdminNavbar/>
<Center>
        

        <Button
          //onClick={handleForm}
          //disabled={!selectedDates.endDate}
          bg="#0A6EBD"
          color="white"
          border="none"
          borderRadius="10px"
          _hover={{ bg: "#085794" }}
          _focus={{ boxShadow: "none" }}
          m={10}
          p={5}
        >
          Approved
        </Button>
        <Button
          //onClick={handleForm}
          //disabled={!selectedDates.endDate}
          bg="#0A6EBD"
          color="white"
          border="none"
          borderRadius="10px"
          _hover={{ bg: "#085794" }}
          _focus={{ boxShadow: "none" }}
          m={10}
          p={5}
        >
          Pending
        </Button>
        <Button
          //onClick={handleForm}
          //disabled={!selectedDates.endDate}
          bg="#0A6EBD"
          color="white"
          border="none"
          borderRadius="10px"
          _hover={{ bg: "#085794" }}
          _focus={{ boxShadow: "none" }}
          m={10}
          p={5}
        >
          Rejected
        </Button>
      </Center>

      <Calendar
        onDayClick={handleDateSelect}
        value={selectedDates}
        events={calendarEvents}
      />

      <Center>
        

        <Button
          //onClick={handleForm}
          //disabled={!selectedDates.endDate}
          bg="#0A6EBD"
          color="white"
          border="none"
          borderRadius="10px"
          _hover={{ bg: "#085794" }}
          _focus={{ boxShadow: "none" }}
          m={10}
          p={5}
        >
          ADD
        </Button>
      </Center>

      {/* Display the ShortLeaveForm when showShortLeaveForm is true */}
      
        
      )

      {/* Display the LongLeaveForm when showLongLeaveForm is true */}
     
    </Box>
  );
};

export default Timesheet;