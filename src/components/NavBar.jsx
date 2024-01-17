//Navigation Bar 
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/assets/Planaway.png";
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

const NavBar = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    useEffect (() => {
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
        <Box backgroundColor="white">
        <Container minW={"90%"}>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1rem"
            color="white"
            width={"100%"}
          >
            <Link to="/">
              <Box maxH={"80px"}>
                <img src={logo} style={{ maxWidth: "120px" }} alt="logo" />
              </Box>
            </Link>
  
            <Flex align="center">
              <Text fontSize="xl" me={10}>
                Welcome {user?.userName}
              </Text>
              <Link to="/trips">
                <Text mx={5} fontSize="xl">
                  Home
                </Text>
              </Link>
              <Link to="/trips/add">
                <Text mx={5} me={10} fontSize="xl">
                  Create
                </Text>
              </Link>
  
              <Menu>
                <MenuButton as={Button} colorScheme="gray">
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup>
                    <Link to="/profile">
                      <MenuItem textColor={"black"}>My Profile</MenuItem>
                    </Link>
                    <MenuItem textColor={"black"} onClick={logout}>
                      Logout{" "}
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