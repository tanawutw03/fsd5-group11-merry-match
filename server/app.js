import express from "express";
import cors from "cors";
import adminPackageRoute from "./routers/adminPackage.js";
import adminComplaint from "./routers/adminComplaint.js";
import userProfileRoute from "./routers/userProfile.js";
import matchRouter from "./routers/matchRouter.js";
import merryLimit from "./routers/merryLimit.js";
import userPackage from "./routers/userPackage.js";
import profileRouter from "./routers/profileRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import userOrderRoute from "./routers/userOrder.js";

async function init() {
  const app = express();
  const port = 4008;

  app.use(cors());
  app.use(express.json());
  app.use("/admin", adminPackageRoute);
  app.use("/admin/complaint", adminComplaint);
  app.use("/user", userProfileRoute);
  app.use("/match", matchRouter);
  app.use("/", userOrderRoute);
  app.use("/matching", matchRouter);
  app.use("/merryLimit", merryLimit);
  app.use("/profile", profileRouter);
  app.use("/userPackage", userPackage);
  app.use("/logout", logoutRouter);

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
