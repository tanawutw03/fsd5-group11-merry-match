import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const adminComplaint = Router();

adminComplaint.get("/news", async (req, res) => {
  try {
    // Query the database for complaints with status "new"
    const { data: newComplaints, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("status", "new");

    if (error) {
      console.error("Error fetching new complaints:", error.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Send the count of new complaints in the response
    res.json({ newComplaintCount: newComplaints.length });
  } catch (error) {
    console.error("Error fetching new complaints:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

adminComplaint.get("/", async (req, res) => {
  try {
    // Fetch all complaints from your database
    const { data, error } = await supabase.from("complaints").select("*");

    // Check if there's an error
    if (error) {
      console.error("Error fetching complaints:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send the complaints data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching complaints:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

adminComplaint.get("/:id", async (req, res) => {
  try {
    const complaintId = req.params.id;
    // Fetch complaint data by ID
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", parseInt(complaintId))
      .single();

    if (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Send the complaint data as a response
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching complaint data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

adminComplaint.put("/pending/:id", async (req, res) => {
  try {
    const complaintId = req.params.id;

    const { data, error } = await supabase
      .from("complaints")
      .update({ status: "pending" })
      .eq("id", complaintId);

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

adminComplaint.put("/resolved/:id", async (req, res) => {
  try {
    const complaintId = req.params.id; // Assuming you're sending the complaint ID in the request body

    // Update the status of the complaint to "resolved"
    const { data, error } = await supabase
      .from("complaints")
      .update({ status: "resolved" })
      .eq("id", complaintId);

    if (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Send a success response
      res.status(200).json({ message: "Status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

adminComplaint.put("/cancel/:id", async (req, res) => {
  try {
    const complaintId = req.params.id; // Assuming you're sending the complaint ID in the request body

    // Update the status of the complaint to "resolved"
    const { data, error } = await supabase
      .from("complaints")
      .update({ status: "cancel" })
      .eq("id", complaintId);

    if (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Send a success response
      res.status(200).json({ message: "Status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default adminComplaint;
