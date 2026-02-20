const express = require("express");
const collectionData = require("./models/users.model");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello world!");
})


app.post("/login", async (req, res) => {

    // console.log(req.body);

    const data = await collectionData.create(req.body)

    res.status(201).json({
        msg: "Successfully submitted!",
        data
    })


})

app.delete("/data/:id", async (req, res) => {

    console.log(req.params.id)

    await collectionData.findByIdAndDelete(req.params.id)

    res.status(201).json({
         msg: "Successfully deleted!",
    })

})

app.get("/data", async (req, res) => {

    const data = await collectionData.find()

    res.send(data);
})


module.exports = app;