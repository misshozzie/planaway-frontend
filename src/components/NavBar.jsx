//Navigation Bar
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/planaway.png";
import { Container } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { logoutUser } from "../services/user";

const NavBar = ({ username, setUser }) => {
  // const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    //const isUser = Cookies.get("user");
    if (username) {
      navigate(`user/trips?username=${username}`);
      // let parseUser = isUser?.substring(2);
      // setUser(JSON?.parse(parseUser));
    } else {
      navigate("/login");
    }
  }, []);

  const logout = async () => {
    // try {
    //   Cookies.remove("user");
    //   toast.success("Logout Successfully");
    //   navigate("/login");
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg="whitesmoke">
      <Container minW={"90%"} bg="whitesmoke">
        <Flex
          bg="whitesmoke"
          as="nav"
          align="center"
          justify="space-between"
          padding="1rem"
          width={"100%"}
        >
          <Link to={`user/trips?username=${username}`}>
            <Box maxH={"80px"}>
              <img src={logo} style={{ maxWidth: "50px" }} alt="logo" />
            </Box>
          </Link>
          <Flex align="center" bg="whitesmoke">
            <Text fontSize={"x1"} me={10} bg="whitesmoke">
              Welcome, {username}
            </Text>

            <Menu bg="whitesmoke">
              <MenuButton as={Button} bg="whitesmoke">
                Account
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <Link to="/profile">
                    <MenuItem textColor={"black"}>Profile</MenuItem>
                  </Link>
                  <MenuItem textColor={"black"} onClick={logout}>
                    Logout
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;
