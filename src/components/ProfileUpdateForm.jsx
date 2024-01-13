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
  useColorModeValue,
} from "@chakra-ui/react";
import Joi from "joi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
//import apis from "../services";

//schema to validate input
const schema = Joi.object({
  userName: Joi.string().min(3).required().messages({
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

  password: Joi.string().optional(),
});

const ProfileUpdateForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [newUsers, setNewUsers] = useState("");
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      let parseUser = userCookie?.substring(2);
      const user = JSON?.parse(parseUser);
      setNewUsers(user);
      setFormData({
        userName: user?.userName,
        email: user?.email,
      });
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async () => {
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
      setLoading(true);
      const response = await apis?.updateProfile({
        id: newUsers?._id,
        body: formData,
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message, { id: 1 });
      }
      setLoading(false);
    } catch (error) {
      if (error.message) {
        toast?.error(error?.message, { id: 1 });
      }
      setLoading(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bgSize="cover"
    >
      <Box
        minW="400px"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="base"
        bg={useColorModeValue('rgba(195, 226, 194, 0.50)', 'gray.700')}
      >
        <Heading
          textAlign="center"
          mb={10}
          color={useColorModeValue('teal.600', 'teal.300')}
          fontSize="4xl"
        >
          Planaway
        </Heading>
        <form>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              mb="2"
              name="userName"
              // value={formData.userName}
              // onChange={handleInputChange}
            />
            {/* Render errors if there are any */}
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              mb="2"
              name="email"
              // value={formData.email}
              // onChange={handleInputChange}
            />
            {/* Render errors if there are any */}
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                mb="2"
                name="password"
                // value={formData.password}
                // onChange={handleInputChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <p style={{ color: "red" }}>{errors.password}</p>
          </FormControl>

          <Button
            mt="4"
            width="full"
            bg="#CD8D7A"
            color="white"
            isLoading={loading}
            loadingText="Updating..."
            onClick={onSubmit}
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default ProfileUpdateForm;
