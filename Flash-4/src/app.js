const express = require("express");
const personSchema = require("./models/users.model");
const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
    
    const {name,course,year} = req.body

    const data = await personSchema.create({
        name,course,year
    })

    res.status(200).json({
        msg : "msg loaded successfully",
        data
    })

})

app.get("/user-all",async (req,res)=> {
    const data = await personSchema.find();

    res.send(data)
    console.log(data);
})


module.exports = app