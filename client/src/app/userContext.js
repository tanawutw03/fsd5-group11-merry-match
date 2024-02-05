import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem(
      "sb-fzqregkvknbkbhensxqk-auth-token"
    );
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [avatarUrl, setAvatarUrl] = useState(() => {
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    return storedAvatarUrl || null;
  });

  useEffect(() => {
    localStorage.setItem("avatarUrl", avatarUrl || "");
    console.log("avatarUrl in UserProvider:", avatarUrl);
  }, [avatarUrl]);

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser, avatarUrl, setAvatarUrl } },
    children
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const { user, setUser, avatarUrl, setAvatarUrl } = useContext(UserContext);

  return { user, setUser, avatarUrl, setAvatarUrl };
};
