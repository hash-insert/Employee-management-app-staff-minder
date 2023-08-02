import React from "react";
import {
  Box,
  Button,
  Center,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import Calendar from "./EmployeeCalendar";
import EventForm from "./Form";
import EmployeeNavbar from "./EmployeeNavbar";
import { useUserContext } from "../../UserContext";

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
    file : null,
    note:null,
  });
  const [form, setForm] = React.useState(false);
  //const [showLongLeaveForm, setShowLongLeaveForm] = React.useState(false);
  const { userEmail } = useUserContext();
  console.log("userEmail:", userEmail);
  //const handleApplyLeave = () => {
    //setShowLongLeaveForm(true);
  //};

  const handleForm = () => {
    setForm(true);
  };

  const updateCalendarEvents = (eventData) => {
    setCalendarEvents([...calendarEvents, eventData]);
  };

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
    <div>
       <EmployeeNavbar />
    <Box>

      <Calendar
        onDayClick={handleDateSelect}
        value={selectedDates}
        events={calendarEvents}
        userEmail={userEmail}
      />

      <Center>
        <Button
          onClick={handleForm}
          disabled={!selectedDates.endDate}
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
      {form && (
        <ChakraProvider theme={customTheme}>
          <EventForm
            onClose={() => setForm(false)}
            onSubmit={(formData) => {
              // Add a new short leave event to the calendar
              const newEvent = {
                
                date: formData.date,
                title:formData.timeDifference,
                //title:formData.empName,
                //color: "green",
                extendedProps: {
                  date: formData.date,
                  empName:formData.empName,
                  startTime: formData.startTime,
                  endTime: formData.endTime,
                  file: formData.file,
                  note: formData.note,
                },
              };
              updateCalendarEvents(newEvent);
              setForm(false);
            }}
            updateCalendarEvents={updateCalendarEvents}
          />
        </ChakraProvider>
      )}

      {/* Display the LongLeaveForm when showLongLeaveForm is true */}
     
    </Box>
    </div>
  );
};

export default Timesheet;