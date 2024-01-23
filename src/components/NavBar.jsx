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
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const isUser = Cookies.get("user");
    if (isUser) {
      let parseUser = isUser?.substring(2);
      setUser(JSON?.parse(parseUser));
    } else {
      navigate("/login");
    }
  }, []);

  const logout = async () => {
    try {
      Cookies.remove("user");
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bgColor="white">
      <Container minW={"80%"}>
        <Flex
          as="nav"
          align="center"
          justify="flex-start"
          padding="5px"
          width={"100%"}
        >
          <Link to="/">
            <Box maxH={"80px"}>
              <img src={logo} style={{ maxWidth: "40px" }} alt="logo" />
            </Box>
          </Link>
          <Flex align="center" marginLeft="auto">
            <Text fontSize={"x1"} me={10}>
              Welcome, {user?.userName.toUpperCase()}
            </Text>

            <Menu>
              <MenuButton 
              as={Button} 
              _hover={{ bg: "#CD8D7A", color: "white" }}
              _expanded={{ bg: "#CD8D7A", color: "white" }}
              _focus={{ boxShadow: "outline" }}
              variant="ghost">
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
