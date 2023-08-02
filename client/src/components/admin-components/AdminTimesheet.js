import React from "react";
import {
  Box,
  Button,
  Center,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import Calendar from "./AdminCalendar";
import EventForm from "./AdminEventForm";


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
 // const [status, setStatus] = React.useState("pending");
  const [form, setForm] = React.useState(false);
  

  //const handleForm = () => {
    //setForm(true);
  //};

  /*
  useEffect(() => {
    // Fetch the current status from the backend when the component mounts
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/employees/timesheets/:timesheetId'); // Replace '/api/status' with your backend API endpoint to get the status
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axios.post('http://localhost:8000/api/employees/timesheets/timesheetId', { status: newStatus }); // Replace '/api/status' with your backend API endpoint to update the status
      setStatus(newStatus); // Update the status in the frontend state
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  */

  

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
    <Box>

<Center>
        

        <Button
          //onClick={() => updateStatus('approved')}
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
          //onClick={() => updateStatus('pending')}
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
          //onClick={() => updateStatus('rejected')}
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
          />
        </ChakraProvider>
      )}

      {/* Display the LongLeaveForm when showLongLeaveForm is true */}
     
    </Box>
  );
};

export default Timesheet;