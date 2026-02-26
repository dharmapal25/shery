require("dotenv").config();
const express = require("express");
require("./config/dbs");
const authRouter = require("../src/Routers/Auth.router");
const postRouters = require("../src/Routers/post.router")
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts",postRouters);

module.exports = app;