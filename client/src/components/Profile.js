import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  FormErrorMessage,
  extendTheme,
  ChakraProvider,
  Link,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const customTheme = extendTheme({
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);
  const [mobileNoError, setMobileNoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleNameInputChange = (e) => {
    setFullname(e.target.value);
    setFullnameError(false);
  };

  const handleMobileInputChange = (e) => {
    setMobileNo(e.target.value);
    setMobileNoError(false);
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullname.length < 5) {
      setFullnameError(true);
      return;
    }
    if (mobileNo.length !== 10 || !/^\d+$/.test(mobileNo)) {
      setMobileNoError(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    }
    setEmail("");
    setFullname("");
    setMobileNo("");
    setPassword("");
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
        console.log("Logged out");
      })
      .catch((error) => {
        console.log("Logout error:", error);
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
              <Link>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      border: "none",
                    }}
                  />
                ) : (
                  <IconButton
                    icon={<FaUserCircle size={100} />}
                    aria-label="Upload Image"
                    variant="ghost"
                    color="white"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  />
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageInputChange}
                />
              </Link>
            </VStack>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl isInvalid={fullnameError}>
                <Input
                  value={fullname}
                  onChange={handleNameInputChange}
                  placeholder="Fullname"
                  bg="white"
                  mt={5}
                />
                {fullnameError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Name should have at least 5 characters
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={emailError}>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailInputChange}
                  placeholder="E-mail"
                  bg="white"
                  mt={5}
                />
                {emailError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Invalid email address
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={mobileNoError}>
                <Input
                  type="tel"
                  value={mobileNo}
                  onChange={handleMobileInputChange}
                  placeholder="Contact"
                  bg="white"
                  mt={5}
                />
                {mobileNoError && (
                  <FormErrorMessage fontSize="sm" color="red">
                    Invalid mobile number (10 digits expected)
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
              </FormControl>
              <Flex justify="space-between" w="100%" mt={8}>
                <Button type="submit" bg="brandBlue" size="lg" color="white">
                  Save
                </Button>
                <Button
                  variant="outline"
                  bg="red.500"
                  size="lg"
                  onClick={handleLogout}
                  color="white"
                >
                  Logout
                </Button>
              </Flex>
            </form>
          </VStack>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default Profile;
