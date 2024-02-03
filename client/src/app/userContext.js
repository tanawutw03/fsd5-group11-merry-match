import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // const [token, setToken] = useState(() => {
  //   const storedToken = localStorage.getItem("token");
  //   return storedToken ? JSON.parse(storedToken) : null;
  // });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("token", JSON.stringify(token));
  }, [user]);

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser } },
    children
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(UserContext);
};
