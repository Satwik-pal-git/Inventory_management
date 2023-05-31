const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const detailRoute = require("./routes/formRoute");

app.use(cors());

dotenv.config();

connectDB();

app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.static(path.join(__dirname, './public')));
app.use("/", detailRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`));