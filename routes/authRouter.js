const express = require("express");
const registration = require("../auth/registration");
const login = require("../auth/login");
const verifyToken = require("../auth/middle");
const logoutUser = require("../auth/logout");
const currentUser = require("../auth/current");

const usersRouter = express.Router();

usersRouter.post("/register", registration);
usersRouter.post("/login", login);
usersRouter.post("/logout", verifyToken, logoutUser);
usersRouter.get("/current", verifyToken, currentUser);

module.exports = usersRouter;
