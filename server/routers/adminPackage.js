import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const adminPackageRoute = Router();

adminPackageRoute.get("/package", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .neq("package_id", 69);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

adminPackageRoute.get("/package/:id", async (req, res) => {
  try {
    // Extract package ID from request parameters
    const packageId = req.params.id;

    // Fetch package data from the database using the package ID
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_id", parseInt(packageId))
      .single();

    // Check for errors during the database query
    if (error) {
      console.error("Error fetching package data:", error.message);
      // Respond with an error status code and message
      return res.status(500).json({ error: "Error fetching package data" });
    } else {
      // Respond with the fetched package data
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching package data:", error.message);
    // Respond with an error status code and message
    res.status(500).json({ error: "Error fetching package data" });
  }
});

adminPackageRoute.put("/package/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackageData = req.body; // Assuming your request body contains the updated package data

    const { data, error } = await supabase
      .from("packages")
      .update(updatedPackageData)
      .eq("package_id", parseInt(id)); // Ensure package_id is parsed to integer

    if (error) {
      console.error("Error updating package data:", error.message);
      return res.status(500).json({ error: "Failed to update package data" });
    }

    console.log("Package data updated successfully:", data);
    return res
      .status(200)
      .json({ message: "Package data updated successfully" });
  } catch (error) {
    console.error("Error updating package data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

adminPackageRoute.post("/create/package", async (req, res) => {
  try {
    const createPackageData = req.body;
    // Insert package data into Supabase
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .insert(createPackageData)
      .select();

    if (packageError) {
      console.error("Error inserting package data:", packageError);
      // Handle the error, e.g., show a message to the user
      return res.status(500).json({ error: "Failed to create package" });
    }

    console.log(packageData);
    // Optionally, you can send a success response back to the client
    return res.status(200).json({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error creating package:", error.message);
    // Handle the error, e.g., show a message to the user
    return res.status(500).json({ error: "Internal server error" });
  }
});

adminPackageRoute.delete("/delete/package/:id", async (req, res) => {
  const { id: packageId } = req.params;
  try {
    // Perform the delete operation using supabase
    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("package_id", parseInt(packageId));

    if (error) {
      console.error("Error deleting package:", error);
      res.status(500).json({ error: "Error deleting package" });
    } else {
      // Respond with success status
      res.status(200).json({ message: "Package deleted successfully!" });
    }
  } catch (error) {
    console.error("Error during package deletion:", error);
    res.status(500).json({ error: "Error during package deletion" });
  }
});

export default adminPackageRoute;
