import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import Joi from "joi";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/PAlogo.png";
import bg from "../assets/planawaybg.png";
import apis from "../services/index";
import { getLoginDetails, loginUser } from "../services/user";
import { hashDataWithSaltRounds, storeToken } from "../util/security";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email address is required.",
      "any.required": "Email address is required.",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  }),
});

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   console.log(userCookie, "userCookie");

  //   if (userCookie) {
  //     const jsonStartIndex = userCookie.indexOf("{");
  //     const jsonString = userCookie.slice(jsonStartIndex);
  //     // Parse the JSON string into a JavaScript object
  //     const userObject = JSON.parse(jsonString);
  //     const userName = userObject.userName;
  //     navigate(`/user/trips?username=${userName}`);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // const onSubmit = async () => {
  //   // Validate all fields on form submission
  //   const validation = schema.validate(formData, { abortEarly: false });
  //   console.log(1);
  //   if (validation.error) {
  //     const newErrors = {};
  //     validation.error.details.forEach((detail) => {
  //       const key = detail.path[0];
  //       newErrors[key] = detail.message;
  //     });
  //     setErrors(newErrors);
  //     console.error("Validation error:", validation.error.details);
  //     return;
  //   }
  //   console.log(2);
  //   try {
  //     setIsLoading(true);
  //     const response = await apis?.authLogin(formData);
  //     console.log("🚀 ~ onSubmit ~ response:", response);
  //     if (response?.status === 200) {
  //       //store jwt token to local storage
  //       localStorage.setItem("token", response.data.token);
  //       const userCookie = Cookies.get("user");
  //       console.log(userCookie, "userCookie");
  //       const jsonStartIndex = userCookie.indexOf("{");
  //       const jsonString = userCookie.slice(jsonStartIndex);
  //       // Parse the JSON string into a JavaScript object
  //       const userObject = JSON.parse(jsonString);
  //       const userName = userObject.userName;
  //       navigate(`/user/trips?username=${userName}`);
  //       toast.success(response?.data?.message, { id: 1 });
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     if (error.message) {
  //       toast?.error(error?.message, { id: 1 });
  //     }
  //     setIsLoading(false);
  //   }
  // };

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      const formDataNew = { ...formData };
      delete formDataNew.error;
      delete formDataNew.confirm;
      // highlight-end
      console.log("formDataNew", formDataNew);
      // get user hash password from database
      const loginDetails = await getLoginDetails(formData.email);
      console.log("login Details", loginDetails);
      const hashedPassword = hashDataWithSaltRounds(
        formDataNew.password,
        loginDetails.salt,
        loginDetails.iterations
      );
      console.log("hashedPassword", hashedPassword);
      formDataNew.password = hashedPassword;
      const token = await loginUser(formDataNew);
      console.log("token", token);
      // store token in localStorage
      storeToken(token);
      setUser(loginDetails.userName);
      navigate(`/user/trips?username=${loginDetails.userName}`);
      // Baby step!
    } catch (e) {
      console.log(e);
      if (e.message && e.message.includes("Invalid Login")) {
        // Set the error message for "Invalid Login"
        setErrorMessage("Password or email is incorrect");
      } else {
        setErrorMessage(e);
      }
    }
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
          minWidth="sm"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg="rgba(195, 226, 194, 0.50)"
          w="700px"
          //maxH="calc(100vh - 100px)"
          //h="300px"
          p="40px"
          textAlign="center"
          zIndex="2"
          //overflowY="auto"
        >
         <ArrowLeftIcon />
            <Button
              colorScheme="black"
              variant="link"
              onClick={() => navigate(`/`)}
            >
              Go Home
            </Button>
            <Heading as="h2" size="l" mt={4}>
              LOG IN
            </Heading>
          <form>
          {errorMessage && (
          <Text color="red.500" mt={2}>
            {errorMessage}
          </Text>
            )}
            {/* <Link as={RouterLink} to="/" display="flex" alignItems="center">
              <ArrowLeftIcon />
              Go Home
            </Link> */}
            <br />
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                backgroundColor="white"
                type="text"
                placeholder="Enter your email"
                mb={4}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.username && <Text color="red.500">{errors.email}</Text>}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                backgroundColor="white"
                type="password"
                placeholder="Enter your password"
                mb={4}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <Text color="red.500">{errors.password}</Text>
              )}
            </FormControl>

            <Button
              isLoading={isLoading}
              type="submit"
              bgColor="#CD8D7A"
              _hover={{ bg: "##DBAD9F", color: "white" }}
              _expanded={{ bg: "#DBAD9F", color: "white" }}
              w="280px"
              mt={4}
              spinnerPlacement="start"
              loadingText="Logging In"
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default LoginForm;
