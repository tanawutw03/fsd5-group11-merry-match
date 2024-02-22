import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { resetAllProfiles } from "./profileRouter.js";

const logoutRouter = Router();

// PUT /api/v1/logout
logoutRouter.put("/api/v1/logout", (req, res) => {
  // Reset allProfiles using the exported function
  resetAllProfiles();

  // Send response indicating successful logout
  res.json({ message: "Logout successful" });
});

export default logoutRouter;
