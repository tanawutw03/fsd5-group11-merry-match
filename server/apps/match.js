import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const matchRouter = Router();

// GET /api/v1/match/:userId
matchRouter.get("/api/v1/match/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the list of matched user IDs for the specified user
    const { data, error } = await supabase
      .from("profiles")
      .select("matches")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching matches:", error);
      return res.status(500).json({ error: "Error fetching matches" });
    }

    // If no data is returned or if matches is null, return an empty array
    if (!data || !data.matches || !Array.isArray(data.matches)) {
      return res.json({ message: "No matches found", data: [] });
    }

    const matches = data.matches;

    // Fetch profiles of matched users
    const { data: matchedProfiles, error: profileError } = await supabase
      .from("profiles")
      .select("*") // Can specific the column
      .in("id", matches);

    if (profileError) {
      console.error("Error fetching matched profiles:", profileError);
      return res.status(500).json({ error: "Error fetching matched profiles" });
    }

    res.json({
      message: "Matches retrieved successfully",
      data: matchedProfiles,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error" });
  }
});

// PUT /api/v1/match/
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
