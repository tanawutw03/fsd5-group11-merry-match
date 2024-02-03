import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { supabase } from "../utils/supabaseClient.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem(
      "sb-fzqregkvknbkbhensxqk-auth-token"
    );
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (user && user.user && user.user.id) {
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", user.user.id);

          if (userData) {
            const avatarUrl = userData[0]?.avatar_url;

            const { data: imageData, error: imageError } =
              await supabase.storage.from("avatars").download(avatarUrl);

            if (imageData) {
              const imageUrl = URL.createObjectURL(imageData);
              setAvatarUrl(imageUrl);
            } else {
              console.log(imageError);
            }
          } else {
            console.error("Error fetching user avatar:", userError);
          }
        }
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    };

    fetchUserAvatar();
  }, [user]);

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser, avatarUrl } },
    children
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const { user, setUser, avatarUrl } = useContext(UserContext);

  return { user, setUser, avatarUrl };
};
