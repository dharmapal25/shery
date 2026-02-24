const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    username: {
        type: String,
        unique: [true, "User already exists"],
        required: [true, "User name  required"]
    },

    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, "email required"]
    },

    password: {
        type: String,
        unique: true,
        required: true
    },

    bio: {
        type: String,
    },

    profile_image: {
        type: String,
        default: "user_image - URL"
    }

})


const userCollections = mongo.model("instaDBColection", userSchema);

module.exports = userCollections;