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

    // Modify each profile to include a public URL for the avatar
    const profilesWithPublicUrls = await Promise.all(
      matchedProfiles.map(async (profile) => {
        const avatarUrl =
          profile.avatar_url && profile.avatar_url.length > 0
            ? profile.avatar_url[0]
            : null;

        if (avatarUrl) {
          // Retrieve the public URL for the avatar from Supabase storage
          const { data: publicURL, error: storageError } =
            await supabase.storage
              .from("avatars")
              .getPublicUrl(`${profile.id}/${avatarUrl}`);

          if (storageError) {
            console.error(
              "Error fetching public URL for avatar:",
              storageError
            );

            return profile;
          }

          // Update the profile with the public URL
          return { ...profile, avatar_url: publicURL };
        }
        return profile;
      })
    );

    res.json({
      message: "Matches retrieved successfully",
      data: profilesWithPublicUrls,
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
      .select("matches, mutual_matches")
      .eq("id", userId)
      .single();

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

      if (updateError) {
        console.error("Error updating matches:", updateError);
        return res.status(500).send("Error updating matches");
      }

      // Check for mutual matches
      const { data: matchedUserData, error: matchedUserError } = await supabase
        .from("profiles")
        .select("matches, mutual_matches")
        .eq("id", uniqueNewMatchIds[0])
        .single();

      if (matchedUserError) {
        console.error("Error fetching matched user data:", matchedUserError);
        return res.status(500).send("Error fetching matched user data");
      }

      if (matchedUserData.matches && matchedUserData.matches.includes(userId)) {
        const matchedId = uniqueNewMatchIds[0];

        console.log(
          "Type of currentUserData.mutual_matches:",
          typeof currentUserData.mutual_matches
        );
        console.log(
          "Type of matchedUserData.mutual_matches:",
          typeof matchedUserData.mutual_matches
        );

        // Update mutual_matches column for user A
        const updatedMutualMatchesA = [
          ...(currentUserData.mutual_matches || []),
          matchedId,
        ];

        // Log data to be added to mutual_matches for user A
        console.log(
          "Data to be added to mutual_matches for user A:",
          matchedId
        );

        await supabase
          .from("profiles")
          .update({ mutual_matches: updatedMutualMatchesA })
          .eq("id", userId)
          .single();

        // Update mutual_matches column for user B
        const updatedMutualMatchesB = [
          ...(matchedUserData.mutual_matches || []),
          userId,
        ];

        // Log data to be added to mutual_matches for user B
        console.log("Data to be added to mutual_matches for user B:", userId);

        await supabase
          .from("profiles")
          .update({ mutual_matches: updatedMutualMatchesB })
          .eq("id", matchedId)
          .single();

        // Remove the matched ID from the matches column for both users
        const updatedMatchesA = currentUserData.matches
          ? currentUserData.matches.filter((id) => id !== matchedId)
          : [];

        await supabase
          .from("profiles")
          .update({ matches: updatedMatchesA })
          .eq("id", userId)
          .single();

        const updatedMatchesB = matchedUserData.matches
          ? matchedUserData.matches.filter((id) => id !== userId)
          : [];

        await supabase
          .from("profiles")
          .update({ matches: updatedMatchesB })
          .eq("id", matchedId)
          .single();

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

// PUT /api/v1/unmatch
matchRouter.put("/api/v1/unmatch", async (req, res) => {
  const { userId, unmatchUserId } = req.body;

  try {
    // Retrieve the current unmatched profiles for the user
    const { data: currentUserData, error: selectError } = await supabase
      .from("profiles")
      .select("unmatched_profiles")
      .eq("id", userId)
      .single();

    if (selectError) {
      console.error("Error fetching current unmatched profiles:", selectError);
      return res.status(500).send("Error fetching current unmatched profiles");
    }

    // Initialize unmatched_profiles array as an empty array if it is null
    const currentUnmatchedProfiles = currentUserData.unmatched_profiles || [];

    // Normalize unmatchUserId to an array
    const unmatchUserIdsArray = Array.isArray(unmatchUserId)
      ? unmatchUserId
      : [unmatchUserId];

    // Filter out any IDs already present in the existing unmatched profiles
    const uniqueNewUnmatchIds = unmatchUserIdsArray.filter(
      (id) => !currentUnmatchedProfiles.includes(id)
    );

    // Only proceed if there are new, unique unmatches to add
    if (uniqueNewUnmatchIds.length > 0) {
      // Combine existing unmatched profiles with new, unique unmatch IDs
      const updatedUnmatchedProfiles = [
        ...currentUnmatchedProfiles,
        ...uniqueNewUnmatchIds,
      ];

      // Update the unmatched_profiles array in the database
      const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({ unmatched_profiles: updatedUnmatchedProfiles })
        .eq("id", userId)
        .single();

      if (updateError) {
        console.error("Error updating unmatched profiles:", updateError);
        return res.status(500).send("Error updating unmatched profiles");
      }

      res.json({ message: "User unmatched successfully", data: updatedData });
    } else {
      // If there are no new unmatches to add, respond appropriately
      res.json({ message: "No new unmatches to add", data: currentUserData });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

matchRouter.put("/api/v2/unmatch", async (req, res) => {
  const { userId, idUnmatch } = req.body;

  try {
    // Fetch the user's matches
    const { data: matchesData, error: matchesError } = await supabase
      .from("profiles")
      .select("matches")
      .eq("id", userId)
      .single();
    console.log(matchesData);
    // Fetch the user's unmatched profiles
    const { data: unmatchedProfilesData, error: unmatchedProfilesError } =
      await supabase
        .from("profiles")
        .select("unmatched_profiles")
        .eq("id", userId)
        .single();
    console.log(unmatchedProfilesData);
    if (matchesError || unmatchedProfilesError) {
      console.error(
        "Error fetching user profile:",
        matchesError || unmatchedProfilesError
      );
      return res.status(500).send("Error fetching user profile");
    }

    // Remove idUnmatch from matches
    const updatedMatches = (matchesData.matches || []).filter(
      (id) => id !== idUnmatch
    );

    // Initialize updatedUnmatchedProfiles as an empty array if it's null
    let updatedUnmatchedProfiles =
      unmatchedProfilesData.unmatched_profiles || [];

    // Add idUnmatch to updatedUnmatchedProfiles if it's not already present
    if (!updatedUnmatchedProfiles.includes(idUnmatch)) {
      updatedUnmatchedProfiles.push(idUnmatch);
    }

    console.log("match", updatedMatches);
    console.log("unmatch", updatedUnmatchedProfiles);

    // Update the matches and unmatched_profiles arrays in the database
    const { data: updatedData, error: updateError } = await supabase
      .from("profiles")
      .update({
        matches: updatedMatches,
        unmatched_profiles: updatedUnmatchedProfiles,
      })
      .eq("id", userId)
      .single(); // Use .single() instead of .select() since we're updating a single row

    if (updateError) {
      console.error("Error updating profiles:", updateError);
      return res.status(500).send("Error updating profiles");
    }

    res.json({ message: "Unmatch successful", data: updatedData });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

matchRouter.put("/api/v2/unmatch", async (req, res) => {
  const { userId, idUnmatch } = req.body;

  try {
    // Fetch the user's matches
    const { data: matchesData, error: matchesError } = await supabase
      .from("profiles")
      .select("matches")
      .eq("id", userId)
      .single();
    console.log(matchesData);
    // Fetch the user's unmatched profiles
    const { data: unmatchedProfilesData, error: unmatchedProfilesError } =
      await supabase
        .from("profiles")
        .select("unmatched_profiles")
        .eq("id", userId)
        .single();
    console.log(unmatchedProfilesData);
    if (matchesError || unmatchedProfilesError) {
      console.error(
        "Error fetching user profile:",
        matchesError || unmatchedProfilesError
      );
      return res.status(500).send("Error fetching user profile");
    }

    // Remove idUnmatch from matches
    const updatedMatches = (matchesData.matches || []).filter(
      (id) => id !== idUnmatch
    );

    // Initialize updatedUnmatchedProfiles as an empty array if it's null
    let updatedUnmatchedProfiles =
      unmatchedProfilesData.unmatched_profiles || [];

    // Add idUnmatch to updatedUnmatchedProfiles if it's not already present
    if (!updatedUnmatchedProfiles.includes(idUnmatch)) {
      updatedUnmatchedProfiles.push(idUnmatch);
    }

    console.log("match", updatedMatches);
    console.log("unmatch", updatedUnmatchedProfiles);

    // Update the matches and unmatched_profiles arrays in the database
    const { data: updatedData, error: updateError } = await supabase
      .from("profiles")
      .update({
        matches: updatedMatches,
        unmatched_profiles: updatedUnmatchedProfiles,
      })
      .eq("id", userId)
      .single(); // Use .single() instead of .select() since we're updating a single row

    if (updateError) {
      console.error("Error updating profiles:", updateError);
      return res.status(500).send("Error updating profiles");
    }

    res.json({ message: "Unmatch successful", data: updatedData });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

export default matchRouter;
