import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  // IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PropertyDetails from "./PropertyDetails";
import UsersTable from "./UsersTable";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import SearchProperty from "./SearchProperty";
import { getData } from "../services/FetchNodeServices";
import DashboardHeader from "./DashboardHeader";
import ProfilePage from "./ProfilePage"; // adjust path as needed
import PropertyDetailsTable from "./PropertyDetailsTable";
import DomainIcon from "@mui/icons-material/Domain";
import { useTheme } from "@mui/material/styles";
import DashboardHome from "./DashboardHome";

const SIDEBAR_OPEN_WIDTH = 250; //220
const SIDEBAR_COLLAPSED_WIDTH = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1200,
    background: "#fff", // #800080  #eff1f3ff
    width: SIDEBAR_OPEN_WIDTH,
    height: "100vh",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",

    display: "flex",
    flexDirection: "column",
    transition: "width 0.2s",

  
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: 1,
    whiteSpace: "nowrap",
  },

  main: {
    display: "flex",
    justifyContent: "center",
    marginLeft: SIDEBAR_OPEN_WIDTH,
    minHeight: "100vh",
    transition: "margin-left 0.2s",
    padding: 32,
    overflowY: "auto",
    background: "#fff",

    
  },

}));


const DashboardUser = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true); // SIDEBAR TOGGLE STATE
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("USER") || "{}");
  const navigate = useNavigate();
  const permissionAccess = user.name === "Aman Prajapati"

  // setUsers set function
 // Fetch users on mount
  const fetchAllUsers = async () => {
    try {
      let result = await getData("login/fetch_all_users");
      setUsers(result.data);
    } catch {
      setSnack({ open: true, message: "Could not fetch users." });
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);


  //navItems List
  const navItems = [
    { text: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
    {
      text: "Add Property",
      link: "/dashboard/propertydetails",
      icon: <AddIcon />,
    },
    {
      text: "Search Property",
      link: "/dashboard/searchproperties",
      icon: <SearchIcon />,
    },
    { text: "Logout", link: "", icon: <LogoutIcon /> },
  ];

  // settings
  const settings = [
    "Profile",
    "Logout",
  ];

  // Avator open settings
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Get Properties
  const fetchAllProperties = async () => {
    var result = await getData("propertydetails/fetch_all_properties");
    console.log("properties : ", result.data);

    setProperties(result.data);
    // console.log("in detail variable have data: ", detail);
  };

  useEffect(function () {
    fetchAllProperties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    window.location.href = "/"; // or use useNavigate if you prefer
  };

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  const handleClickTypography = (setting) => {
    switch (setting) {
      case "Profile":
        navigate("/dashboard/profile");
        console.log("we are in Profile Click");
        break;
      case "Logout":
        handleLogout();
        break;
      case "Users":
        navigate("/dashboard/userstable");
        break;
      case "Properties":
        navigate("/dashboard/propertiestable");
        break;
      // Add more cases if you want
      default:
        console.log(`we are in ${setting} Click`);
        break;
    }
  };

  return (
    <div className={classes.root}>
      {/* <DashboardHeader
        user={user}
        onLogout={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
      /> */}

      {/* Side Navbar */}
      <nav
        className={classes.sidebar}
        style={{
          width: sidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_COLLAPSED_WIDTH, // Reduced width when closed
          transition: "width 0.2s",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          px={1}
          mb={1}
        >
          <IconButton
            size="small"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Typography
          style={{
            color: theme.palette.primary.main,
            opacity: sidebarOpen ? 1 : 0,
            transition: "opacity 0.15s",
          }}
          className={classes.sidebarHeader}
        >
          Hi, {user.name}
        </Typography>
        <Divider sx={{ background: "rgba(255, 255, 255, 0.75)" }} />
        <List>
          {navItems
            .filter((i) => i !== "")
            .map((item, idx) => (
              <ListItem
                disablePadding
                style={{ cursor: "pointer" }}
                button
                key={item.text}
                className={classes.listItem}
                selected={idx === 0}
              >
                <ListItemButton
                  sx={{
                    "&.Mui-selected, &.Mui-selected:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      "& svg": { color: "#fff" },
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "#fff",
                      "& svg": { color: "#fff" },
                    },
                  }}
                  onClick={() =>
                    item.text.toLowerCase() === "logout"
                      ? handleLogout()
                      : navigate(item.link)
                  }
                >
                  <ListItemIcon style={{ color: theme.palette.primary.main }}>
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                    <ListItemText
                      style={{ color: "black" }}
                      primary={item.text}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>

      <Box
        sx={{ flexGrow: 0, width: "98%", mt: "15px", justifyContent: "right" }}
      >
        <Typography
          sx={{ display: "flex", justifyContent: "right" }}
          align="right"
          color="textSecondary"
        >
          <Tooltip title={user.name}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.name.charAt(0).toUpperCase()} //"Remy Sharp"
                src="/static/images/avatar/2.jpg"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: theme.palette.primary.main,
                }} // Increase size (default is 40px)
                // sx={{ bgcolor: theme.palette.primary.main }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings
              .filter((s) => s !== "")
              .map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleClickTypography(setting);
                    handleCloseUserMenu(); // also close the menu
                  }}
                >
                  <Typography sx={{ textAlign: "center", cursor: "pointer" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
          </Menu>
        </Typography>
      </Box>

      {/* Main Content */}
      <main
        className={classes.main}
        style={{
          marginLeft: sidebarOpen
            ? SIDEBAR_OPEN_WIDTH
            : SIDEBAR_COLLAPSED_WIDTH,
          // transition: "margin 0.2s",
          padding: theme.spacing(4),
          transition: "margin-left 0.2s",
          overflowY: "auto",
          // paddingLeft: 100
        }}
      >
     
        <Box
          sx={{ flexGrow: 1, maxWidth: 900, justifyContent: "center" }}
          style={{}}
        >
          <Grid container spacing={4} alignItems="center">
            
            <Grid item xs={12} md={8}>
              {/* Add more main content here */}
              <Typography align="center" color="textSecondary">
                {/* Main Dashboard Content */}
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Navigate to="/dashboard/dashboardhome" replace />
                    }
                  />
                  <Route
                    element={<PropertyDetails fetchAllProperties={fetchAllProperties} />}
                    path="/propertydetails"
                  />
                  {/* <Route element={<UsersTable />} path="/userstable" />
                  <Route
                    element={
                      <SearchProperty
                        properties={properties}
                        fetchAllProperties={fetchAllProperties}
                      />
                    }
                    path="/searchproperties"
                  /> */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/dashboardhome" element={<DashboardHome properties={properties} users={users} />} />
                  <Route
                    path="/propertiestable"
                    element={<PropertyDetailsTable data={properties} />}
                  />
                </Routes>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default DashboardUser;
