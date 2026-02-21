const mongo = require("mongoose");

const databaseConnect = mongo.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Successfully connected to DB");
})

module.exports = databaseConnect;