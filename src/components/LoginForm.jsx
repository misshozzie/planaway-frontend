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
          bg="rgba(195, 226, 194, 0.30)"
          w="700px"
          h="300px"
          p="32px"
          textAlign="center"
          zIndex="2"
        >
          <form>
            <Link as={RouterLink} to="/" display="flex" alignItems="center">
              <ArrowLeftIcon />
              Go Home
            </Link>
            <br />
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                backgroundColor="#EAECCC"
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
                backgroundColor="#EAECCC"
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
              bg="#CD8D7A"
              w="280px"
              mt={4}
              spinnerPlacement="start"
              loadingText="Logging In"
              onClick={onSubmit}
              _hover={{ bg: " #DBCC95" }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default LoginForm;
