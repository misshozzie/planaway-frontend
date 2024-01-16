import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading, 
  Spinner,
  Textarea,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { createOneTrip } from "../api/trips";

export default function UpdateTripForm() {
 
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
        <br />
        <Box
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="rgba(195, 226, 194, 0.30)"
          w="700px"
          h="300px"
          p="32px"
          textAlign="center"
          zIndex="2"
        >
        <form> 
        <ArrowLeftIcon />
              Go Back
        <Heading as="h2" size="l" mt={4}>
            UPDATE PLANS
        </Heading>
        <FormControl isRequired>
              <FormLabel>Destination</FormLabel>
              <Input
                backgroundColor="white"
                type="text"
                placeholder="Enter your destination"
                mb={4}
                name="destination"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                backgroundColor="white"
                type="text"
                placeholder="Enter your plans"
                mb={4}
                name="plans"
              />
            </FormControl>
          </form>
        </Box>
        <br />
        <Button
          type="submit"
          bg="#CD8D7A"
          w="280px"
          mt={4}
          spinnerPlacement="start"
          loadingText="Saving"
          _hover={{ bg: " #DBCC95" }}
        >
          SAVE
        </Button>
      </Flex>
    </>
  );
};