import React from 'react';
import { Spinner } from '@chakra-ui/react';

const CustomSpinner = () => {
  return (
    <div className="text-center">
      <Spinner size="xl" my={3} />
    </div>
  );
};

export default CustomSpinner;
