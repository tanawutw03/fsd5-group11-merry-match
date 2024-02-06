import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { supabase } from "./utils/supabaseClient.js";

async function init() {
  const app = express();
  const port = 4008;
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());

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
      console.error(error); // แสดงข้อผิดพลาดใน console
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // app.put("/api/package/:id", async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("package")
  //       .upsert([{ ...req.body, id: req.params.id }]);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.delete("/api/data/:id", async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .delete()
  //       .eq("id", req.params.id);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.post('/api/data', async (req, res) => {
  //   try {
  //     const { data, error } = await supabase.from('profiles').upsert([req.body]);

  //     if (error) {
  //       throw error;
  //     }

  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
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
