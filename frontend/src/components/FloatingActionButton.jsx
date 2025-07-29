import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

// Mock data (you'll pass as prop or fetch from API)
const mockProperties = [
  {
    _id: { $oid: "6879132d46a9428d6b2337a8" },
    ownerName: "santosh",
    mobileNo: "9098763467",
    email: "spr34@gmail.com",
    fatherName: "nepal singh",
    husbandName: "none",
    houseno: "980b",
    propertyAddress: "dabua, faridhabad",
    zone: "zone2",
    ward: "ward4",
    mohalla: "mohalla11",
    buildingId: "893409",
    oldPid: "878912",
    latitude: "102.34",
    longitude: "105.98",
    roadType: "major",
    roadWidth: "7",
    ownershipStatus: "self-owned",
    constructionYear: "2021",
    houseUsage: "rented",
    sewerConnection: true,
    isDisabled: false,
    frontView: "517471f7-1f1d-4a2d-938c-47df9804fa19.PNG",
    rightView: "37b884d3-8d66-43af-a071-9735a8b73153.PNG",
    leftView: "ee203077-a8b0-45af-a042-e6588b76f65c.PNG",
    __v: 0,
  },
  // More items here...
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function trimLower(str) {
  return str?.toString().toLowerCase().trim();
}

export default function FloatingActionButton({ properties = mockProperties }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // Search states for each tab
  const [ownerSearch, setOwnerSearch] = React.useState({
    ownerName: "",
    mobileNo: "",
    email: "",
  });
  const [locationSearch, setLocationSearch] = React.useState({
    zone: "",
    ward: "",
    mohalla: "",
  });
  const [usageSearch, setUsageSearch] = React.useState({ houseUsage: "" });
  // Results
  const [results, setResults] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);

  // Tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setResults([]);
    setSubmitted(false);
  };

  // Search handlers
  const handleOwnerSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const found = properties.filter((item) => {
      let match = true;
      if (ownerSearch.ownerName)
        match =
          match &&
          trimLower(item.ownerName).includes(trimLower(ownerSearch.ownerName));
      if (ownerSearch.mobileNo)
        match = match && item.mobileNo.includes(ownerSearch.mobileNo);
      if (ownerSearch.email)
        match =
          match && trimLower(item.email).includes(trimLower(ownerSearch.email));
      return match;
    });
    setResults(found);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const found = properties.filter((item) => {
      let match = true;
      if (locationSearch.zone)
        match =
          match &&
          trimLower(item.zone).includes(trimLower(locationSearch.zone));
      if (locationSearch.ward)
        match =
          match &&
          trimLower(item.ward).includes(trimLower(locationSearch.ward));
      if (locationSearch.mohalla)
        match =
          match &&
          trimLower(item.mohalla).includes(trimLower(locationSearch.mohalla));
      return match;
    });
    setResults(found);
  };

  const handleUsageSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const found = properties.filter((item) => {
      return trimLower(item.houseUsage).includes(
        trimLower(usageSearch.houseUsage)
      );
    });
    setResults(found);
  };

  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 900,
        position: "relative",
        minHeight: 200,
        mx: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Search Property
      </Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="By Owner Details" {...a11yProps(0)} />
          <Tab label="By Zone/Ward/Mohalla" {...a11yProps(1)} />
          <Tab label="House Usage" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Box component="form" onSubmit={handleOwnerSearch} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Owner Name"
                name="ownerName"
                size="small"
                fullWidth
                value={ownerSearch.ownerName}
                onChange={(e) =>
                  setOwnerSearch({ ...ownerSearch, ownerName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mobile No"
                name="mobileNo"
                size="small"
                fullWidth
                value={ownerSearch.mobileNo}
                onChange={(e) =>
                  setOwnerSearch({ ...ownerSearch, mobileNo: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                name="email"
                size="small"
                fullWidth
                value={ownerSearch.email}
                onChange={(e) =>
                  setOwnerSearch({ ...ownerSearch, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box component="form" onSubmit={handleLocationSearch} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Zone"
                name="zone"
                size="small"
                fullWidth
                value={locationSearch.zone}
                onChange={(e) =>
                  setLocationSearch({ ...locationSearch, zone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Ward"
                name="ward"
                size="small"
                fullWidth
                value={locationSearch.ward}
                onChange={(e) =>
                  setLocationSearch({ ...locationSearch, ward: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Mohalla"
                name="mohalla"
                size="small"
                fullWidth
                value={locationSearch.mohalla}
                onChange={(e) =>
                  setLocationSearch({
                    ...locationSearch,
                    mohalla: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Box component="form" onSubmit={handleUsageSearch} sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                label="House Usage"
                name="houseUsage"
                size="small"
                fullWidth
                value={usageSearch.houseUsage}
                onChange={(e) =>
                  setUsageSearch({ ...usageSearch, houseUsage: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      {/* Results */}
      {submitted && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {results.length === 0
              ? "No properties found."
              : `Found ${results.length} propert${
                  results.length === 1 ? "y" : "ies"
                }`}
          </Typography>
          {results.map((item) => (
            <Card
              key={item._id?.$oid || item._id}
              sx={{ mb: 2 }}
              variant="outlined"
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography>
                      <strong>Owner:</strong> {item.ownerName}
                    </Typography>
                    <Typography>
                      <strong>Mobile:</strong> {item.mobileNo}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {item.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography>
                      <strong>Father's Name:</strong> {item.fatherName}
                    </Typography>
                    <Typography>
                      <strong>Husband's Name:</strong> {item.husbandName}
                    </Typography>
                    <Typography>
                      <strong>House No:</strong> {item.houseno}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography>
                      <strong>Address:</strong> {item.propertyAddress}
                    </Typography>
                    <Typography>
                      <strong>Zone:</strong> {item.zone}
                    </Typography>
                    <Typography>
                      <strong>Ward:</strong> {item.ward}
                    </Typography>
                    <Typography>
                      <strong>Building ID:</strong> {item.buildingId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography>
                      <strong>PID:</strong> {item.oldPid}
                    </Typography>
                    <Typography>
                      <strong>Usage:</strong> {item.houseUsage}
                    </Typography>
                    <Typography>
                      <strong>Ownership:</strong> {item.ownershipStatus}
                    </Typography>
                    <Typography>
                      <strong>Year:</strong> {item.constructionYear}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* FAB (Floating Action Button), changes by tab */}
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
          style={{
            transitionDelay: `${
              value === index ? theme.transitions.duration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
