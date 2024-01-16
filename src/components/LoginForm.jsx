import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Spinner,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Joi from "joi";
import apis from "../services/index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    console.log(userCookie, "userCookie");
    if (userCookie) {
      navigate("/trips");
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = async () => {
    // Validate all fields on form submission
    const validation = schema.validate(formData, { abortEarly: false });

    if (validation.error) {
      const newErrors = {};
      validation.error.details.forEach((detail) => {
        const key = detail.path[0];
        newErrors[key] = detail.message;
      });
      setErrors(newErrors);
      console.error("Validation error:", validation.error.details);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apis?.authLogin(formData);
      if (response?.status === 200) {
        navigate("/trips");
        toast.success(response?.data?.message, { id: 1 });
      }
      setIsLoading(false);
    } catch (error) {
      if (error.message) {
        toast?.error(error?.message, { id: 1 });
      }
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg={useColorModeValue('green.50', 'green.900')} p={4}>
      <Box
        w="full"
        maxW="md"
        p={8}
        borderRadius="lg"
        bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(23, 25, 35, 0.8)')}
        boxShadow="lg"
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color={useColorModeValue('black', 'white')}
          textAlign="center"
          mb={10}
        >
          Planaway
        </Heading>
        <form>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              mb={4}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <Text color="red.500">{errors.username}</Text>}
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              mb={4}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>

          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="teal"
            width="100%"
            mt={4}
            spinnerPlacement="start"
            loadingText="Logging in"
            onClick={onSubmit}
          >
            Login
          </Button>
        </form>
        <Text align={"center"} mt={5} onClick={() => navigate("/sign-up")}>
          Have No Account? signUp
        </Text>
      </Box>
    </Flex>
  );
}

export default LoginForm;
