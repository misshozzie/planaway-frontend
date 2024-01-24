import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Link,
  Image,
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
import apis from "../services/index";
import Cookies from "js-cookie";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../assets/PAlogo.png";
import bg from "../assets/planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";

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

const SignupForm = () => {
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

  const onSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Validate all fields on form submission
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = error.details.reduce((acc, detail) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});
      setErrors(newErrors);
      console.error("Validation error:", error.details);
      return;
    }

    try {
      setIsLoading(true);
      // Exclude confirmPassword from the data to be sent to the backend
      const { confirmPassword, ...dataToSubmit } = formData;

      const response = await apis.authSignup(dataToSubmit);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        // Handle other statuses if necessary
        toast.error("An unexpected status was returned from the server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      // Ensure isLoading is set to false when the request is completed
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
          w="900px"
          h="350px"
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
            <FormControl isRequired display="flex" alignItems="center">
              <FormLabel mb={4} width="150px">
                Username
              </FormLabel>
              <Input
                backgroundColor="#EAECCC"
                type="text"
                placeholder="Enter your username"
                mb={4}
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <p style={{ color: "red" }}>{errors.userName}</p>
            </FormControl>

            <FormControl isRequired display="flex" alignItems="center">
              <FormLabel mb={4} width="150px">
                Email
              </FormLabel>
              <Input
                backgroundColor="#EAECCC"
                type="email"
                placeholder="Enter your email"
                mb={2}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <p style={{ color: "red" }}>{errors.email}</p>
            </FormControl>

            <FormControl isRequired display="flex" alignItems="center">
              <FormLabel mb={4} width="150px">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  backgroundColor="#EAECCC"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  mb={2}
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

            <FormControl isRequired display="flex" alignItems="center">
              <FormLabel mb={4} width="150px">
                Confirm
              </FormLabel>
              <Input
                backgroundColor="#EAECCC"
                type="password"
                placeholder="Confirm your password"
                mb={2}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                borderColor="#ccc"
              />
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            </FormControl>
          </form>
        </Box>
        <br />
        <Button
          backgroundColor="#CD8D7A"
          w="280px"
          h="50px"
          mt={2}
          type="submit"
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
            "SIGNUP"
          )}
        </Button>
      </Flex>
    </>
  );
};

export default SignupForm;
