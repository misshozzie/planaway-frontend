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
import bg from "../assets/planawaybg.png";
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

export default function NewTripForm({ setRender, render }) {
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
      setRender(!render);
      navigate(`/user/trips?username=${username}`);
    }
    fetch();
    // console.log("Re-rendering")
    // setRender(!render); //force rerender
    // navigate(`/user/trips?username=${username}`);
    // console.log("Navigating")
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
        <Box
          position="relative"
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="rgba(195, 226, 194, 0.50)"
          p="20px"
          textAlign="center"
          zIndex="docked"
          w={["100px", "150px", "200px", "250px", "800px"]}
          h="auto"
        >
          <ArrowLeftIcon />
          <Button
            colorScheme="black"
            variant="link"
            onClick={() => navigate(`/user/trips?username=${username}`)}
          >
            Go Back
          </Button>
          <br />
          <Heading as="h2" size="3" mt={4} bg="rgba(195, 226, 194, 0.40)">
            NEW TRIP
          </Heading>
          <br />
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <FormControl isRequired display="flex" alignItems="center">
                <FormLabel mb={4} width="150px">
                  Destination
                </FormLabel>
                <Input
                  //bg="rgba(195, 226, 194, 0.40)"
                  type="text"
                  placeholder="Enter your destination"
                  name="destination"
                  backgroundColor="white"
                  mb={2}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "red" }}>{errors.destination}</p>
              </FormControl>

              <FormControl isRequired display="flex" alignItems="center">
                <FormLabel mb={4} width="150px">
                  Start Day
                </FormLabel>
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

              <FormControl isRequired display="flex" alignItems="center">
                <FormLabel mb={4} width="150px">
                  End Day
                </FormLabel>
                <Input
                  backgroundColor="white"
                  type="date"
                  name="endDay"
                  mb={2}
                  borderColor="#ccc"
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "red" }}>{errors.endDay}</p>
              </FormControl>

              <FormControl isRequired display="flex" alignItems="center">
                <FormLabel mb={4} width="150px">
                  Description
                </FormLabel>
                <Textarea
                  backgroundColor="white"
                  borderColor="#ccc"
                  type="text"
                  name="description"
                  mb={2}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                bgColor="#CD8D7A"
                _hover={{ bg: "##DBAD9F", color: "white" }}
                _expanded={{ bg: "#DBAD9F", color: "white" }}
                _focus={{ boxShadow: "outline" }}
                type="submit"
                w="280px"
                mt={4}
                spinnerPlacement="start"
                loadingText="Saving"
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
