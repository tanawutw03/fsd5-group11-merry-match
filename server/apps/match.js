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

    // Initialize matches array as an empty array if it is null
    const currentMatches = currentUserData.matches || [];

    // Determine if matchedUserId is an array or a single value
    const newMatchIds = Array.isArray(matchedUserId)
      ? matchedUserId
      : [matchedUserId];

    // Filter out any IDs already present in the existing matches
    const uniqueNewMatchIds = newMatchIds.filter(
      (id) => !currentMatches.includes(id)
    );

    // Only proceed if there are new, unique matches to add
    if (uniqueNewMatchIds.length > 0) {
      // Combine existing matches with new, unique match IDs
      const updatedMatches = [...currentMatches, ...uniqueNewMatchIds];

      // Update the matches array in the database
      const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({ matches: updatedMatches })
        .eq("id", userId)
        .select();

      console.log(`updatedData:`, updatedData);
      if (updateError) {
        console.error("Error updating matches:", updateError);
        return res.status(500).send("Error updating matches");
      }

      // Check for mutual matches
      const { data: matchedUserData, error: matchedUserError } = await supabase
        .from("profiles")
        .select("matches")
        .eq("id", uniqueNewMatchIds[0])
        .single();

      if (matchedUserError) {
        console.error("Error fetching matched user data:", matchedUserError);
        return res.status(500).send("Error fetching matched user data");
      }

      if (matchedUserData.matches.includes(userId)) {
        // Mutual match detected, send notification
        // Assuming you have some notification mechanism in place
        // You can add code here to trigger notification
        // For example, you can emit a socket event, send a push notification, etc.

        // Respond with mutual match data
        return res.json({ message: "Mutual match", data: updatedData });
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
