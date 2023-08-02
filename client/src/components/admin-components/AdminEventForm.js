import React, { useState } from 'react';

const EventForm = ({onClose,onSubmit}) => {
    const [formData, setFormData] = useState({
      date: "",
      empName:"",
      startTime: "",
      endTime: "",
      file:"",
      note: "",
      
    });
    const getTimeDifference = () => {
        const startTime = new Date(`1970-01-01T${formData.startTime}`);
        const endTime = new Date(`1970-01-01T${formData.endTime}`);
        const timeDiffInMs = endTime - startTime;
        const hours = Math.floor(timeDiffInMs / 1000 / 60 / 60);
        const minutes = Math.floor((timeDiffInMs / 1000 / 60) % 60);
        const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
    
      return `${formattedHours}:${formattedMinutes} hrs`;
      };
    }

    export default EventForm;
