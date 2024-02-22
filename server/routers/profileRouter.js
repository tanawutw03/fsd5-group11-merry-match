import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const profileRouter = Router();

export let allProfiles = []; // Store all profiles globally to keep track of fetched profiles
export function resetAllProfiles() {
  allProfiles = [];
}

// // Create a function to handle inserts
// const handleInserts = (payload) => {
//   console.log("Insert received!", payload);
//   // Add your logic to handle inserts here
// };

// // Create a function to handle updates
// const handleUpdates = (payload) => {
//   console.log("Update received!", payload);
//   // Add your logic to handle updates here
// };

// // Create a function to handle both inserts and updates
// const handleChanges = (payload) => {
//   if (payload.eventType === "INSERT") {
//     handleInserts(payload);
//   } else if (payload.eventType === "UPDATE") {
//     handleUpdates(payload);
//   }
// };

// // Listen to events
// const subscription = supabase
//   .channel("profiles")
//   .on(
//     "postgres_changes",
//     { event: "*", schema: "public", table: "profiles" },
//     handleChanges
//   )
//   .subscribe();

// if (!subscription.closed) {
//   console.log("Currently subscribed to events");
// } else {
//   console.log("Currently not subscribed to events");
// }

// subscription.unsubscribe();

// GET /api/v1/profile/:excludeUserId/:offset
profileRouter.get(
  "/api/v1/profile/:excludeUserId/:offset",
  async (req, res) => {
    try {
      const excludeUserId = req.params.excludeUserId;
      const limit = 5; // Set the limit to 5 profiles per request

      // Fetch all profiles ordered by full_name if not already fetched
      // if (allProfiles.length === 0) {
      const { data: fetchedProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        return res.status(500).json({ error: "Error fetching profiles" });
      }

      allProfiles = fetchedProfiles;

      // }

      console.log(`allProfiles lenght:`, allProfiles.length);
      // Find the profile object for the excludeUserId
      const excludeUserProfile = allProfiles.find(
        (profile) => profile.id === excludeUserId
      );

      if (excludeUserProfile) {
        // Log the matches array for the excludeUserId
        console.log(
          `Matches for exclude user (${excludeUserId}):`,
          excludeUserProfile.matches
        );
      } else {
        console.log(`Profile not found for user ${excludeUserId}`);
      }

      // Get the matches and unmatched profiles arrays of the excludeUserId, or an empty array if they don't exist
      const excludeUserIdMatches = excludeUserProfile.matches || [];
      const excludeUserIdUnmatched =
        excludeUserProfile.unmatched_profiles || [];
      const excludeUserIdMutualMatches =
        excludeUserProfile.mutual_matches || [];

      // Filter out the excludeUserId and unmatched profiles from the fetched profiles
      const filteredProfiles = allProfiles.filter((profile) => {
        return (
          profile.id !== excludeUserId &&
          profile.id !== "ff91e4bc-527c-48ec-b463-76e978058f28" && // Admin Id
          !excludeUserIdMatches.includes(profile.id) &&
          !excludeUserIdUnmatched.includes(profile.id) &&
          !excludeUserIdMutualMatches.includes(profile.id)
        );
      });

      console.log(`Filtered profiles length:`, filteredProfiles.length);

      // Calculate the offset to start from the beginning of the profiles list
      let offset = 0;

      // Extract the subset of profiles based on the offset and limit
      const profilesSubset = filteredProfiles.slice(offset, offset + limit);

      // If no more profiles to fetch, return an empty array
      if (profilesSubset.length === 0) {
        return res.json({
          message: "All profiles fetched",
          data: [],
        });
      }

      // Remove the fetched profiles from the allProfiles array
      allProfiles = allProfiles.filter(
        (profile) =>
          !profilesSubset.some(
            (subsetProfile) => subsetProfile.id === profile.id
          )
      );

      // Retrieve avatar URLs for each profile
      const profilesWithAvatarUrls = await Promise.all(
        profilesSubset.map(async (profile) => {
          const userId = profile.id;
          const { data: avatarFiles, error: avatarFilesError } =
            await supabase.storage.from("avatars").list(userId, {
              limit: 1,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });

          if (avatarFilesError) {
            console.error(
              `Error fetching avatar for user ${userId}:`,
              avatarFilesError
            );
            return { ...profile, avatarUrl: null };
          }

          if (avatarFiles.length === 0) {
            return { ...profile, avatarUrl: null };
          }

          const avatarFileName = avatarFiles[0].name;
          const { data: avatarUrlData, error: avatarUrlError } =
            await supabase.storage
              .from("avatars")
              .getPublicUrl(`${userId}/${avatarFileName}`);

          if (avatarUrlError) {
            console.error(
              `Error getting public URL for avatar ${avatarFileName}:`,
              avatarUrlError
            );
            return { ...profile, avatarUrl: null };
          }

          return { ...profile, avatarUrl: avatarUrlData.publicUrl };
        })
      );

      res.json({
        message: "Profiles retrieved successfully",
        data: profilesWithAvatarUrls,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error" });
    }
  }
);

profileRouter.get("/api/v1/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const { data: userProfile, error: userProfileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (userProfileError) {
      console.error("Error fetching profile:", userProfileError);
      return res.status(500).json({ error: "Error fetching profile" });
    }

    if (!userProfile) {
      return res.json({ message: "Profile not found", data: null });
    }

    const userProfileWithPublicUrls = await Promise.all(
      userProfile.avatar_url.map(async (avatarUrl) => {
        const { data: publicURL, error: storageError } = await supabase.storage
          .from("avatars")
          .getPublicUrl(`${userId}/${avatarUrl}`);

        if (storageError) {
          console.error("Error fetching public URL for avatar:", storageError);
          return null;
        }
        return publicURL;
      })
    );

    res.json({
      message: "Profile retrieved successfully",
      data: { ...userProfile, avatar_url: userProfileWithPublicUrls },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error" });
  }
});

export default profileRouter;
