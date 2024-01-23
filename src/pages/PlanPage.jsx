import PlanCard from "../components/PlanCard.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { showPlans, deleteOnePlan } from "../api/plans";
import NavBar from"../components/NavBar.jsx";

export default function PlanPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tripid } = useParams();

  function extractData(dataArray) {
    const cleanedData = dataArray[0].map((item) => ({
      key: item._id,
      tripID: item.tripID,
      header: item.header,
      description: item.description,
    }));

    return cleanedData;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { error, data } = await showPlans(tripid);
        if (error) {
          // Handle the error, e.g., show an error message
          console.error("Error fetching data:", error);
        } else {
          const cleanData = extractData(data);
          setData(cleanData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleDelete(planid) {
    async function fetch() {
      try {
        await deleteOnePlan(tripid, planid);
        // Plan deleted successfully, you can perform any actions you need here
        console.log("Plan has been deleted")
        setData((prevData) => prevData.filter(item => item.key !== planid));
      } catch (error) {
        // Handle the error, e.g., show an error message
        console.error("Error deleting plan:", error);
      }
    }
    fetch();
  }
  
  
  return (
    <>
    <NavBar />
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
        <Button
          colorScheme="teal"
          variant="solid"
          type="button"
          onClick={() => navigate(`/user/trips/plans/new/${tripid}`)}
        >
          Create New Plan
        </Button>
        <br />
        <br />
        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : data.length ? (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
            {/* Map through the data and render a card for each item using PlanCard component */}
            {data.map((item, index) => (
              <Box key={index}>
                <PlanCard
                  id={item.key}
                  header={item.header}
                  description={item.description}
                  tripid={tripid}
                  handleDelete={() => handleDelete(item.key)}
                />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <p>No data available</p>
        )}
      </Flex>
    </>
  );
}
