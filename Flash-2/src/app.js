const express = require("express");

const app = express();

app.use(express.json())

let appData = [];

app.get('/', (req, res) => {
    res.send("<h1>hello world</h1>")
})


app.post("/login", (req, res) => {
    // res.status(201).json({
    //     msg : "Valid user"
    // })

    console.log(req.body);
    appData.push(req.body);
    res.send("form submitted!");
    appData[req.params.id].course = "CS"
})


app.put("/put/:id", (req, res) => {

    console.log(req.params)

    appData[req.params.id].name = "Dharmapal"
    console.log(appData)

    res.send("Update your all data!")

})


app.patch("/patch/:id", (req, res) => {

    console.log(req.params.id)
    appData[req.params.id].name = "Jod"
    res.send("Successfully changed!");
})


app.delete("/delete/:id", (req, res) => {

    delete appData[req.params.id]
    res.send("selected index/id deleted data")

})

app.get("/all-data", (req, res) => {

    res.send(appData)
})


module.exports = app