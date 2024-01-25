import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import Toast from "react-hot-toast";
import NavBar from "./components/NavBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <App />
        <Toast />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
