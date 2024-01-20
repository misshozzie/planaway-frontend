import PlanCard from "../components/PlanCard.jsx";
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
  VStack,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { showPlans } from "../api/plans";

export default function PlanPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const { error, data } = await showPlans();
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
