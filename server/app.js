import express from "express";
import cors from "cors";
import adminPackageRoute from "./routers/adminPackage.js";
import adminComplaint from "./routers/adminComplaint.js";
import userProfileRoute from "./routers/userProfile.js";
import matchRouter from "./routers/matchRouter.js";
import merryLimit from "./routers/merryLimit.js";
import userPackage from "./routers/userPackage.js";
import userOrderRoute from "./routers/userOrder.js";
import profileRouter from "./routers/profileRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import chatRouter from "./routers/chatRouter.js";

async function init() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL_PROD
          : process.env.BASE_URL_DEV,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );

  app.use(express.json());
  app.use("/admin", adminPackageRoute);
  app.use("/admin/complaint", adminComplaint);
  app.use("/user", userProfileRoute);
  app.use("/", userOrderRoute);
  app.use("/match", matchRouter);
  app.use("/merryLimit", merryLimit);
  app.use("/profile", profileRouter);
  app.use("/userPackage", userPackage);
  app.use("/logout", logoutRouter);
  app.use("/chat", chatRouter);

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
