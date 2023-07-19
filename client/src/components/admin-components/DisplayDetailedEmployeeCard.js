import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  extendTheme,
  ChakraProvider,
  Center,
  Box,
  Image,
  Text,
  IconButton,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  VStack
} from '@chakra-ui/react';
import { FiSearch, FiEdit } from 'react-icons/fi';
import avatar from '../../assets/profile.png';
const customTheme = extendTheme({
  colors: {
    brandBlue: '#0A6EBD',
    brandLightBlue: '#45CFDD',
  },
});

const DetailedEmployeeCard = ({ employee,onClick }) => {
  return (
    <>
     <ChakraProvider theme={customTheme}>
      <Center
        bgGradient="linear(to-b, brandBlue, brandLightBlue)"
        minH="100vh"
        py="12"
        flexDir="column"
      >
         <Box
   position="absolute" top="10" w="100%"
      width={"full"}
      overflow="hidden"
      p="auto"
      boxShadow="md"
      height="50px"
      bg= "white"
    >
    <Text textAlign="center" fontWeight="bold" fontSize="xl">employee-Id:1234</Text>
    </Box>
    <Image
        src={avatar}
        alt="Profile Picture"
        boxSize="100px"
        objectFit="cover"
        mx="auto"
        position="absolute" top="150"
      />
       <Text fontWeight="bold" fontSize="xl" textAlign="center"position="absolute" top="250"  >
            Sowmya
        </Text>
    <Box
      width={"100%"}
      h = "500%"
      borderRadius="lg"
      overflow="hidden"
      p="auto"
      boxShadow="md"
      bg="white"
      position="absolute" top="350"
    >
       <Text textAlign="center">SUMMARY
            {/* {role} */}
        </Text>
      <Stack spacing="5" mt="8">
        <Text textAlign="left">Date of Joining:
        {/* {dateOfJoining} */}
        </Text>
        <Text textAlign="left">Date of Birth:
        {/* {dateOfBirth} */}
        </Text>
        <Text textAlign="left">Email:
        {/* {email} */}
        </Text>
        <Text textAlign="left">productivity:
        </Text>
        <Text textAlign="left">Experience: </Text>
      </Stack>
    </Box>
    </Center>
    </ChakraProvider>
    </>
  );
};
export default DetailedEmployeeCard;