var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var User = require('./model/userModel');
// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;


/* GET home page. */

router.get("/createSchema", function (req, res, next) {
    var U = new User()

    res.send("created");
})

router.get("/fetch_login_data", function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    return res.status(200).json({ data: { name: "aman", surname: "prajapati" } });
  } catch (e) {
    console.log(e);
  }
});

router.get("/fetch_all_users", function (req, res, next) {
   
   User.find({}).then((result)=> {
    res.json({data: result, status: true});
   }).catch((e)=>{
    res.json({result: e});
   })
});



router.post("/signup_submit", async function (req, res, next) {
  try {
    // return res.status(200).json({status: true, message: "data recieved successfully", data: res.body})
    console.log("User Data: ",req.body.name);
    var body = {...req.body};
    // const { name, email, password, cpassword } = req.body;
    // console.log("signup : ", password);
    
    // const hashedpassword = await bcrypt.hash(password, 10);
    var user = new User(body);
    // var user = new User({name, email, password: hashedpassword, cpassword: hashedpassword});
    user.save().then((saveData) => {
        if(user==saveData){
            console.log("data save successfully");
            return res.status(200).json({status: true, message: "UserData Save Successfully!!"})
        } else {
            console.log("database error");
            return res.status(500).json({status: false, message: "Registration failed"});
        }
    })
  } catch (e) {
    console.log(e);
  }
});

// UPDATE user: POST login/update_user
router.post('/update_user', async (req, res) => {
  try {
    const { _id, name, email } = req.body;
    if (!_id || !name || !email)
      return res.json({ status: false, message: 'Required fields missing' });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true }
    );

    if (!updatedUser)
      return res.json({ status: false, message: 'User not found' });

    res.json({ status: true, message: 'User updated', data: updatedUser });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err.message });
  }
});

// Update user : yourself update 
// POST /login/update_user
router.post('/update_user_yourself', async (req, res) => {
    try {
    const { _id, name, email, password, cpassword } = req.body;
    if (!_id || !name || !email || !password || !cpassword)
      return res.json({ status: false, message: 'Required fields missing' });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email, password, cpassword },
      { new: true }
    );

    if (!updatedUser)
      return res.json({ status: false, message: 'User not found' });

    res.json({ status: true, message: 'User updated', data: updatedUser });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err.message });
  }
});


// DELETE user: POST login/delete_user
router.post('/delete_user', async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res.json({ status: false, message: 'User ID required' });

    const result = await User.findByIdAndDelete(_id);
    if (!result)
      return res.json({ status: false, message: 'User not found' });

    res.json({ status: true, message: 'User deleted' });
  } catch (err) {
    res.json({ status: false, message: 'Something went wrong', error: err.message });
  }
});


router.post("/check_user_login", function(req, res, next) {
    try {
        console.log("login data : ", req.body);
        const {email, password} = req.body;
        console.log("check_user_login: ", email, password);
        User.find({"email": req.body.email, "password": req.body.password})
        .then((result) => {
            console.log("result length : ", result.length);
            if(result.length == 1) {
                var token = jwt.sign({data: result[0]}, JWT_SECRET, { expiresIn: '1h',})
                console.log("token ", token);
                res.status(200).json({status: true, data: result[0], message: "User Login successfully", token});
            } else {
                res.json({status: false, data: [], message: "Invalid email/password!!!"});
            }
        })
        

        // User.find({"email": req.body.email, "password": req.body.password})
        // .then((result) => {
        //     console.log("result length : ", result.length);
        //     if(result.length == 1) {
        //         var token = jwt.sign({data: result[0]}, 'shhhhhh')
        //         console.log("token ", token);
        //         res.status(200).json({status: true, data: result[0], message: "User Login successfully", token});
        //     } else {
        //         res.json({status: false, data: [], message: "Invalid email/password!!!"});
        //     }
        // })

    }
    catch(e) {
        console.log("Failed to login!!! ", e);
    }
})

// Authentication Middleware
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401); // No token

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Invalid token
//         req.user = user;
//         next();
//     });
// }

// Protected Route
// router.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'Welcome to the protected route!', user: req.user });
// });

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect Bearer <token>

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Attach user payload to request
    next();
  });
}

// Protected Route
router.get('/protected', authenticateToken, (req, res) => {
   return res.json({ message: 'Welcome to the protected route!', user: req.user });
});

// Protected Route
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: `Hello, ${req.user}! This is protected data.` });
// });

module.exports = router;
