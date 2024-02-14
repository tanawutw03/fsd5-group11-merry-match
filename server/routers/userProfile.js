import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import multer from "multer";
import fs from "fs";

const userProfileRoute = Router();
const upload = multer();

userProfileRoute.get("/profile", async (req, res) => {
  try {
    const { data, error } = await supabase.from("user2_profiles").select("*");
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
      .from("user2_profiles")
      .select("*")
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

//------- leang for upload userprofilePage------
userProfileRoute.post("/uploadImage", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error("No file received");
    }
    const uniqueFileName = `${file.originalname.split(".")[0]}_${Date.now()}.${
      file.originalname.split(".")[1]
    }`;
    const imagePath = `images/${uniqueFileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabaseClient.storage
      .from("profile_images")
      .upload(file.path, {
        destination: imagePath,
        contentType: file.mimetype,
      });

    // Delete the temporary file after upload
    fs.unlinkSync(file.path);

    if (error) {
      throw new Error(`Storage Error: ${error.message}`);
    }

    // Return the uploaded file URL
    res.status(200).json({ imageUrl: data.Key });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    res.status(500).json({ error: error.message });
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

//------- leang for userprofilePage  saveImageUrl------
// userProfileRoute.post("/createImageUrls", async (req, res) => {
//   try {
//     const { userId, imageUrl } = req.body;
//     const { data, error } = await supabase
//       .from("user2_profiles_url")
//       .insert([{ id: 51, storage_location: imageUrl }]);

//     if (error) {
//       throw new Error(`Database Error: ${error.message}`);
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error saving image URL to database:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

export default userProfileRoute;
