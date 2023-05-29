const Detail = require("../models/Details");
const multer = require("multer");
const fs = require('fs');

exports.getDetails = async (req, res) => {
    try {
        const itemDetails = await Detail.find();
        res.status(200).json(itemDetails);
    } catch (err) {
        console.log(err);
    }
}

exports.setDetail = async (req, res) => {
    const formData = req.body;
    const newData = new Detail({
        ...formData,
        img: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/png'
        },
    });
    newData.save().then(() => {
        console.log('Details saved successfully');
    }).catch(err => {
        console.log("Failed to save the data to the database");
        console.log(err);
    })
    res.status(200).json({
        message: "data received successfully"
    });
}

