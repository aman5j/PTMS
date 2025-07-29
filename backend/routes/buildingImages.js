var express = require("express");
var router = express.Router();
var upload = require("./multer");

var BuildingImages = require('./model/buildingImagesModel');

router.get("/building_get_data", async function(req, res, next) {
    res.send("a;sjd;faksd;fajks;dlfj;sd");
})

//fetch_floordetails
router.get("/fetch_buildingimages", function (req, res, next) {
   
   BuildingImages.find({}).then((result)=> {
    res.json({data: result, status: true});
   }).catch((e)=>{
    res.json({result: e});
   })
});

router.post("/buildingimages_submit", upload.any(), async function (req, res, next) {
  try {
    // return res.status(200).json({status: true, message: "data recieved successfully", data: res.body})
    console.log("buildingimage Data: ",req.body);
    var body = {...req.body};
    // const { name, email, password, cpassword } = req.body;
    
    var bi = new BuildingImages({
        frontView: req.files[0].filename,
        rightView: req.files[1].filename,  // req.files[0].filename
        leftView: req.files[2].filename,   // req.files[0].filename
    });
    bi.save().then((saveData) => {
        if(bi==saveData){
            console.log("Building Images save successfully");
            return res.status(200).json({status: true, message: "BuildingImages Save Successfully!!"})
        } else {
            console.log("database error");
            return res.status(500).json({status: false, message: "BuildingImages failed to Save"});
        }
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({status: false, message: "Server Error!!!"});
  }
});


module.exports = router;
