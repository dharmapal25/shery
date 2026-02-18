const app = require("./src/app");

const mongo = require("mongoose");

mongo.connect("mongodb+srv://dharmapal:BV0tnS98ZC1winrS@cohort.le4za9o.mongodb.net/cohort-2")
.then(()=> {
    console.log("Database is connected!");
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})