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
import Joi from "joi";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createOneTrip } from "../api/trips";

const schema = Joi.object({
  destination: Joi.string().required().messages({
    "string.empty": "Destination is required.",
  }),
  startDay: Joi.date().required().messages({
    "date.empty": "Start day is required.",
  }),
  endDay: Joi.date().min(Joi.ref("startDay")).required().messages({
    "date.empty": "End day is required.",
    "date.min": "End day must be equal to or later than start day",
  }),
  description: Joi.any().optional(),
});

export default function NewTripForm() {
  const [formState, setFormState] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { postData, data, isLoading, error } = createOneTrip();
  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  function validate() {
    if (formState.startDay > formState.endDay) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(evt) {
    let currentForm = formState;
    currentForm[evt.target.name] = evt.target.value;
    setDisabled(validate());
    setFormState(currentForm);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log(formState);

    const { error } = schema.validate(formState, { abortEarly: false });

    if (error) {
      const newErrors = error.details.reduce((acc, detail) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});
      setErrors(newErrors);
      console.error("Validation error:", newErrors);
      return;
    }

    async function fetch() {
      await postData(username, formState);
    }
    fetch();
    navigate(`/user/trips?username=${username}`);
  }

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
          h="600px"
          p="32px"
          textAlign="center"
          zIndex="2"
        >
          <ArrowLeftIcon />
          <Button
            colorScheme="black"
            variant="link"
            onClick={() => navigate(`/user/trips?username=${username}`)}
          >
            Go Back
          </Button>
          <Heading as="h2" size="l" mt={4}>
            NEW TRIP
          </Heading>
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Destination</FormLabel>
                <Input
                  backgroundColor="white"
                  type="text"
                  placeholder="Enter your destination"
                  name="destination"
                  mb={2}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "red" }}>{errors.destination}</p>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start Day</FormLabel>
                <Input
                  backgroundColor="white"
                  type="date"
                  name="startDay"
                  mb={2}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "red" }}>{errors.startDay}</p>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Day</FormLabel>
                <Input
                  backgroundColor="white"
                  type="date"
                  name="endDay"
                  mb={2}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "red" }}>{errors.endDay}</p>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  backgroundColor="white"
                  type="text"
                  name="description"
                  mb={2}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                bg="#CD8D7A"
                w="280px"
                mt={4}
                spinnerPlacement="start"
                loadingText="Saving"
                _hover={{ bg: " #DBCC95" }}
                disabled={disabled}
              >
                Confirm
              </Button>
            </form>
          </div>
        </Box>
      </Flex>
    </>
  );
}
