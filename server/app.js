import express from "express";
import cors from "cors";
import { supabase } from "./utils/supabaseClient.js";
import multer from "multer";
import adminPackageRoute from "./router/adminPackage.js";
import adminComplaint from "./router/adminComplaint.js";

async function init() {
  const app = express();
  const upload = multer();

  const port = 4008;
  app.use(cors());
  app.use(express.json());
  app.use("/admin", adminPackageRoute);
  app.use("/admin/complaint", adminComplaint);

  app.get("/api/package", async (req, res) => {
    try {
      const { data, error } = await supabase.from("packages").select("*");

      if (error) {
        throw error;
      }

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/package/:package_id", async (req, res) => {
    try {
      const { package_id } = req.params;
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("package_id", package_id);

      if (error) {
        throw error;
      }

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/profile", async (req, res) => {
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

  app.get("/api/profile/:id", async (req, res) => {
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

  app.post("/api/package", upload.single("icon"), async (req, res) => {
    try {
      const { name, merry_limit, description, price } = req.body;
      const iconFile = req.file;

      if (!iconFile) {
        return res.status(400).json({ error: "No icon file uploaded" });
      }

      const fileName = `${Date.now()}_${iconFile.originalname}`;

      const { data: uploadResponse, error: uploadError } =
        await supabase.storage
          .from("iconPackage")
          .upload(`icon/${fileName}`, iconFile.buffer);

      if (uploadError) {
        throw uploadError;
      }

      const folderName = "icon";
      const fileKey = folderName + "/" + fileName;
      // Get public URL of the uploaded file
      const { data: urlData, error } = await supabase.storage
        .from("iconPackage")
        .getPublicUrl(fileKey);

      if (error) {
        throw error;
      }

      const iconUrl = urlData.publicUrl;
      console.log("Public URL:", iconUrl);

      // Insert package data into Supabase Database
      const { data: packageData, error: packageError } = await supabase
        .from("packages")
        .insert([{ name, merry_limit, description, price, iconurl: iconUrl }]);

      if (packageError) {
        throw packageError;
      }

      res.json({ packageData, iconUrl });
    } catch (error) {
      console.error("Error uploading file and storing data:", error.message);
      res.status(500).json({ error: "Failed to upload file and store data" });
    }
  });

  app.put(
    "/api/package/:package_id",
    upload.single("icon"),
    async (req, res) => {
      try {
        const packageId = req.params.package_id;
        const { name, merry_limit, description, price } = req.body;
        const iconFile = req.file;

        let iconUrl;
        if (iconFile) {
          const { data: uploadResponse, error: uploadError } =
            await supabase.storage
              .from("iconPackage") // Bucket name
              .upload(
                `icon/${Date.now()}_${iconFile.originalname}`,
                iconFile.buffer
              ); // Upload to 'icon' folder with timestamped filename

          if (uploadError) {
            throw new Error(uploadError.message);
          }

          const folderName = "icon";
          const fileKey = folderName + "/" + fileName;
          // Get public URL of the uploaded file
          const { data: urlData, error } = await supabase.storage
            .from("iconPackage")
            .getPublicUrl(fileKey);

          if (error) {
            throw error;
          }

          // Get the URL of the uploaded image
          iconUrl = uploadResponse.Key;
        }

        // Update package data into Supabase Database
        const { data, error } = await supabase
          .from("packages")
          .update({
            name,
            merry_limit,
            description,
            price,
            iconurl: iconUrl,
          })
          .match({ id: packageId });

        if (error) {
          throw new Error(error.message);
        }

        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

  app.delete("/api/package/:package_id", async (req, res) => {
    try {
      const { package_id } = req.params;
      const { data, error } = await supabase
        .from("packages")
        .delete()
        .eq("package_id", package_id);
      if (error) {
        throw new Error(error.message);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // app.post("/api/package", async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("packages")
  //       .upsert([req.body]);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.put("/api/package/:package_id", async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("packages")
  //       .upsert([{ ...req.body, id: req.params.package_id }]);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.delete("/api/package/:package_id", async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("packages")
  //       .delete()
  //       .eq("package_id", req.params.package_id);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.use("/auth", authRouter);
  // app.use("/posts", postRouter);

  app.get("/", (req, res) => {
    res.send("Hello Marry Porject!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
