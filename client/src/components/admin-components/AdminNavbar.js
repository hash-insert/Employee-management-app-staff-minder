import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  extendTheme,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  ChakraProvider,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
  },
});

const AdminNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const location = useLocation();

  const isCurrentRoute = (path) => {
    return location.pathname === path;
  };


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box
        as="nav"
        position="sticky"
        top="0"
        zIndex="sticky"
        backgroundColor="blue.500"
        color="white"
      >
        <Flex align="center" justify="space-between" padding="1rem">
          <Box display="flex" alignItems="center">
            <Link href="/profile">
              <IconButton
                as={FaUserCircle}
                fontSize="2xl"
                marginRight="1rem"
                variant="unstyled"
              />
            </Link>
            <Text fontSize="xl" fontWeight="bold">
              Staff Minder
            </Text>
          </Box>
          {/* Display links for larger screens */}
          {isLargerThanMd ? (
           <Box display="flex" alignItems="center">
           <Link
             href="/leave-requests"
             p="4"
             color={isCurrentRoute("/leave-requests") ? "blue.300" : "white"}
             fontWeight="bold"
           >
             Leave Requests
           </Link>
           <Link
             href="/timesheets"
             p="4"
             color={isCurrentRoute("/timesheets") ? "blue.300" : "white"}
             fontWeight="bold"
           >
             Timesheets
           </Link>
           <Link
             href="/employees"
             p="4"
             color={isCurrentRoute("/employees") ? "blue.300" : "white"}
             fontWeight="bold"
           >
             Employees
           </Link>
           <Link
             href="/teams"
             p="4"
             color={isCurrentRoute("/teams") ? "blue.300" : "white"}
             fontWeight="bold"
           >
             Teams
           </Link>
         </Box>
          ) : (
            // Display hamburger icon for small screens
            <IconButton
              as={FaBars}
              fontSize="2xl"
              variant="unstyled"
              onClick={toggleDrawer}
              aria-label="Toggle Navigation"
            />
          )}
          <Drawer isOpen={isDrawerOpen} placement="right" onClose={toggleDrawer}>
            <DrawerOverlay>
              <DrawerContent bg="gray.100">
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <VStack spacing={4} align="stretch">
                    <Link href="/leave-requests" p="4" color="black" fontWeight="bold">
                      Leave Requests
                    </Link>
                    <Link href="/timesheets" p="4" color="black" fontWeight="bold">
                      Timesheets
                    </Link>
                    <Link href="/employees" p="4" color="black" fontWeight="bold">
                      Employees
                    </Link>
                    <Link href="/teams" p="4" color="black" fontWeight="bold">
                      Teams
                    </Link>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default AdminNavbar;
