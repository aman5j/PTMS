const mongoose = require("mongoose");
var typesSchema = mongoose.Schema({
  ownerName: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  fatherName: {
    type: String,
    require: true,
  },
  husbandName: {
    type: String,
    require: true,
  },
  houseno: {
    type: String,
    require: true,
  },
  propertyAddress: {
    type: String,
    require: true,
  },
  zone: {
    type: String,
    require: true,
  },
  ward: {
    type: String,
    require: true,
  },
  mohalla: {
    type: String,
    require: true,
  },
  buildingId: {
    type: String,
    require: true,
  },
  oldPid: {
    type: String,
    require: true,
  },
  latitude: {
    type: String,
    require: true,
  },
  longitude: {
    type: String,
    require: true,
  },
  roadType: {
    type: String,
    require: true,
  },
  roadWidth: {
    type: String,
    require: true,
  },
  ownershipStatus: {
    type: String,
    require: true,
  },
  constructionYear: {
    type: String,
    require: true,
  },
  plotArea: {
    type: String,
    require: true,
  },
  constructionType: {
    type: String,
    require: true,
  },
  houseUsage: {
    type: String,
    require: true,
  },
  sewerConnection: {
    type: Boolean,
    require: true,
  },
  isDisabled: {
    type: Boolean,
    require: true,
  },
  floorsData: {
    type: Array,
    require: true,
  },
  frontView: {
    type: String,
    require: true,
  },
  rightView: {
    type: String,
    require: true,
  },
  leftView: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("propertydetails", typesSchema);
