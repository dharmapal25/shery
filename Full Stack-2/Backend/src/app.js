const express = require("express");
const userInfos = require("./models/user.model");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/users-create", async (req, res) => {

    await userInfos.create(req.body)
    res.send("Successfully created!");
})

app.get("/user-data", (req, res) => {

    userInfos.find().then((response) => {
        console.log(response)
        res.send(response)
    })

})


app.patch("/update/:id", async (req, res) => {
    console.log(req.body.email)
    await userInfos.findByIdAndUpdate({ _id: req.params.id }, { email: req.body.email });
    res.send("Successfully Updated!");

})


app.delete("/delete/:id", (req, res) => {
    delete userInfos.findByIdAndDelete({ _id: req.params.id }).then(()=> {

        res.json({msg : "Successfully Deleted!"});
    })

})



module.exports = app