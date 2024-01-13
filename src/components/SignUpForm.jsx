import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import Joi from "joi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//import apis from "../services";
import Cookies from "js-cookie";

const schema = Joi.object({
  userName: Joi.string().min(5).required().messages({
    "string.required": "Username is required.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 5 characters",
  }),
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
    "string.required": "Password is required.",
    "string.empty": "Password is required.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match.",
    "string.empty": "Confirm password is required.",
    "string.required": "Confirm password is required.",
  }),
});

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      navigate("/trips");
    }
    // eslint-disable-next-line
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      const { confirmPassword, ...rest } = formData || {};

      const response = await apis?.authSignUp(rest);
      if (response?.status === 201) {
        navigate("/login");
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
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bgImage="url('https://i.imgur.com/RiN3U5c.jpg')"
      bgSize="cover"
    >
      <Box
        w="500px" // Adjust the width as needed
        borderWidth="1px"
        borderRadius="lg"
        p="6"
        boxShadow="base"
        backgroundColor="rgba(255, 255, 255, 0.8)" // Semi-transparent white background
        style={{ backdropFilter: "blur(8px)" }}
      >
        <Heading
          align="center"
          mb={10}
          fontSize="6xl"
          p={2}
          fontWeight="normal"
          color="#333" // Change this to match the color in the image
        >
          Plan Away
        </Heading>
        <form>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              mb="2"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              borderColor="#ccc"
            />
            <p style={{ color: "red" }}>{errors.userName}</p>
          </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              mb="2"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              borderColor="#ccc"
            />
            <p style={{ color: "red" }}>{errors.email}</p>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                mb="2"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <p style={{ color: "red" }}>{errors.password}</p>
          </FormControl>

          <FormControl>
            <FormLabel>Confirm</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              mb="2"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              borderColor="#ccc"
            />
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          </FormControl>

          <Button
            backgroundColor="#CD8D7A"
            width="100%"
            mt="4"
            onClick={onSubmit}
          >
            {isLoading ? (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="sm"
              />
            ) : (
              "SignUp" // Changed the text to match the button in the image
            )}
          </Button>
        </form>
        <Text align="center" fontSize="sm" color="#aaa" mt="4">
          ©planaway2024 | feedback or query email us at{" "}
          <a href="mailto:info@planaway.com">info@planaway.com</a>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUpForm;
