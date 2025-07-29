var express = require("express");
var router = express.Router();
var upload = require("./multer");


var PropertyDetails = require('./model/propertyDetailsModel');

router.get("/property_get_data", async function(req, res, next) {
    res.send("a;sjd;faksd;fajks;dlfj;sd");
})

//fetch_floordetails
router.get("/fetch_all_properties", function (req, res, next) {
   
   PropertyDetails.find({}).then((result)=> {
    res.json({data: result, status: true});
   }).catch((e)=>{
    res.json({result: e});
   })
});

router.post("/propertydetails_submit", upload.any(),  async function (req, res, next) {
  try {
    // return res.status(200).json({status: true, message: "data recieved successfully", data: res.body})
    console.log("propertydetails Data: ", req.body); 
    let floorsDataString = req.body.floorsData;
    let floorsDataInfo = JSON.parse(floorsDataString);
    console.log("floor data : is ", floorsDataInfo);
    
    var body = {...req.body};
    const { ownerName,
      mobileNo,
      email,
      fatherName,
      husbandName,
      houseno,
      propertyAddress,
      buildingId,
      zone,
      ward,
      mohalla,
      oldPid,
      latitude,
      longitude,
      roadType,
      roadWidth,
      ownershipStatus,
      constructionYear,
      plotArea,
      constructionType,
      houseUsage,
      sewerConnection,
      isDisabled,
      floorsData,
      frontView,
      rightView,
      leftView, } = req.body;
    
    var pd = new PropertyDetails({
      ownerName,
      mobileNo,
      email,
      fatherName,
      husbandName,
      houseno,
      propertyAddress,
      buildingId,
      zone,
      ward,
      mohalla,
      oldPid,
      latitude,
      longitude,
      roadType,
      roadWidth,
      ownershipStatus,
      constructionYear,
      plotArea,
      constructionType,
      houseUsage,
      sewerConnection,
      isDisabled,
      floorsData: floorsDataInfo,
      frontView: req.files[0].filename,   //req.files[0].filename
      rightView: req.files[1].filename,   //req.files[1].filename
      leftView: req.files[2].filename,    //req.files[2].filename
    });
    pd.save().then((saveData) => {
        if(pd==saveData){
            console.log("data save successfully");
            return res.status(200).json({status: true, message: "UserData Save Successfully!!"})
        } else {
            console.log("database error");
            return res.status(500).json({status: false, message: "Registration failed"});
        }
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({status: false, message: "Server Error!!!"});
  }
});

// DELETE property: POST propertydetails/delete_property
router.post('/delete_property', async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res.json({ status: false, message: 'Property ID required' });

    const result = await PropertyDetails.findByIdAndDelete(_id);
    if (!result)
      return res.json({ status: false, message: 'Property not found' });

    res.json({ status: true, message: 'Property deleted' });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err.message });
  }
});

// POST /login/update_user
router.post('/update_property', async (req, res) => {
    try {
    const { _id, ownerName, mobileNo, email, zone, ward, mohalla, houseUsage } = req.body;
    if (!_id || !ownerName || !mobileNo || !email || !zone || !ward || !mohalla || !houseUsage )
      return res.json({ status: false, message: 'Required fields missing' });

    const updatedProperty = await PropertyDetails.findByIdAndUpdate(
      _id,
      { ownerName, mobileNo, email, zone, ward, mohalla, houseUsage  },
      { new: true }
    );

    if (!updatedProperty)
      return res.json({ status: false, message: 'User not found' });

    res.json({ status: true, message: 'Property updated', data: updatedProperty });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err.message });
  }
});


module.exports = router;
