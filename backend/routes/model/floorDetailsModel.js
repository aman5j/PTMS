const mongoose = require("mongoose");
var typesSchema = mongoose.Schema({
  floorNo: {
    type: String,
    require: true,
  },
  floorUsage: {
    type: String,
    require: true,
  },
  floorRentType: {
    type: String,
    require: true,
  },
  floorConstructionType: {
    type: String,
    require: true,
  },
  floorArea: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("floordetails", typesSchema);
