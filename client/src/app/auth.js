import { supabase } from "../utils/supabaseClient.js";

export const handleLogin = async (setUser, navigate) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setUser(data);
    } else {
      console.log(`Session error`, error);
    }
  } catch (error) {
    console.log(error);
  }
  navigate("/homepage");
};

export const handleLogout = async (navigate) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error during sign out:", error.message);
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};
