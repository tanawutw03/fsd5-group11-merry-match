import { supabase } from "../utils/supabaseClient.js";
import axios from "axios";

export const handleLogin = async (
  user,
  setUser,
  avatarUrl,
  setAvatarUrl,
  navigate
) => {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionData) {
      const { data: retriveUser, error: retriveError } =
        await supabase.auth.getUser();

      if (retriveUser) {
        if (retriveUser.user.id) {
          const { data: userData, error: userDataError } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", retriveUser.user.id);

          if (userData && userData.length > 0) {
            const avatarUrl = userData[0].avatar_url[0];
            const { data: imageData, error: imageError } =
              await supabase.storage
                .from("avatars")
                .download(`${retriveUser.user.id}/${avatarUrl}`);

            if (imageData) {
              const imageUrl = URL.createObjectURL(imageData);

              setUser(retriveUser);
              setAvatarUrl(imageUrl);
            } else {
              console.error("Error fetching avatar image:", imageError);
              setUser(retriveUser);
              setAvatarUrl("");
            }
          } else {
            console.log("User has no avatar in the database.");
            setUser(retriveUser);
            setAvatarUrl("");
          }
        } else {
          console.log("User has no id.");
        }
      } else {
        console.error("Error fetching user:", retriveError);
      }
    } else {
      console.log("No active session.");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }

  navigate("/homepage");
};

export const handleLogout = async (
  user,
  setUser,
  avatarUrl,
  setAvatarUrl,
  navigate
) => {
  try {
    const { error } = await supabase.auth.signOut();
    await axios.put("http://localhost:4008/logout/api/v1/logout");

    if (error) {
      console.error("Error during sign out:", error.message);
    } else {
      setUser(null);
      setAvatarUrl("");
      navigate("/");
    }
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};
