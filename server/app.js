import express from "express";
import cors from "cors";
import adminPackageRoute from "./router/adminPackage.js";
import adminComplaint from "./router/adminComplaint.js";
import userProfileRoute from "./router/userProfile.js";

async function init() {
  const app = express();
  const port = 4008;

  app.use(cors());
  app.use(express.json());
  app.use("/admin", adminPackageRoute);
  app.use("/admin/complaint", adminComplaint);
  app.use("/user", userProfileRoute);

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
