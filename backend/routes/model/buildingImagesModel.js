const mongoose = require("mongoose");
var typesSchema = mongoose.Schema({
    frontView: {
        type: String,
        require: true
    },
    rightView: {
        type: String,
        require: true
    },
    leftView: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("buldingimages", typesSchema);