const Detail = require("../models/Details");
// const multer = require("multer");
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
    if (formData.itemId !== undefined) {
        try {
            const toFind = { _id: formData.itemId };
            await Detail.updateOne(toFind, formData);
            res.status(200).json({
                message: "data updated successfully"
            });
        } catch (err) {
            console.log("Failed to update the data to the database");
            console.log(err);
        }
    }
    else {
        var newData;
        if (req.file === undefined) {
            newData = new Detail({
                ...formData,
                img: '',
            });
        } else {
            newData = new Detail({
                ...formData,
                img: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/png'
                },
            });
        }
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
}

