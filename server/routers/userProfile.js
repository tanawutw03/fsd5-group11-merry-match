import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import multer from "multer";
// import fs from "fs";

const userProfileRoute = Router();
const upload = multer();
//leang don't Delete
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`
//     cb(null, fileName)
//   }
// })

// const upload = multer({
//   storage: storage
// })

userProfileRoute.get("/profile", async (req, res) => {
  try {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userProfileRoute.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("profiles")
      .select(`*,user_profiles_url(storage_location)`)
      .eq("id", id);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userProfileRoute.post("/upload", upload.single("file"), async (req, res) => {
  const fileName = req.files;
  const timestamp = Date.now();

  const uniqueFileName = `${timestamp}-${fileName}`;
  const imagePath = `images/${uniqueFileName}`;
  console.log("fileName: ", fileName);
  console.log("uniqueFileName: ", uniqueFileName);

  try {
    const { data, error } = await supabase.storage
      .from("profile_images")
      .upload(imagePath, file.buffer);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const { data: dataLoad, error: errorLoad } = await supabase.storage
      .from("profile_images")
      .getPublicUrl(imagePath);

    if (error) {
      throw error;
    }

    console.log(dataLoad);
    res.json({ uploadedFileUrl: dataLoad.publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//------- leang for user_profile Saveurl-------
userProfileRoute.put("/saveImageUrlSets", async (req, res) => {
  try {
    const { imageUrlSets, userId } = req.body;

    const { data, error } = await supabase
      .from("user2_profiles_url")
      .update({
        storage_location: imageUrlSets,
      })
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Image URL sets updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userProfileRoute.patch("/updateProfile", async (req, res) => {
  const formData = req.body;
  try {
    const { data: existingProfile, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", formData.id)
      .single();

    console.log(`existingProfile:`, existingProfile);
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating profile" });
    }

    const deletedFiles = existingProfile.avatar_url.filter(
      (url) => !formData.avatar_url.includes(url)
    );

    await Promise.all(
      deletedFiles.map(async (url) => {
        const fileName = url.split("/").pop();

        const { data, error } = await supabase.storage
          .from("avatars")
          .remove([`${formData.id}/${fileName}`]);
      })
    );

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        country: formData.country,
        city: formData.city,
        username: formData.username,
        avatar_url: formData.avatar_url,
        email: formData.email,
        sex_identities: formData.sex_identities,
        sex_preferences: formData.sex_preferences,
        racial_preferences: formData.racial_preferences,
        meeting_interest: formData.meeting_interest,
        hobbies: formData.hobbies,
        description: formData.about_me,
      })
      .eq("id", formData.id);

    if (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ error: "An error occurred while updating profile" });
    } else {
      console.log(`data:`, data);
      return res.status(200).json({ message: "Profile updated successfully" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating profile" });
  }
});

export default userProfileRoute;
