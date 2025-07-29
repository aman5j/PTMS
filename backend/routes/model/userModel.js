const mongoose = require("mongoose");
var typesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("users", typesSchema);