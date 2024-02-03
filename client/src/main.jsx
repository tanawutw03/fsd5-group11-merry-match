import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./app/userContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
