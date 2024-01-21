//for login and signup
import React, { useEffect } from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/PAlogo.png";
import bg from "../assets/planawaybg.png";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      const jsonStartIndex = userCookie.indexOf("{");
      const jsonString = userCookie.slice(jsonStartIndex);
      // Parse the JSON string into a JavaScript object
      const userObject = JSON.parse(jsonString);
      const userName = userObject.userName;
      navigate(`/user/trips?username=${userName}`);
    }
  }, []);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        height="100vh"
        direction="column"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <Heading align="center">
          <Image src={logo} alt="planaway" height={200} />
        </Heading>
        <br />
        <Box
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="rgba(195, 226, 194, 0.30)"
          w="500px"
          h="250px"
          p="32px"
          textAlign="center"
          zIndex="2" // ensure it's above the background
        >
          <Text mb={5} fontSize="xl">
            Welcome to Planaway
          </Text>
          <br />
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
