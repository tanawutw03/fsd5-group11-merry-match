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
// userProfileRoute.post("/upload", upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       throw new Error("No file received");
//     }
//     const uniqueFileName = `${Date.now()}_${file.name}`
//     const imagePath = `images/${uniqueFileName}`;
//     console.log("imagePath88: ",imagePath)

//     // Upload file to Supabase Storage
//     const { data, error } = await supabase.storage
//       .from("profile_images")
//       .upload(file.path,file)

//     // Delete the temporary file after upload
//     fs.unlinkSync(file.path);

//     if (error) {
//       throw new Error(`Storage Error: ${error.message}`);
//     }

//     // Return the uploaded file URL
//     res.status(200).json({ imageUrl: data.Key });
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

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
//**Leang don't delete
// userProfileRoute.post("/upload", upload.single("file"), (req, res) => {
//   res.status(200).json({ message: "Hello OK" });
// });

export default userProfileRoute;
