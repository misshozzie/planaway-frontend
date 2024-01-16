import { getOneCard } from "../api/plans"; 

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

export default function PlanCard(){

    const { getData, data, isLoading, error } = getOneCard(); // Call the function
    const [isPlanId, setisPlanId] = useState('65a211055f7882238d20e866'); 
    
    useEffect(() => {
      getData(isPlanId);
    }, [isPlanId]);
  
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
             {isLoading ? (
            <Spinner size="xl" color="teal.500" />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <div>
              <Text fontSize="xl">{data.Plan.header}</Text>
              <Text fontSize="xl">{data.Plan.tripID}</Text>
              <Text>{data.Plan.description}</Text>
            </div>
          )}
        </Box> 
    </Flex> 
    </>
  );
}; 
