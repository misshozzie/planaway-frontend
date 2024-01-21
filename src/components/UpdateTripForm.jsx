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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getOneTrip, updateOneTrip } from "../api/trips";
import { formatDate } from "../util/helperFunc";

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

export default function UpdateTripForm() {
  const [formState, setFormState] = useState({
    destination: null,
    description: null,
    startDay: null,
    endDay: null,
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { getOneData, data, isLoading, error } = getOneTrip();
  const { updateOneData, updateData, isUpdateLoading, updateError } =
    updateOneTrip();
  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");
  let tripId = query.get("tripid");

  // console.log(username);
  // console.log(tripId);

  useEffect(() => {
    async function fetch() {
      await getOneData(username, tripId);
    }
    fetch();
  }, [tripId]);

  // console.log("data");
  // console.log(data);
  // console.log("formData:");
  // console.log(formState);

  useEffect(() => {
    const initialData = {
      destination: data.destination,
      description: data.description,
      startDay: formatDate(data.startDay),
      endDay: formatDate(data.endDay),
    };
    setFormState(initialData);
  }, [data]);

  function validate() {
    if (formState.startDay >= formState.endDay) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(evt) {
    let currentForm = { ...formState };
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
      await updateOneData(username, tripId, formState);
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
        {isLoading || formState.destination == null ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
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
              UPDATE TRIP
            </Heading>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Destination</FormLabel>
                <Input
                  backgroundColor="white"
                  mb={2}
                  type="text"
                  name="destination"
                  onChange={handleChange}
                  value={formState.destination}
                  // required
                />
                <p style={{ color: "red" }}>{errors.destination}</p>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start Day</FormLabel>
                <Input
                  backgroundColor="white"
                  mb={2}
                  type="date"
                  name="startDay"
                  onChange={handleChange}
                  value={formState.startDay}
                  required
                />
                <p style={{ color: "red" }}>{errors.startDay}</p>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Day</FormLabel>
                <Input
                  backgroundColor="white"
                  mb={2}
                  type="date"
                  name="endDay"
                  onChange={handleChange}
                  value={formState.endDay}
                  required
                />
                <p style={{ color: "red" }}>{errors.endDay}</p>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  backgroundColor="white"
                  mb={2}
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={formState.description}
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
                Update
              </Button>
            </form>
          </Box>
        )}
      </Flex>
    </>
  );
}
