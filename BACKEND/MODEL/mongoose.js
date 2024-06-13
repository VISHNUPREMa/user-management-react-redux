const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/redux-usermanagement';


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection error: ", error);
    }
};

module.exports =  connectDB