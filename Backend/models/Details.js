const mongoose = require("mongoose");
const detailSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    itemName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Panel', 'Inverter', 'Wire', 'MC4 Converter', 'Other'],
        required: true,
    },
    itemCode: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
    },
    unit: {
        type: String,
        enum: ['FT', 'IN', 'UNT', 'PCS', 'NOS', 'MM', 'CMS', 'MTR'],
        required: true,
    },
    openingStock: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    tax: {
        type: String,
        enum: ['NONE', 'Exempted', 'gst 0', 'gst 0.1', 'gst 0.25', 'gst 3', 'gst 5', 'gst 12'],
        required: true,
    }

});

module.exports = mongoose.model("Detail", detailSchema);