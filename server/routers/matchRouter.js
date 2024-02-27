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

// GET /api/v1/mutual_matches/:userId
matchRouter.get("/api/v1/mutual_matches/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the list of mutual matches user IDs for the specified user
    const { data, error } = await supabase
      .from("profiles")
      .select("mutual_matches")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching mutual matches:", error);
      return res.status(500).json({ error: "Error fetching mutual matches" });
    }

    // If no data is returned or if mutual matches is null, return an empty array
    if (!data || !data.mutual_matches || !Array.isArray(data.mutual_matches)) {
      return res.json({ message: "No mutual matches found", data: [] });
    }

    const mutualMatches = data.mutual_matches;

    // Fetch profiles of matched users
    const { data: mutualMatchesProfiles, error: profileError } = await supabase
      .from("profiles")
      .select("*") // Can specific the column
      .in("id", mutualMatches);

    if (profileError) {
      console.error("Error fetching mutual matches profiles:", profileError);
      return res
        .status(500)
        .json({ error: "Error fetching mutual matches profiles" });
    }

    // Modify each profile to include a public URL for the avatar
    const profilesWithPublicUrls = await Promise.all(
      mutualMatchesProfiles.map(async (profile) => {
        const avatarUrls =
          profile.avatar_url && profile.avatar_url.length > 0
            ? profile.avatar_url
            : null;

        // Fetch public URLs for all avatar URLs in the array
        const publicUrls = await Promise.all(
          avatarUrls.map(async (avatarUrl) => {
            // Retrieve the public URL for each avatar from Supabase storage
            const { data: publicURL, error: storageError } =
              await supabase.storage
                .from("avatars")
                .getPublicUrl(`${profile.id}/${avatarUrl}`);

            if (storageError) {
              console.error(
                "Error fetching public URL for avatar:",
                storageError
              );

              return null; // Return null if there's an error
            }

            return publicURL; // Return the public URL
          })
        );

        // Update the profile with the array of public URLs for all avatars
        return { ...profile, avatar_url: publicUrls };
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

// GET /api/v1/merged_matches/:userId
matchRouter.get("/api/v1/merged_matches/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the list of matched user IDs for the specified user
    const { data: matchData, error: matchError } = await supabase
      .from("profiles")
      .select("matches")
      .eq("id", userId)
      .single();

    console.log(`matchData:`, matchData);
    if (matchError) {
      console.error("Error fetching matches:", matchError);
      return res.status(500).json({ error: "Error fetching matches" });
    }

    // If no data is returned or if matches is null, set matches to an empty array
    const matches = matchData?.matches || [];

    // Retrieve the list of mutual matches user IDs for the specified user
    const { data: mutualMatchData, error: mutualMatchError } = await supabase
      .from("profiles")
      .select("mutual_matches")
      .eq("id", userId)
      .single();

    console.log(`mutualMatchData:`, mutualMatchData);
    if (mutualMatchError) {
      console.error("Error fetching mutual matches:", mutualMatchError);
      return res.status(500).json({ error: "Error fetching mutual matches" });
    }

    // If no data is returned or if mutual matches is null, set mutualMatches to an empty array
    const mutualMatches = mutualMatchData?.mutual_matches || [];

    // Fetch profiles of matched users for both matches and mutual matches
    const { data: matchedProfiles, error: profileError } = await supabase
      .from("profiles")
      .select("*") // Can specify the column
      .in("id", [...matches, ...mutualMatches]);

    if (profileError) {
      console.error("Error fetching matched profiles:", profileError);
      return res.status(500).json({ error: "Error fetching matched profiles" });
    }

    // Modify each profile to include a public URL for the avatar
    const profilesWithPublicUrls = await Promise.all(
      matchedProfiles.map(async (profile) => {
        const avatarUrls = profile.avatar_url || [];

        // Fetch public URLs for all avatar URLs in the array
        const publicUrls = await Promise.all(
          avatarUrls.map(async (avatarUrl) => {
            // Retrieve the public URL for each avatar from Supabase storage
            const { data: publicURL, error: storageError } =
              await supabase.storage
                .from("avatars")
                .getPublicUrl(`${profile.id}/${avatarUrl}`);

            if (storageError) {
              console.error(
                "Error fetching public URL for avatar:",
                storageError
              );
              return null; // Return null if there's an error
            }

            return publicURL; // Return the public URL
          })
        );
        // Determine the source (matches or mutual_matches) of the profile
        const source = matches.includes(profile.id)
          ? "matches"
          : "mutual_matches";

        // Update the profile with the array of public URLs for all avatars
        return { ...profile, avatar_url: publicUrls, source };
      })
    );

    res.json({
      message: "Merged matches retrieved successfully",
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

        // Update mutual_matches column for user A
        const updatedMutualMatchesA = [
          ...(currentUserData.mutual_matches || []),
          matchedId,
        ];
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

// PUT /api/v2/unmatch
matchRouter.put("/api/v2/unmatch", async (req, res) => {
  const { userId, idUnmatch } = req.body;

  try {
    // Fetch the current user's profile
    const { data: currentUserData, error: currentUserError } = await supabase
      .from("profiles")
      .select("matches, mutual_matches, unmatched_profiles")
      .eq("id", userId)
      .single();

    if (currentUserError) {
      console.error("Error fetching current user profile:", currentUserError);
      return res.status(500).send("Error fetching current user profile");
    }

    // Remove idUnmatch from matches and add it to unmatched_profiles
    const updatedMatches = (currentUserData.matches || []).filter(
      (id) => id !== idUnmatch
    );

    // Remove idUnmatch from mutual_matches and add it to unmatched_profiles
    const updatedMutualMatches = (currentUserData.mutual_matches || []).filter(
      (id) => id !== idUnmatch
    );

    // Add idUnmatch to unmatched_profiles if it's not already present
    const updatedUnmatchedProfiles = [
      ...(currentUserData.unmatched_profiles || []),
      idUnmatch,
    ];

    // Update the current user's profile with the modified arrays
    const { data: updatedCurrentUserData, error: updateCurrentUserError } =
      await supabase
        .from("profiles")
        .update({
          matches: updatedMatches,
          mutual_matches: updatedMutualMatches,
          unmatched_profiles: updatedUnmatchedProfiles,
        })
        .eq("id", userId)
        .select();

    console.log(`updatedCurrentUserData:`, updatedCurrentUserData);
    if (updateCurrentUserError) {
      console.error(
        "Error updating current user profile:",
        updateCurrentUserError
      );
      return res.status(500).send("Error updating current user profile");
    }

    // Fetch the profile of the user being unmatched
    const { data: unmatchUserData, error: unmatchUserError } = await supabase
      .from("profiles")
      .select("matches, mutual_matches, unmatched_profiles")
      .eq("id", idUnmatch)
      .single();

    if (unmatchUserError) {
      console.error("Error fetching unmatch user profile:", unmatchUserError);
      return res.status(500).send("Error fetching unmatch user profile");
    }

    let updatedUnmatchMatches = [...(unmatchUserData.matches || [])];

    // Remove userId from matches and mutual_matches and add it to unmatched_profiles
    if (!unmatchUserData.matches.includes(userId)) {
      updatedUnmatchMatches.push(userId);
    }

    let updatedUnmatchMutualMatches = unmatchUserData.mutual_matches || [];
    // Check if userId is not in mutual_matches before updating
    if (updatedUnmatchMutualMatches.includes(userId)) {
      updatedUnmatchMutualMatches = updatedUnmatchMutualMatches.filter(
        (id) => id !== userId
      );
    }

    // Update the unmatch user's profile with the modified arrays
    const { data: updatedUnmatchUserData, error: updateUnmatchUserError } =
      await supabase
        .from("profiles")
        .update({
          matches: updatedUnmatchMatches,
          mutual_matches: updatedUnmatchMutualMatches,
          // unmatched_profiles: updatedUnmatchUnmatchedProfiles,
        })
        .eq("id", idUnmatch)
        .select();

    console.log(`updatedUnmatchUserData:`, updatedUnmatchUserData);
    if (updateUnmatchUserError) {
      console.error(
        "Error updating unmatch user profile:",
        updateUnmatchUserError
      );
      return res.status(500).send("Error updating unmatch user profile");
    }

    res.json({
      message: "Unmatch successful",
      data: {
        currentUser: updatedCurrentUserData,
        unmatchUser: updatedUnmatchUserData,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected error");
  }
});

export default matchRouter;
