//for login and signup
import React, { useEffect } from "react";
import { Box, Flex, Heading, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import logo from "../components/assets/PAlogo.png";
import bg from "../components/assets/planawaybg.png";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      navigate("/trips");
    }
  }, []);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        height="100vh"
        bgSize="cover"
        bgPosition="center"
      >
        <Box
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          p={8}
          bg="useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')"
          color={useColorModeValue("black", "white")}
          textAlign="center"
        >
          <Heading
            mb={6}
            fontSize="5xl"
            fontWeight="bold"
            color={useColorModeValue("teal.600", "teal.300")}
          >
            Planaway
          </Heading>
          <Text mb={6} fontSize="xl">
            welcome to planaway
          </Text>
          <Link to="/login">
            <Button
              mb={4}
              colorScheme="#DBCC95"
              width="full"
              size="lg"
              bg="#CD8D7A"
              _hover="#DBCC95"
            >
              LOGIN
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button
              colorScheme="blue"
              width="full"
              size="lg"
              bg="#CD8D7A"
              _hover="#DBCC95"
            >
              SIGNUP
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};
export default HomePage;