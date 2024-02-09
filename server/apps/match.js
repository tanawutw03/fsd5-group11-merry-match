import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const matchRouter = Router();

matchRouter.get("/api/v1/match", async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    // .eq("id")
    .select("matches");

  res.json({ message: `View all matched`, data: data });
});

matchRouter.put("/api/v1/match", async (req, res) => {
  const { userId, matchedUserId } = req.body;

  try {
    // First, retrieve the current matches for the user
    const { data: currentUserData, error: selectError } = await supabase
      .from("profiles")
      .select("matches")
      .eq("id", userId)
      .single();

    console.log(`currentUserData:`, currentUserData);
    if (selectError) {
      console.error("Error fetching current matches:", selectError);
      return res.status(500).send("Error fetching current matches");
    }

    // Determine if matchedUserId is an array or a single value
    const newMatchIds = Array.isArray(matchedUserId)
      ? matchedUserId
      : [matchedUserId];

    // Filter out any IDs already present in the existing matches
    const uniqueNewMatchIds = newMatchIds.filter(
      (id) => !currentUserData.matches.includes(id)
    );

    // Only proceed if there are new, unique matches to add
    if (uniqueNewMatchIds.length > 0) {
      // Combine existing matches with new, unique match IDs
      const updatedMatches = [...currentUserData.matches, ...uniqueNewMatchIds];

      // Update the matches array in the database
      const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({ matches: updatedMatches })
        .eq("id", userId)
        .select();

      if (updateError) {
        console.error("Error updating matches:", updateError);
        return res.status(500).send("Error updating matches");
      }

      res.json({ message: "Update successful", data: updatedData });
    } else {
      // If there are no new matches to add, respond appropriately
      res.json({ message: "No new matches to add", data: currentUserData });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

export default matchRouter;
