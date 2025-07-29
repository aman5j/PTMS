var express = require("express");
var router = express.Router();

var FloorDetails = require('./model/floorDetailsModel');

router.get("/floor_get_data", async function(req, res, next) {
    res.send("a;sjd;faksd;fajks;dlfj;sd");
})

//fetch_floordetails
router.get("/fetch_floordetails", function (req, res, next) {
   
   FloorDetails.find({}).then((result)=> {
    res.json({data: result, status: true});
   }).catch((e)=>{
    res.json({result: e});
   })
});

router.post("/floordetails_submit", async function (req, res, next) {
  try {
    // return res.status(200).json({status: true, message: "data recieved successfully", data: res.body})
    console.log("floordetails Data: ",req.body);
    var body = {...req.body};
    // const { name, email, password, cpassword } = req.body;
    
    var fd = new FloorDetails(body);
    fd.save().then((saveData) => {
        if(fd==saveData){
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

module.exports = router;
