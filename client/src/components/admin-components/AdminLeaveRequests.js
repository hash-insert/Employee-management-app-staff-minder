import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  extendTheme,
  ChakraProvider,
  Center,
  Text,
} from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const AdminLeaveRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      status: "pending",
      fromDate: "2023-07-01",
      toDate: "2023-07-05",
      leaveType: "sick leave",
    },
    {
      id: 3,
      employeeName: "Mark Johnson",
      status: "pending",
      fromDate: "2023-07-15",
      toDate: "2023-07-18",
      leaveType: "vacation",
    },
  ]);
  const [reviewedRequests, setReviewedRequests] = useState([
    {
      id: 2,
      employeeName: "Jane Smith",
      status: "approved",
      fromDate: "2023-07-08",
      toDate: "2023-07-12",
      leaveType: "sick leave",
    },
  ]);

  // Filter leave requests based on search query and status
  const filteredPendingRequests = pendingRequests.filter((request) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedEmployeeName = request.employeeName.toLowerCase();
    const matchSearchQuery = normalizedEmployeeName.includes(normalizedQuery);
    const matchStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchSearchQuery && matchStatus;
  });

  const filteredReviewedRequests = reviewedRequests.filter((request) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedEmployeeName = request.employeeName.toLowerCase();
    const matchSearchQuery = normalizedEmployeeName.includes(normalizedQuery);
    const matchStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchSearchQuery && matchStatus;
  });

  // Handle status change
  const handleStatusChange = (requestId, newStatus) => {
    const updatedPendingRequests = pendingRequests.filter(
      (request) => request.id !== requestId
    );

    const updatedRequest = pendingRequests.find(
      (request) => request.id === requestId
    );

    const updatedReviewedRequest = {
      ...updatedRequest,
      status: newStatus,
    };

    setPendingRequests(updatedPendingRequests);
    setReviewedRequests([...reviewedRequests, updatedReviewedRequest]);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <AdminNavbar />
      <Center bgGradient="linear(to-b, brandBlue, brandLightBlue)" h="100vh">
        <Box w="100%" maxW="800px" p={4}>
          <Heading size="lg" mb={4} textAlign="center" color="white">
            Leave Requests
          </Heading>
          <Flex flexWrap="wrap" justifyContent="space-between" mb={4}>
            <Box
              flex={{ base: "1", sm: "auto" }}
              mb={{ base: "4", sm: "0" }}
              width={{ base: "100%", sm: "auto" }}
            >
              <Input
                placeholder="Search Employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                mr={2}
                mb={{ base: "2", sm: "0" }}
                _placeholder={{
                  color: "white", // Custom color for the placeholder
                }}
              />
            </Box>
            <Box
              flex={{ base: "1", sm: "auto" }}
              width={{ base: "100%", sm: "auto" }}
            >
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                width="100%"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Select>
            </Box>
          </Flex>
          {filteredPendingRequests.length === 0 ? (
            <Center my={8}>
              <Text fontSize="lg" color="white">
                No pending requests
              </Text>
            </Center>
          ) : (
            <Box overflowX="auto">
              <Heading size="lg" mb={4} textAlign="center" color="white">
                Pending Requests
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th bg="brandBlue" color="white" py={2}>
                      Employee Name
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Leave Type
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Status
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      From
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      To
                    </Th>
                    <Th bg="brandBlue" color="white" py={2}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredPendingRequests.map((request) => (
                    <Tr key={request.id}>
                      <Td>{request.employeeName}</Td>
                      <Td>{request.leaveType}</Td>
                      <Td>
                        <Button
                          colorScheme={
                            request.status === "pending"
                              ? "yellow"
                              : request.status === "approved"
                              ? "green"
                              : "red"
                          }
                          size="sm"
                        >
                          {request.status}
                        </Button>
                      </Td>
                      <Td>{request.fromDate}</Td>
                      <Td>{request.toDate}</Td>
                      <Td>
                        {request.status === "pending" && (
                          <>
                            <Button
                              colorScheme="green"
                              size="sm"
                              mr={2}
                              onClick={() =>
                                handleStatusChange(request.id, "approved")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(request.id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
          <Heading size="lg" m={5} textAlign="center" color="white">
            Reviewed Requests
          </Heading>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th bg="brandBlue" color="white" py={2}>
                    Employee Name
                  </Th>
                  <Th bg="brandBlue" color="white" py={2}>
                    Leave Type
                  </Th>
                  <Th bg="brandBlue" color="white" py={2}>
                    Status
                  </Th>
                  <Th bg="brandBlue" color="white" py={2}>
                    From
                  </Th>
                  <Th bg="brandBlue" color="white" py={2}>
                    To
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredReviewedRequests.map((request) => (
                  <Tr key={request.id}>
                    <Td>{request.employeeName}</Td>
                    <Td>{request.leaveType}</Td>
                    <Td>
                      <Button
                        colorScheme={
                          request.status === "approved" ? "green" : "red"
                        }
                        size="sm"
                      >
                        {request.status}
                      </Button>
                    </Td>
                    <Td>{request.fromDate}</Td>
                    <Td>{request.toDate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default AdminLeaveRequests;
