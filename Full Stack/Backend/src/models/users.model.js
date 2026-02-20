const mongo = require("mongoose");

const newSchema = new mongo.Schema({
    email : {
        type : String,
        // unique : true,
        required : [true,"Please enter email"]
    },

    password : {
        type : String,
    },

    time : { 
        type : Date,
        default : Date.now,
        immutable : true
    }
})

const collectionData = mongo.model("collectionDB",newSchema);

module.exports = collectionData;