import React from "react";
import {
  ChakraProvider,
  Center,
  extendTheme,
  VStack,
  Text,
  Box,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45CFDD",
  },
});
const Dashboard = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Center bgGradient="linear(to-b, brandBlue, brandLightBlue)" h="100vh">
        <VStack spacing={6} align="center">
          <Box
            p={4}
            bg="transparent"
            borderRadius="md"
            shadow="md"
            color="white"
            textAlign="center"
          >
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              About Us
            </Text>
            <Text>
              Welcome to Staff Minder! Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer sed diam eget lacus venenatis elementum.
              Nullam bibendum risus eget lacus volutpat, eget semper lorem
              tempus. Nam id ante dui. Curabitur id scelerisque leo.
            </Text>
            <Center>
              <Image src={image1} alt="Image 1" mt={4} borderRadius="md" />
            </Center>{" "}
          </Box>
          <Box
            p={4}
            bg="transparent"
            borderRadius="md"
            shadow="md"
            color="white"
            textAlign="center"
          >
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Contact Us
            </Text>
            <Text>
              If you have any questions or need assistance, please don't
              hesitate to reach out to us. You can contact our support team at
              support@staffminder.com or call us at +1 123-456-7890.
            </Text>
            <SimpleGrid columns={3} spacing={2} mt={4}>
              <Image src={image2} alt="Image 2" borderRadius="md" />
              <Image src={image3} alt="Image 3" borderRadius="md" />
              <Image src={image1} alt="Image 1" borderRadius="md" />
            </SimpleGrid>
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};
export default Dashboard;