// auth.js
import { supabase } from "../utils/supabaseClient.js";

export const handleLogin = async (user, token, setUser, setToken) => {
  // Save user data to sessionStorage
  //   localStorage.setItem("user", JSON.stringify(user));
  // Note: No need to manually set the token here if Supabase handles it
  // localStorage.setItem("token", JSON.stringify(token));
  // Update the state or perform any other necessary actions
  //   setUser(user);
  // Note: No need to manually set the token here if Supabase handles it
  // setToken(token);

  try {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      //   console.log(`Retrive user session:`, data);
      setUser(data);
    } else {
      console.log(`Session error`, error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async (setUser, setToken, navigate) => {
  try {
    // Perform Supabase signOut
    const { error } = await supabase.auth.signOut();

    // Clear user data from localStorage
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");

    if (error) {
      console.error("Error during sign out:", error.message);
    } else {
      // Update the state or perform any other necessary actions
      //   setUser(null);
      //   setToken(null);
      // Navigate to the nonuserpage page
      navigate("/");
    }
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};
