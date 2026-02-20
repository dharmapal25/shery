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

app.patch("/data/:id", async (req, res) => {

    let dataUpdate = req.body

    console.log(req.body.email)

    let params = req.params.id;
    let data = await collectionData.findOneAndUpdate({ _id: params }, { email: req.body.email });

    res.send("Successfully update username");

})

app.get("/data", async (req, res) => {

    const data = await collectionData.find()

    res.send(data);
})


module.exports = app;