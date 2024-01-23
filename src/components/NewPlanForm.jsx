import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Flex,
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
import { createPlan } from "../api/plans";
import NavBar from "./NavBar";
import { useNavigate } from "react-router";

export default function NewTripForm() {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { tripid } = useParams();
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await createPlan(formState, tripid);
      setIsLoading(false);
      // navigate("/user/trips"); // Redirect after successful submission
      if (result.error) {
        setError(result.error);
      } else {
        console.log("request went through");
        navigate(`/user/trips/plans/${tripid}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      // Handle error, show an error message, or retry submission
      // NEED TO PROVIDE FEEDBACK TO THE USER
    }
  }

  return (
    <>
    <NavBar />
      <form onSubmit={handleSubmit}>
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
            <div>
              <Link to={`/user/trips/plans/${tripid}`}>
                <ArrowLeftIcon />
                Go Back
              </Link>
            </div>
            <Heading as="h2" size="l" mt={4}>
              NEW PLAN
            </Heading>
            <FormControl isRequired>
              <FormLabel>Header</FormLabel>
              <Input
                backgroundColor="white"
                type="text"
                placeholder="Enter your destination"
                mb={4}
                name="header"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                backgroundColor="white"
                type="text"
                placeholder="Enter your plans"
                mb={4}
                name="description"
                onChange={handleChange}
              />
            </FormControl>
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
          </Box>
        </Flex>
      </form>
    </>
  );
}
