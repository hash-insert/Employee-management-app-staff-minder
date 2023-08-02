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

const LongLeaveForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
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
    if (!formData.startDate) {
      newErrors.startDate = "Please enter a start date.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "Please enter an end date.";
    }
    if (!formData.reason) {
      newErrors.reason = "Please enter a reason.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsSubmitting(true);

      try {
        // Make a POST request to the backend API
        const response = await axios.post(
          "http://localhost:8000/api/employee/leaverequest",
          formData
        );

        // Assuming the backend responds with the saved data, you can access it from the response object
        console.log("Leave request saved:", response.data);

        // Reset the form and close the modal
        setFormData({
          startDate: "",
          endDate: "",
          reason: "",
        });
        setErrors({});
        setIsSubmitting(false);
        onClose();
      } catch (error) {
        // Handle any errors that occurred during the API request
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
