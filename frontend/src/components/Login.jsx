import * as React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getData, postData } from "../services/FetchNodeServices";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
// import InputProps from '@mui/icons-material/InputProps';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // const fetchLoginData = async () => {
  //   var result = await getData("login/fetch_login_data");

  //   console.log(result.data);
  // };

  // useEffect(function () {
  //   fetchLoginData();
  // }, []);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    navigate("/signup");
  };

  //   const handleGoToLogin = () => {
  //     navigate("/"); // or "/login" if your login route is different
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", { email, password });
    // Handle form submission logic here
    var body = { email, password };
    try {
      var result = await postData("login/check_user_login", body);
      console.log("status: ", result.status);
      if (result.status == true) {
        console.log(result.message);
        // console.log("token in check login ", result.token);
        setMsg(result.message);
        handleClick();
        localStorage.setItem("USER", JSON.stringify(result.data));
        localStorage.setItem("TOKEN", result.token);
        // navigate("/home");
        navigate("/dashboard");
      } else {
        console.log(result.message);
        setMsg(result.message);
        handleClick();
      }
    } catch (e) {
      console.log(e);
      setMsg(result.message);
      handleClick();
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    // ...inside your Home component's return:
    <div
      style={{
        minHeight: "100vh", //100vh
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: 900 }}>
        {/* <Box
  sx={{
    minHeight: "100vh",
    height: "100vh",
    width: "100vw",
    m: 0,
    p: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f6fa 0%, #e3e6f3 100%)",
    overflow: "hidden",
  }}
> */}
        <Grid container spacing={4} alignItems="center">
          <Grid size={6} item xs={12} md={7}>
            <img
              src="PTMS.4c26187d35972022d20073001028e5b1.svg"
              style={{ width: "60%", marginBottom: 24 }}
            />
            <Typography variant="h4" color="#800080" gutterBottom>
              Property Tax Management System
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Gurgaon
            </Typography>
          </Grid>
          <Grid size={6} item xs={12} md={5}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img
                    src="logo1.svg"
                    style={{ height: 60, marginRight: 16 }}
                  />
                  <img src="logo2.png" style={{ height: 60 }} />
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#800080",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#800080",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#800080",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#800080",
                      },
                    }}
                    id="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    {/* <Button
                      color="success"
                      fullWidth
                      sx={{ borderRadius: 3 }}
                      onClick={handleSignUp}
                      variant="contained"
                    >
                      Signup
                    </Button> */}
                    <Button
                      fullWidth
                      sx={{
                        borderRadius: 3,
                        mt: 2,
                        py: 1.3,
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        background:
                          "linear-gradient(90deg, #800080 0%, #a020f0 100%)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(128, 0, 128, 0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #a020f0 0%, #800080 100%)",
                        },
                      }}
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={msg}
                      action={action}
                    />
                  </Stack>

                  <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                      Don't have an account?{" "}
                      <Button
                        variant="text"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          padding: 0,
                          minWidth: 0,
                          color: "#800080",
                        }}
                        onClick={handleSignUp}
                      >
                        Sign up
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
