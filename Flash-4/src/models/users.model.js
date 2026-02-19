const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    name : String,
    course : String,
    year : Number
})

const personSchema = mongo.model("collectionDBs",userSchema);
module.exports = personSchema;