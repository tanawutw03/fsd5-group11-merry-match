import { supabase } from "../utils/supabaseClient.js";

export const handleLogin = async (
  ser,
  setUser,
  avatarUrl,
  setAvatarUrl,
  navigate
) => {
  try {
    // Check the current session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    console.log("Session Data:", sessionData);

    if (sessionData) {
      // Fetch user information
      const { data: retriveUser, error: retriveError } =
        await supabase.auth.getUser();
      console.log("User Data:", retriveUser);

      if (retriveUser) {
        // Fetch user avatar
        if (retriveUser.user.id) {
          console.log("Fetching user profile data...");
          const { data: userData, error: userDataError } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", retriveUser.user.id);

          if (userData && userData.length > 0) {
            const avatarUrl = userData[0].avatar_url;
            console.log("User Profile Data:", userData);
            console.log("Avatar URL:", avatarUrl);

            // Download avatar image data
            const { data: imageData, error: imageError } =
              await supabase.storage.from("avatars").download(avatarUrl);

            if (imageData) {
              const imageUrl = URL.createObjectURL(imageData);
              console.log("Avatar Image Data:", imageData);
              console.log("Avatar URL (after download):", imageUrl);

              // Set user and avatarUrl in the context
              setUser(retriveUser);
              setAvatarUrl(imageUrl);
            } else {
              console.error("Error fetching avatar image:", imageError);
              setUser(retriveUser);
              setAvatarUrl(""); // Set empty string for avatarUrl in case of an error
            }
          } else {
            console.log("User has no avatar in the database.");
            setUser(retriveUser);
            setAvatarUrl(""); // Set empty string for avatarUrl if the user has no avatar
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

  // Navigate to homepage regardless of the login result
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

    if (error) {
      console.error("Error during sign out:", error.message);
    } else {
      console.log("Logging out.");
      setUser(null);
      setAvatarUrl("");
      navigate("/");
    }
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};
