import React from "react";
import { Box, Text, ButtonGroup, Button} from "@chakra-ui/react";
import { deleteOneTrip } from "../api/trips";
import { useNavigate } from "react-router-dom";

export default function PlanCard({id,  header, description }) {
  const navigate = useNavigate();

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
            colorScheme="teal"
            onClick={() =>
              navigate(
                `/user/trips/plans/update/${id}`
              )
            }
          >
            Edit
          </Button>
          <Button colorScheme="blackAlpha">
            Delete
          </Button>
          </ButtonGroup>
      </Box>
    </>
  );
}
