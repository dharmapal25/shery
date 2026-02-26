const express = require("express");
const postController = require("../Controllers/post.controller");
const postRouters = express.Router()
const multer = require("multer");

const upload = multer({storage : multer.memoryStorage()})

postRouters.post("/",upload.single("image_from_postman"), postController.postCreate)

module.exports = postRouters