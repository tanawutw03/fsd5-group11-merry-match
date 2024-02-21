import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const userPackage = Router();

userPackage.get("/:id", async (req, res) => {
  try {
    const Id = req.params.id;

    // Fetch complaint data by ID from "merry_limits"
    const { data: merryLimitsData, error: merryLimitsError } = await supabase
      .from("merry_limits")
      .select("package")
      .eq("id", Id);

    if (merryLimitsError) {
      console.error(
        "Error fetching merry_limits data:",
        merryLimitsError.message
      );
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (!merryLimitsData || merryLimitsData.length === 0) {
      res.status(404).json({ error: "No data found for the provided ID" });
      return;
    }

    const packageName = merryLimitsData[0].package;

    // Fetch package data by package name from "packages"
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .select("*")
      .eq("name", packageName);

    if (packageError) {
      console.error("Error fetching package data:", packageError.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Send the package data as a response
    res.status(200).json(packageData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

userPackage.put("/cancel/:id", async (req, res) => {
  try {
    const Id = req.params.id;

    const { data, error } = await supabase
      .from("merry_limits")
      .update({ package: "default", merry_limit: 20 })
      .eq("id", Id);

    if (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Send a success response
      res.status(200).json({ message: "Status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating status:", error.message);
    // Send an error response
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userPackage;
