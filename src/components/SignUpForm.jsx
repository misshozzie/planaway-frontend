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
import Joi, { func } from "joi";
import toast from "react-hot-toast";
import apis from "../services/index";
import Cookies from "js-cookie";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../assets/PAlogo.png";
import bg from "../assets/planawaybg.png";
import { ArrowLeftIcon } from "@chakra-ui/icons";
// import bcrypt from "bcryptjs";
import { hashData } from "../util/security";
import { signUp } from "../services/user";

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
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setDisable(checkPassword());
  };

  // make sure check and password is the same
  function checkPassword() {
    // password validation
    // must have at least 1 uppercase, 1 lowercase, 1 special
    //var currForm = formData;
    if (
      !formData.password ||
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword
    ) {
      return true;
    }
    return false;
  }
  //     if (currForm.password !== currForm.confirm) {
  //         console.log(currForm.password)
  //         console.log(currForm.confirm)
  //         return true
  //     }
  //     return false
  // }

  // function hashPassword() {
  //   var currForm = formData;
  //   if (currForm.password) {
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync(currForm.password, salt);

  //     setFormData({
  //       ...currForm,
  //       password: hash,
  //       salt: salt,
  //     });
  //   }
  // }

  function hashPassword() {
    var currForm = formData;
    if (currForm.password) {
      console.log(currForm.password);
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   if (userCookie) {
  //     navigate("/trips");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const onSubmit = async (event) => {
  //   // Prevent default form submission behavior
  //   event.preventDefault();

  //   // Validate all fields on form submission
  //   const { error } = schema.validate(formData, { abortEarly: false });
  //   if (error) {
  //     const newErrors = error.details.reduce((acc, detail) => {
  //       acc[detail.path[0]] = detail.message;
  //       return acc;
  //     }, {});
  //     setErrors(newErrors);
  //     console.error("Validation error:", error.details);
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     // Exclude confirmPassword from the data to be sent to the backend
  //     const { confirmPassword, ...dataToSubmit } = formData;

  //     const response = await apis.authSignup(dataToSubmit);
  //     if (response.status === 201) {
  //       toast.success(response.data.message);
  //       //store jwt token to local storage
  //       //localStorage.setItem("token", response.data.token);
  //       navigate("/login");
  //     } else {
  //       // Handle other statuses if necessary
  //       toast.error("An unexpected status was returned from the server");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   } finally {
  //     // Ensure isLoading is set to false when the request is completed
  //     setIsLoading(false);
  //   }
  // };

  async function onSubmit(e) {
    try {
      e.preventDefault();
      hashPassword();
      const formDataNew = { ...formData };
      delete formDataNew.error;
      delete formDataNew.confirm;
      console.log(formDataNew);
      const user = await signUp(formDataNew);
      console.log(user);
      navigate("/login");
    } catch (e) {
      console.log(e);
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
          <form onSubmit={onSubmit}>
            <ArrowLeftIcon />
            <Button
              colorScheme="black"
              variant="link"
              onClick={() => navigate(`/`)}
            >
              Go Home
            </Button>
            <Heading as="h2" size="l" mt={4}>
              SIGN UP
            </Heading>
            <br />
            <FormControl isRequired display="flex" alignItems="center">
              <FormLabel mb={4} width="150px">
                Username
              </FormLabel>
              <Input
                backgroundColor="white"
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
                backgroundColor="white"
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
                  backgroundColor="white"
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
                backgroundColor="white"
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
            <br />
            <Button
              backgroundColor="#CD8D7A"
              _hover={{ bg: "##DBAD9F", color: "white" }}
              _expanded={{ bg: "#DBAD9F", color: "white" }}
              w="280px"
              mt={2}
              type="submit"
              isLoading={isLoading} // Use isLoading prop for Spinner
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
                "Sign Up"
              )}
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default SignupForm;
