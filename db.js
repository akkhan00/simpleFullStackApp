const mongoose = require("mongoose");

const dbUrl = "mongodb://127.0.0.1:27017/simpleapp"; // replace the localhost with 127.0.0.1 because localhost take much time to connect

const connectToDb = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected Successfuly to DB!");
    } catch {
        console.log("Connect To mongo Errrrrrrr");
    }
}

module.exports = connectToDb;