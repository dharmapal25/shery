const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: String,
    
    img_url: {
        type: String,
        default: "-_-",
        required: true
    },

    userId: {
        ref: "instaDBColection",
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const postCollection = mongoose.model("posts", postSchema);

module.exports = postCollection;