const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = express.Router();
const authController = require("../Controllers/auth.controller");
authRouter.use(cookieParser());

authRouter.post("/register", authController.registerAuth)

authRouter.post("/login", authController.loginAuth)


module.exports = authRouter