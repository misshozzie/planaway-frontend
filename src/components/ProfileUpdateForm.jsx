import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
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
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../assets/PAlogo.png";
import bg from "../assets/Planawaybg.png";
import apis from "../services/index";

//schema to validate input
const schema = Joi.object({
  username: Joi.string().min(3).required().messages({
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
    username: "",
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
        username: user?.username,
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
          w="500px"
          h="300px"
          p="32px"
          textAlign="center"
          zIndex="2"
        >
          <form>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                backgroundColor="#EAECCC"
                type="text"
                placeholder="Enter your username"
                mb="2"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <p style={{ color: "red" }}>{errors.username}</p>
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                backgroundColor="#EAECCC"
                type="text"
                placeholder="Enter your email"
                mb="2"
                name="username"
                value={formData.email}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <p style={{ color: "red" }}>{errors.email}</p>
            </FormControl>
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


            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <InputGroup size="md">
                <Input
                  backgroundColor="#EAECCC"
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <p style={{ color: "red" }}>{errors.password}</p>
            </FormControl>
          </form>
        </Box>

        <Button
          mt="4"
          width="280px"
          bg="#CD8D7A"
          color="white"
          isLoading={loading}
          loadingText="Updating..."
          onClick={onSubmit}
        >
          UPDATE PROFILE
        </Button>
      </Flex>
    </>
  );
};

export default ProfileUpdateForm;
