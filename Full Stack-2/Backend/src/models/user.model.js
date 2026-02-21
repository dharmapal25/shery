const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    username : {
        type : String,
        max : 50,
        required : true,
    },

    email : {
        type : String,
        required : [true, "Plz enter currect email!"],
        unique : true,
    },

    register : {
        type : Number,
        unique : true,
        required : true
    },

    time : {
        type : Date,
        default : Date.now
    }
})

const userInfos = mongo.model("userInfo",userSchema);
module.exports = userInfos;