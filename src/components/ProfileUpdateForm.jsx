import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import Joi from "joi";
import { getUserDetails } from "../services/user";
import React, { useEffect, useState } from "react";
import { hashData } from "../util/security";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/PAlogo.png";
import bg from "../assets/planawaybg.png";
import apis from "../services/index";
import { userUpdate, getLoginDetails } from "../services/user";
import { hashDataWithSaltRounds } from "../util/security";

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

const updatePasswordSchema = Joi.object({
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

  password: Joi.string().min(3).required().messages({
    "string.required": "Please enter a password.",
    "string.empty": "Password must be at least 8 characters",
    "any.required": "Password is required.",
  }),
});

const ProfileUpdateForm = ({ setUser }) => {
  const userDetails = getUserDetails();
  const [formData, setFormData] = useState({
    userName: userDetails.user,
    email: userDetails.email,
    passwordold: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedPassword, setupdatedPassword] = useState(false);

  // console.log("userDetails:", userDetails);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const [newUsers, setNewUsers] = useState("");
  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   if (userCookie) {
  //     let parseUser = userCookie?.substring(2);
  //     const user = JSON?.parse(parseUser);
  //     setNewUsers(user);
  //     setFormData({
  //       userName: user?.userName,
  //       email: user?.email,
  //     });
  //   }
  // }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function hashPassword() {
    var currForm = formData;
    if (currForm.password) {
      var hash = hashData(currForm.password);
      // console.log("new hash:", hash);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
    return currForm;
  }

  async function onSubmit(e) {
    try {
      e.preventDefault();
      const loginDetails = await getLoginDetails(formData.email);
      console.log("loginDetails:", loginDetails);
      const hashedPasswordNew = hashDataWithSaltRounds(
        formData.password,
        loginDetails.salt,
        loginDetails.iterations
      );
      hashPassword();
      const formDataNew = { ...formData };
      delete formDataNew.error;
      delete formDataNew.confirm;
      // console.log("formDataNew", formDataNew);

      const hashedPasswordOld = hashDataWithSaltRounds(
        formDataNew.passwordold,
        loginDetails.salt,
        loginDetails.iterations
      );
      // console.log("hashedPassword - old", hashedPasswordOld);
      formDataNew.passwordold = hashedPasswordOld;
      formDataNew.passwordnew = hashedPasswordNew;
      console.log(formDataNew);

      const res = await userUpdate(formDataNew);
      if (res.error) {
        console.log("error:", res.error);
        setErrors(res.error);
        setFormData({
          userName: userDetails.user,
          email: userDetails.email,
          passwordold: "",
          password: "",
        });
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setupdatedPassword(false);
  //   const validation = updatePasswordSchema.validate(formData, {
  //     abortEarly: false,
  //   });
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

  //   try {
  //     setLoading(true);
  //     const updatedData = hashPassword();
  //     const updateUserRequest = {
  //       body: updatedData,
  //     };
  //     console.log(updateUserRequest);
  //     const response = await apis?.updateProfile(updateUserRequest);
  //     if (response?.status === 200) {
  //       toast.success(response?.data?.message, { id: 1 });
  //     }
  //     setLoading(false);
  //     console.log("User saved successfully");
  //     setFormData({
  //       userName: userDetails.user,
  //       email: userDetails.email,
  //       password: "",
  //     });
  //     setupdatedPassword(true);
  //   } catch (error) {
  //     if (error.message) {
  //       toast?.error(error?.message, { id: 1 });
  //     }
  //     setFormData({
  //       userName: userDetails.user,
  //       email: userDetails.email,
  //       password: "",
  //     });
  //     setLoading(false);
  //   }
  // };

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
          <div>
            <Link to={`/user/trips`}>
              <ArrowLeftIcon />
              Go Back
            </Link>
          </div>
          {updatedPassword && (
            <p style={{ color: "green" }}>Password has been updated!</p>
          )}
          <form>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                backgroundColor="white"
                type="text"
                placeholder="Enter your username"
                mb="2"
                name="userName"
                value={userDetails.user}
                // onChange={handleInputChange}
                readOnly
                borderColor="#ccc"
              />
              {/* <p style={{ color: "red" }}>{errors.userName}</p> */}
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <InputGroup size="md">
                <Input
                  backgroundColor="white"
                  type="text"
                  placeholder="Enter your email"
                  mb="2"
                  name="email"
                  value={userDetails.email}
                  // onChange={handleInputChange}
                  readOnly
                  borderColor="#ccc"
                />
              </InputGroup>
              {/* <p style={{ color: "red" }}>{errors.email}</p> */}
            </FormControl>
            <FormControl id="password old" isRequired>
              <FormLabel>Current Password</FormLabel>
              <InputGroup size="md">
                <Input
                  backgroundColor="white"
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  mb="2"
                  name="passwordold"
                  value={formData.passwordold}
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
              {/* <p style={{ color: "red" }}>{errors.password}</p> */}
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <InputGroup size="md">
                <Input
                  backgroundColor="white"
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
              <p style={{ color: "red" }}>{errors}</p>
            </FormControl>

            <Button
              mt="4"
              width="280px"
              bgColor="#CD8D7A"
              _hover={{ bg: "##DBAD9F", color: "white" }}
              _expanded={{ bg: "#DBAD9F", color: "white" }}
              isLoading={loading}
              loadingText="Updating..."
              onClick={onSubmit}
            >
              Update
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default ProfileUpdateForm;
