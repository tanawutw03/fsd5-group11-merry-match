import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const merryLimit = Router();

merryLimit.get("/count/:id", async (req, res) => {
  try {
    const countId = req.params.id;

    // ดึงข้อมูล merry_count และ merry_limit โดยเฉพาะจากฐานข้อมูลโดยใช้ ID ที่ให้มา
    const { data: countData, error: countError } = await supabase
      .from("merry_limits")
      .select("merry_count, merry_limit")
      .eq("id", parseInt(countId))
      .single();

    if (countError) {
      console.error("Error fetching data:", countError.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!countData) {
      return res.status(404).json({ error: "Data not found" });
    }

    const { merry_count, merry_limit } = countData;

    // คำนวณค่า merry_count ที่สามารถส่งกลับไปในการตอบกลับ HTTP
    const remainingCount = merry_limit - merry_count;

    // ส่งค่า remainingCount กลับไปในรูปแบบ JSON
    res.status(200).json({ remainingCount });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Unexpected error" });
  }
});

merryLimit.get("/limit/:id", async (req, res) => {
  try {
    const limitId = req.params.id;
    // Fetch complaint data by ID
    const { data, error } = await supabase
      .from("merry_limits")
      .select("merry_limit")
      .eq("id", parseInt(limitId))
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

merryLimit.put("/count/:id", async (req, res) => {
  try {
    const countId = req.params.id;

    // Fetch merry_count and merry_limit data by ID
    const { data: countData, error: countError } = await supabase
      .from("merry_limits")
      .select("merry_count, merry_limit")
      .eq("id", parseInt(countId))
      .single();

    if (countError) {
      console.error("Error fetching data:", countError.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!countData) {
      return res.status(404).json({ error: "Data not found" });
    }

    const { merry_count, merry_limit } = countData;

    // Check if merry_count exceeds merry_limit
    if (merry_count >= merry_limit) {
      return res.status(400).json({ error: "merry_count exceeds merry_limit" });
    }

    // If merry_count doesn't exceed merry_limit, increment merry_count by 1
    const updatedCount = merry_count + 1;

    // Update merry_count in the database
    const { data: updateData, error: updateError } = await supabase
      .from("merry_limits")
      .update({ merry_count: updatedCount })
      .eq("id", parseInt(countId));

    if (updateError) {
      console.error("Error updating data:", updateError.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    res
      .status(200)
      .json({ message: "merry_count updated successfully", data: updateData });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Unexpected error" });
  }
});

export default merryLimit;
