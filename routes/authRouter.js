const express = require("express");
const registration = require("../controllers/auth/registration");
const login = require("../controllers/auth/login");
const verifyToken = require("../middleware/middle");
const logoutUser = require("../controllers/auth/logout");
const currentUser = require("../controllers/auth/current");
const multer = require("multer");
const updateAvatar = require("../controllers/auth/updateAvatar");
const verifyUser = require("../controllers/auth/verify");
const resendVerificationEmail = require("../controllers/auth/verify");

const usersRouter = express.Router();
const upload = multer({ dest: "tmp/" });

usersRouter.post("/register", registration);
usersRouter.post("/login", login);
usersRouter.post("/logout", verifyToken, logoutUser);
usersRouter.get("/current", verifyToken, currentUser);
usersRouter.patch(
  "/avatars",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);
usersRouter.get("/verify/:verificationToken", verifyUser);
usersRouter.post("/verify", resendVerificationEmail);

module.exports = usersRouter;
