import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { updatePlan, getOnePlan } from "../api/plans";

export default function UpdateTripForm() {
  const [formState, setFormState] = useState({
    header: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { planid, tripid } = useParams();
  const navigate = useNavigate();
  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(() => {
    async function fetchPlanData() {
      try {
        const data = await getOnePlan(tripid, planid);
        // Set formState directly from the fetched data
        setFormState({
          header: data.header,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    }
    fetchPlanData();
  }, [planid, tripid]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const result = await updatePlan(formState, planid);
      setIsLoading(false);
      if (result.error) {
        setError(result.error);
      } else {
        console.log("Plan has been updated");
        navigate(`/user/trips/plans/${tripid}?username=${username}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      // Handle error, show an error message, or retry submission
      // NEED TO PROVIDE FEEDBACK TO THE USER
    }
  }

  return (
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
          position="relative"
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="rgba(195, 226, 194, 0.50)"
          p="20px"
          textAlign="center"
          zIndex="docked"
          w={["100px", "150px", "200px", "250px", "800px"]}
          h="auto"
        >
          <div>
            <Link to={`/user/trips/plans/${tripid}?username=${username}`}>
              <ArrowLeftIcon />
              Go Back
            </Link>
          </div>
          <Heading as="h2" size="l" mt={4}>
            UPDATE PLAN
          </Heading>
          <FormControl isRequired>
            <FormLabel>Header</FormLabel>
            <Input
              backgroundColor="white"
              type="text"
              mb={4}
              name="header"
              value={formState.header}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              backgroundColor="white"
              type="text"
              mb={4}
              name="description"
              value={formState.description}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <Button
            type="submit"
            bgColor="#CD8D7A"
            _hover={{ bg: "##DBAD9F", color: "white" }}
            _expanded={{ bg: "#DBAD9F", color: "white" }}
            w="280px"
            mt={4}
            spinnerPlacement="start"
            loadingText="Saving"
          >
            SAVE
          </Button>
        </Box>
      </Flex>
    </form>
  );
}
