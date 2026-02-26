const mongoose = require("mongoose");
const imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKey = new imagekit.ImageKit({
    privateKey: process.env.IMAGEKIY
})

async function postCreate(req, res) {
    // console.log(req.body, req.file)


    // ✅ Correct Version

//     const imageOutput = await imageKey.files.upload({
//     file: await toFile(req.file.buffer, req.file.originalname),
//     fileName: req.file.originalname
//      });

    const imageOutput = await imageKey.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test"
    })

    res.send(imageOutput)
    console.log(" >>>>>>>>>>>>>>>>>>>>>>> ", imageOutput)

}

module.exports = { postCreate }

// if function exports then pass inside =>> {} else direct varName pass