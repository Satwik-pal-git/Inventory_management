const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongo DB Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;