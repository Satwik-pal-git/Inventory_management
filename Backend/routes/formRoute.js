const express = require('express');
const router = express.Router();
const multer = require("multer");
const formController = require('../controller/formController');
const path = require('path');

const pathUpload = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${pathUpload}`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const Upload = multer({ storage: storage });

router
    .route('/')
    .get(formController.getDetails)
    .post(Upload.single('img'), formController.setDetail);

module.exports = router;
