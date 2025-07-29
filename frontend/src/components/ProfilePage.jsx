import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { postData } from "../services/FetchNodeServices";

// You may replace this with an actual update function to call your backend.
const updateProfile = (user) => {
  localStorage.setItem("USER", JSON.stringify(user));
  return true; // Simulate success for now
};

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [userid, setUserid] = useState("");

  // Load the user from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("USER") || "{}");
    setUser(userData);
    setForm(userData); // set form fields
    setUserid(userData._id);
  }, []);

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async() => {
    // You should validate the form and send an API call in a real app!
    setUser(form);
    setEditing(false);
    updateProfile(form);
    var {name, email, password, cpassword } = form;
    console.log("userid is : ", userid);
    
     try {
      var result = await postData("login/update_user_yourself", {
        _id: userid,
        name,
        email,
        password,
        cpassword,
      });
    //   setMsg(result.message);
    //   setOpen(true);
      if (result.status) {
        alert("user upadate successfully");
      }
    } catch (e) {
        alert('failed to update user');
    //   setMsg("Signup failed. Try again.");
    //   setOpen(true);
    }
    
  };

  return (
    <Grid container justifyContent="center" alignItems="start" sx={{ mt: 5 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: "#3f51b5", width: 64, height: 64, mb: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1 }}>
              My Profile
            </Typography>

            <Box width="100%" component="form">
              <TextField
                label="Name"
                name="name"
                value={editing ? form.name : user.name}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editing }}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                value={editing ? form.email : user.email}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editing }}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={editing ? form.password : user.password}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editing }}
                onChange={handleChange}
              />
              <TextField
                label="Confirm Password"
                name="cpassword"
                type="password"
                value={editing ? form.cpassword : user.cpassword}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editing }}
                onChange={handleChange}
              />

              {/* Edit/Save Buttons */}
              {!editing ? (
                <Button variant="contained" fullWidth onClick={handleEdit}>
                  Edit Profile
                </Button>
              ) : (
                <Button variant="contained" color="success" fullWidth onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
