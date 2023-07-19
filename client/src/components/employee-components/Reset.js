import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  Center,
  FormErrorMessage,
  extendTheme,
  ChakraProvider,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock } from "react-icons/ai";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordInputChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    // Reset password logic
    // ...
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Center bgGradient="linear(to-b, brandBlue, brandLightBlue)" h="100vh">
        <Box
          w={["full", "md"]}
          p={[8, 10]}
          mt={[20, "10vh"]}
          mx="auto"
          border={["none", "1px"]}
          borderColor={["", "gray.300"]}
          borderRadius={10}
          h="90%"
        >
          <VStack spacing={6} align="center" justify="space-around" h="100%">
            <VStack spacing={2} align="center" w="full">
              <Heading align="center" fontSize="6xl" color="white">
                Staff Minder
              </Heading>
              <Icon as={AiOutlineLock} boxSize={20} color="brandBlue" mt={5} />
              <Text color="white">Enter new password to reset</Text>
            </VStack>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl isInvalid={passwordError}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordInputChange}
                  placeholder="New Password"
                  bg="white"
                  pr={showPassword ? "2.5rem" : "1rem"}
                />
                {passwordError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Password must contain at least 6 characters with uppercase, lowercase, digit, and special character
                  </FormErrorMessage>
                )}
                <Button
                  position="absolute"
                  right="1rem"
                  top="50%"
                  transform="translateY(-50%)"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={handleTogglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  zIndex={1}
                  mt={1}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} color="#999" />
                  ) : (
                    <AiFillEye size={20} color="#999" />
                  )}
                </Button>
              </FormControl>
              <FormControl isInvalid={confirmPasswordError}>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordInputChange}
                  placeholder="Confirm Password"
                  bg="white"
                  mt={5}
                  pr={showConfirmPassword ? "2.5rem" : "1rem"}
                />
                {confirmPasswordError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Passwords do not match
                  </FormErrorMessage>
                )}
                <Button
                  position="absolute"
                  right="1rem"
                  top="50%"
                  transform="translateY(-50%)"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={handleToggleConfirmPassword}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  zIndex={1}
                  mt={3}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible size={20} color="#999" />
                  ) : (
                    <AiFillEye size={20} color="#999" />
                  )}
                </Button>
              </FormControl>
              <Button
                bg="#1D5D9B"
                w="full"
                type="submit"
                fontSize="sm"
                fontWeight="bold"
                letterSpacing="wide"
                color="white"
                mt={5}
              >
                Reset
              </Button>
            </form>
           
          </VStack>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default Reset;
