import React from "react";
import { Box, Text, ButtonGroup} from "@chakra-ui/react";
import { deleteOneTrip } from "../api/trips";

export default function PlanCard({id,  header, description }) {

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
        <Text fontSize="xl">{header}</Text>
        <br />
        <Text fontSize="xl">{description}</Text>
        <Text fontSize="xl">{id}</Text>
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
                `user/trips/plans`
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
