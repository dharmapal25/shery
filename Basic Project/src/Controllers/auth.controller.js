const mongo = require("mongoose");
const userCollections = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginAuth(req, res) {
    const { email, password } = req.body

    if (req.cookies.jwt_token) {
        try {
            let IsjwtVerify = jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET)

            if (IsjwtVerify) {
                return res.json({ msg: "Already logged in" })  // ✅ tabhi return karo
            }
        }
        catch (err) {
            // Token expired ya invalid hai - normal login karne do
        }
    }

    const findAll = await userCollections.findOne({ email: email });

    if (findAll) {
        const comparePasword = await bcrypt.compare(password, findAll.password);

        if (comparePasword) {
            let Token = jwt.sign(
                { userId: findAll._id },
                process.env.JWT_SCRET,
                { expiresIn: "1h" }
            )

            res.cookie("jwt_token", Token).json({
                "msg": "Your Email & pasword was correnting, Login Successful",
                findAll
            })
        }

        else {
            return res.status(404).json({
                "msg": "Something went wrong and password not matched"
            })
        }
    }

    else {
        return res.status(404).json({
            "msg": "Something went wrong and Email not matched"
        })
    }

}

async function registerAuth(req, res) {
    const { username, email, password, bio, profile_image } = req.body

    // Find name & email exists

    const findName = await userCollections.findOne({ username: username })
    const findMail = await userCollections.findOne({ email: email })
    console.log(findName && findMail);
    if (findName && findMail) {
        res.json({
            "msg": "Data already registed try another..",
            "email": email
        })
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const userCreate = await userCollections.create({
            username, email, password: hashPassword,
            bio, profile_image
        })

        const Token = jwt.sign(
            { userId: userCreate._id },
            process.env.JWT_SCRET,
            { expiresIn: "1h" }
        )
        res.cookie("jwt_token", Token).json({
            "msg": "Successfully account created!",
            userCreate
        })
    }

}


module.exports = {
    loginAuth,
    registerAuth
}