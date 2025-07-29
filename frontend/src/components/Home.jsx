import * as React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Stack,
} from "@mui/material";

export default function Home() {
  // Example: get user from localStorage (as you did in login)
  const user = JSON.parse(localStorage.getItem("USER") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    window.location.href = "/"; // or use useNavigate if you prefer 
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: 900 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={8} item xs={12} md={7}>
            <img
              src="PTMS.4c26187d35972022d20073001028e5b1.svg"
              style={{ width: "60%", marginBottom: 24 }}
              alt="Property Tax Management System"
            />
            <Typography variant="h4" color="primary" gutterBottom>
              Property Tax Management System
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Gurgaon
            </Typography>
          </Grid>
          <Grid size={4} item xs={12} md={5}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img
                    src="logo1.svg"
                    style={{ height: 60, marginRight: 16 }}
                    alt="Logo 1"
                  />
                  <img src="logo2.png" style={{ height: 60 }} alt="Logo 2" />
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                  Welcome Home!
                </Typography>
                <Box mt={2} mb={2} textAlign="center">
                  <Typography variant="body1" color="text.secondary">
                    You are now logged in.
                  </Typography>
                  {user && user.name && user.email ? (
                    <Box mt={2}>
                      <Typography variant="subtitle1">
                        <strong>Name:</strong> {user.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Email:</strong> {user.email}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="subtitle2" color="error">
                      User info not found.
                    </Typography>
                  )}
                </Box>
                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      mt: 2,
                      py: 1.3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      background:
                        "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(78,84,200,0.10)",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #8f94fb 0%, #4e54c8 100%)",
                      },
                    }}
                    variant="contained"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
