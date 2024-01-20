import { Box, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteOneTrip } from "../api/trips";

export default function TripCard({
  destination,
  startDay,
  endDay,
  description,
  tripId,
}) {
  const navigate = useNavigate();
  const { deleteData, data, isLoading, error } = deleteOneTrip();
  let query = new URLSearchParams(window.location.search);
  // console.log(`query:${query}`);
  let username = query.get("username");

  function handleDelete() {
    async function fetch() {
      await deleteData(username, tripId);
    }
    fetch();
  }

  return (
    <>
      <Box
        width={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }} // This will be responsive
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg="rgba(195, 226, 194, 0.30)"
        textAlign="center"
        zIndex="2"
        mx="auto" // This centers the Box component
        p={4} // Padding can be adjusted as needed
      >
        <Text fontSize="xl">{destination}</Text>
        <br />
        <Text fontSize="l">{startDay}</Text>
        <Text fontSize="l">{endDay}</Text>
        <Text fontSize="l">{description}</Text>
        <br />
        <ButtonGroup gap="4">
          <Button
            colorScheme="whiteAlpha"
            onClick={() =>
              navigate(
                `/user/trips/plans?username=${username}&tripid=${tripId}`
              )
            }
          >
            View
          </Button>
          <Button
            colorScheme="teal"
            onClick={() =>
              navigate(
                `/user/trips/update?username=${username}&tripid=${tripId}`
              )
            }
          >
            Edit
          </Button>
          <Button colorScheme="blackAlpha" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
