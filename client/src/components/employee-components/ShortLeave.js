import React, { useState } from "react";
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

const ShortLeaveForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    reason: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = "Please enter a date.";
    }
    if (!formData.fromTime) {
      newErrors.fromTime = "Please enter a from time.";
    }
    if (!formData.toTime) {
      newErrors.toTime = "Please enter a to time.";
    }
    if (!formData.reason) {
      newErrors.reason = "Please enter a reason.";
    }
    if (!formData.email) {
      newErrors.email = "Please enter an email.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form
      setIsSubmitting(true);
      try {
        // Check if employee with given email exists in the database
        const employeesResponse = await axios.get(
          `https://staff-minder-backend.onrender.com/api/employees?email=${formData.email}`
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
          fromTime: formData.fromTime,
          toTime: formData.toTime,
          leaveType: "short",
          reason: formData.reason,
        };

        // Make a POST request to create the leave request
        const response = await axios.post(
          "https://staff-minder-backend.onrender.com/api/employee/shortleaverequest",
          leaveRequestData
        );

        // Assuming the backend responds with the saved data, you can access it from the response object
        console.log("Leave request saved:", response.data);

        // Reset the form and close the modal
        setFormData({
          fromTime: "",
          toTime: "",
          reason: "",
          email: "",
        });
        setErrors({});
        setIsSubmitting(false);
        onClose();
        window.location.reload();
      } catch (error) {
        // Handle any errors that occurred during the API request
        console.error("Error while saving leave request:", error);
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      date: "",
      fromTime: "",
      toTime: "",
      reason: "",
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
        p={5}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        zIndex="10000"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          Apply Short Leave
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

          <FormControl isInvalid={!!errors.fromTime} mt={4}>
            <FormLabel>From Time</FormLabel>
            <Input
              type="time"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.fromTime}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.toTime} mt={4}>
            <FormLabel>To Time</FormLabel>
            <Input
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.toTime}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.reason} mt={4}>
            <FormLabel>Reason</FormLabel>
            <Textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.reason}</FormErrorMessage>
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
};

export default ShortLeaveForm;
