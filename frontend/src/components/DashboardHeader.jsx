import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const DashboardHeader = ({ user, onLogout, onSidebarToggle, sidebarOpen }) => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "#fff",
        color: "#333",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          MyApp Dashboard
        </Typography>

        {/* User Info and Logout */}
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "#3f51b5", width: 32, height: 32, mr: 1 }}>
            {user?.name?.[0] || "U"}
          </Avatar>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.name || "User"}
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
