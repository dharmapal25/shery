const mongoose = require("mongoose");

const mongo = mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Database successfully connect!");
})

module.exports = mongo