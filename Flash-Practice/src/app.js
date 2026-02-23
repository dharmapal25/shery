const express = require("express");
const mongo = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const app = express();
app.use(cookies());
app.use(express.json());

mongo.connect('mongodb://127.0.0.1:27017/userDataDB').then(() => console.log("connected to DB"));

const userSchema = mongo.Schema({ email: String, password: String })
const usercolls = mongo.model("userCollectionInfo", userSchema);


app.post("/login", async (req, res) => {

    let token = req.cookies.Token_JWT
    console.log("token > ", token)

    let data = jwt.verify(token, "jwtscretkey123")
    console.log(data)

    const usersInfo = await usercolls.findById({ _id: data.id })

    if (usersInfo) {
        res.cookie("Token_JWT", token).json({
            "msg": "Login successfully!",
        })
    }

    const { email, password } = req.body

    const isEmail = await usercolls.findOne({ email });

    if (!isEmail) {
        res.json({
            "msg": "mail isn't valid!"
        })
    }

    const isMatch = await bcrypt.compare(password, isEmail.password)
    console.log(isEmail && isMatch)

    if (isMatch) {
        res.json({
            "msg": "Login successfully!",
            isEmail
        })

    } else {
        res.json({
            "msg": "Login fail try again!",
        })
    }
})


app.post("/register", async (req, res) => {
    const { email, password } = req.body

    const hashPass = await bcrypt.hash(password, 10);
    const Ismail = await usercolls.findOne({ email })

    if (!Ismail) {
        const data = await usercolls.create({
            email,
            password: hashPass
        })

        let Token = jwt.sign(
            { id: data._id, email: data.email }, "jwtscretkey123",
            { expiresIn: "1m" }
        )

        res.cookie("Token_JWT", Token).send({
            "msg": "successfully create account",
            data
        })

    } else {
        return res.json({
            "msg": "Email alredy exist!"
        })
    }

})


app.get("/all-users", async (req, res) => {
    let data = await usercolls.find();
    res.send(data)
})


async function main() {

    let pass = "Flash";
    let dbpass = "Flash";

    let name = await bcrypt.hash(pass, 10)

    let match = await bcrypt.compare(dbpass, name) // main , hash

    console.log(name, " name >> ")
    console.log(match, " match >> ")
}

main()

module.exports = app;