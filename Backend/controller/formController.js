const { ConnectionStates } = require("mongoose");
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
    if (formData.length === 1) {
        try {
            await Detail.deleteOne({ _id: formData[0] });
            console.log("data deleted successfully");
            res.status(200).json({
                message: "data deleted successfully"
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        const existData = await Detail.findOne({ _id: formData._id });
        if ((formData.itemId !== undefined) || (existData !== null)) {  // here itemId is same as _id in DB
            try {
                var toFind;
                if (formData.itemId !== undefined) {
                    toFind = { _id: formData.itemId };
                } else {
                    toFind = { _id: formData._id };
                }
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
}

