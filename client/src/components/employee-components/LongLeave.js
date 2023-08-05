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

const LongLeaveForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
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
    const newErrors = {};
    if (!formData.startDate) {
      newErrors.startDate = "Please enter a start date.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "Please enter an end date.";
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
      setIsSubmitting(true);

      try {
        const employeesResponse = await axios.get(
          `https://staff-minder-backend.onrender.com/api/employees?email=${formData.email}`
        );
        console.log(employeesResponse);
        const employees = employeesResponse.data;
        console.log(employees);
        const employee = employees.find((emp) => emp.email === formData.email);
        console.log(employee);
        if (!employees || employees.length === 0) {
          newErrors.email = "Employee with this email does not exist.";
          setErrors(newErrors);
          setIsSubmitting(false);
          return;
        }
        const leaveRequestData = {
          employeeId: employee._id,
          employeeName: employee.name,
          email: formData.email,
          status: "pending",
          fromDate: formData.startDate,
          toDate: formData.endDate,
          leaveType: "long",
          reason: formData.reason,
        };

        const response = await axios.post(
          "https://staff-minder-backend.onrender.com/api/employee/leaverequest",
          leaveRequestData
        );
        console.log("Leave request saved:", response.data);
        setFormData({
          startDate: "",
          endDate: "",
          reason: "",
          email: "",
        });
        setErrors({});
        setIsSubmitting(false);
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error while saving leave request:", error);
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      startDate: "",
      endDate: "",
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
          Apply Leave
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

          <FormControl isInvalid={!!errors.startDate} mt={4}>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.startDate}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.endDate} mt={4}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.endDate}</FormErrorMessage>
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

export default LongLeaveForm;
