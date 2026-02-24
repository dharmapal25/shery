const mongo = require("mongoose");

mongo.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected to server");
})


