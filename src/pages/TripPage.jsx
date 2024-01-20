//To display trips under a single user
// import { useParams } from "react-router";
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
import { useNavigate } from "react-router-dom";
import { getAllTrips } from "../api/trips";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { formatDate } from "../util/helperFunc";

export default function TripPage() {
  const navigate = useNavigate();
  const { getData, data, isLoading, error } = getAllTrips();
  // to get the query params in url
  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  //to update: dependency might need to change
  useEffect(() => {
    async function fetch() {
      await getData(username);
    }
    fetch();
  }, [username]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // console.log(`tripData:${JSON.stringify(tripData)}`);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

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
        <Button
          colorScheme="teal"
          variant="solid"
          type="button"
          onClick={() => navigate(`/user/trips/new?username=${username}`)}
        >
          Create New Trip
        </Button>
        <br />
        {isLoading ? (
          <Spinner size="xl" color="teal.500" />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
            {data.map((trip) => (
              <Box key={trip._id}>
                <TripCard
                  destination={trip.destination}
                  startDay={formatDate(trip.startDay)}
                  endDay={formatDate(trip.endDay)}
                  description={trip.description}
                  key={trip._id}
                  tripId={trip._id}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </>
  );
}
