import React, { useState } from 'react';
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
    Heading,
    Divider,
  } from "@chakra-ui/react";
  

const EventForm = ({onClose,onSubmit}) => {
  const [formData, setFormData] = useState({
    date: "",
    empName:"",
    startTime: "",
    endTime: "",
    file:"",
    note: "",
    email:"",
    timeDifference:"",
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTimeDifference = () => {
    const startTime = new Date(`1970-01-01T${formData.startTime}`);
    const endTime = new Date(`1970-01-01T${formData.endTime}`);
    const timeDiffInMs = endTime - startTime;
    const hours = Math.floor(timeDiffInMs / 1000 / 60 / 60);
    const minutes = Math.floor((timeDiffInMs / 1000 / 60) % 60);
    const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = "Please enter a date.";
    }
    if (!formData.empName) {
      newErrors.empName = "Please enter a from empname.";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Please enter a from time.";
    }
    if (!formData.endTime) {
      newErrors.endTime = "Please enter a to time.";
    }
    if (!formData.file) {
      newErrors.file = "Please enter a file.";
    }
    if (!formData.note) {
      newErrors.note = "Please enter a note.";
    }
    if (!formData.email) {
      newErrors.email = "Please enter an email.";
    }
     const startTime = new Date(`1970-01-01T${formData.startTime}`);
    const endTime = new Date(`1970-01-01T${formData.endTime}`);
    if (startTime >= endTime) {
      newErrors.endTime = "End time should be greater than start time.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form
      const timeDifference = getTimeDifference();
      setIsSubmitting(true);
      // Perform API call or other operations here
      // Pass the form data to the parent component
   //setFormData((prevFormData) => ({ ...prevFormData, timeDifference }));
      //console.log({...formData,timeDifference})
      //onClose();
      try {
        // Check if employee with given email exists in the database
        const employeesResponse = await axios.get(
          `http://staff-minder-backend.onrender.com/api/employees?email=${formData.email}`
        );

        console.log(employeesResponse);

        const employees = employeesResponse.data;

        console.log(employees);

        const employee = employees.find((emp) => emp.email === formData.email);

        console.log(employee);
        if (!employees || employees.length === 0) {
          // Employee with the given email does not exist
          newErrors.email = "Employee with this email does not exist.";
          setErrors(newErrors);
          setIsSubmitting(false);
          return;
        }
        // Create the leave request data
        const leaveRequestData = {
          employeeId: employee._id,
          employeeName: employee.name,
          email: formData.email,
          status: "pending",
          date: formData.date,
          fromTime: formData.startTime,
          toTime: formData.endTime,
          documents: formData.file,
          notes:formData.note,
          //timeDifference
        
        };

        // Make a POST request to create the leave request
        const response = await axios.post(
          "http://staff-minder-backend.onrender.com/api/employee/timesheets",{...leaveRequestData,timeDifference}
          
        );

        // Assuming the backend responds with the saved data, you can access it from the response object
        console.log("event request saved:", response.data);

        // Reset the form and close the modal
        setFormData({
          date: "",
          empName:"",
          startTime: "",
          endTime: "",
          file:null,
          note: "",
          email:""
        });
        setErrors({});
        setIsSubmitting(false);
        
        onClose();
       // window.location.reload();
      } catch (error) {
        // Handle any errors that occurred during the API request
        console.error("Error while saving leave request:", error.response.data);
        setIsSubmitting(false);
      }
    }
  

    
    
  };

  const handleCancel = () => {
    setFormData({
      date: "",
      empName:"",
      startTime: "",
      endTime: "",
      file:null,
      note: "",
      email:""
    });
    setErrors({});
    onClose();
  };


  return (
    <Box
    position="fixed"
    top="0"
    left="0"
    width="100%"
    height="100%"
    backgroundColor="rgba(0, 0, 0, 0.5)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    zIndex="9999"
  >
    <Box
      maxW="sm"
      mx="auto"
      borderWidth="1px"
      borderColor="white"
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      zIndex="10000"
    >
    
    <Heading as="h2" size="lg" textAlign="center" mb={4}>
          ADD
        </Heading>
        <Divider borderColor="white" mb={4} />
        <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.email} mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.date}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.empName} mt={4}>
            <FormLabel>Employee Name</FormLabel>
            <Input
              type='text'
              name="empName"
              value={formData.empName}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.empName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.startTime} mt={4}>
            <FormLabel>From Time</FormLabel>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.startTime}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.endTime} mt={4}>
            <FormLabel>To Time</FormLabel>
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.endTime}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.file} mt={4}>
            <FormLabel>Documents</FormLabel>
            <Input
              type = 'file'
              name="file"
              value={formData.file}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.file}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.note} mt={4}>
            <FormLabel>Note</FormLabel>
            <Textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.note}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            isLoading={isSubmitting}
          >
            Save
          </Button>

          <Button colorScheme="red" mt={4} ml={2} onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default EventForm;
