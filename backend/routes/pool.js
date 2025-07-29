const mongoose = require("mongoose");
require('dotenv').config();

const mongodb_Path = 'mongodb://localhost:27017/logindetails?retryWrites=true&w=majority';
const dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);

var pool = () => {
    mongoose.Promise = global.Promise;
    var options={}

    mongoose.connect(dbUrl,
        options
    );

     mongoose.connection
    .once("open", () => console.log("MongoDb running") )
    .on("error", (err) => console.log(err))
}

module.exports=pool