import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function PlanCard({id,  header, description }) {
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
      </Box>
    </>
  );
}
