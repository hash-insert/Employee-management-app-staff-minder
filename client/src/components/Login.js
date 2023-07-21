import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  Input,
  Button,
  Center,
  FormErrorMessage,
  extendTheme,
  ChakraProvider,
  Link,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45CFDD",
  },
});
const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    // Password validation using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success("Logged In successfully");
        onLogin(); // Call the onLogin prop to inform the parent component about successful login
        navigate("/admin-dashboard");
        console.log("Admin login successfully");
      })
      .catch((error) => {
        console.log("Error creating user:", error);
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      });
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
          <VStack spacing={6} align="center" h="100%">
            <VStack spacing={2} align="center" w="full" mb={20}>
              <Heading align="center" fontSize="6xl" color="white">
                Staff Minder
              </Heading>
            </VStack>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl isInvalid={emailError}>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailInputChange}
                  placeholder="E-mail"
                  bg="white"
                />
                {emailError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Invalid email address
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={passwordError}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordInputChange}
                  placeholder="Password"
                  bg="white"
                  mt={5}
                  pr={showPassword ? "2.5rem" : "1rem"}
                />
                {passwordError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Invalid password
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
                  mt={3}
                >
                  {showPassword ? (
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
                disabled={submitButtonDisabled}
              >
                Login
              </Button>
              <Text color="white" mt={2} align="center">
                <Link href="#">Forget Password?</Link>
              </Text>
            </form>
          </VStack>
        </Box>
      </Center>
    </ChakraProvider>
  );
};
export default Login;