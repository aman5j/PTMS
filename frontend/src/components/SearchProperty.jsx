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
import { useState, useMemo, useEffect } from "react";
import { postData } from "../services/FetchNodeServices";

import {
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PropertyDetailsTable from "./PropertyDetailsTable";
import { PropertyResultsTable } from "./PropertyResultsTable"; // adjust path if needed
import CloseIcon from "@mui/icons-material/Close";
import EditPropertyDialog from "./EditPropertyDialog";
import { zones, zoneWardMapping, wardMohallaMapping } from "../utils/constants";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

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

export default function SearchProperty({
  properties = mockProperties,
  fetchAllProperties,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [snack, setSnack] = useState({ open: false, message: "" });

  const [usageSearch, setUsageSearch] = React.useState({ houseUsage: "" });
  // Results
  const [results, setResults] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);

  // Sorting state
  const [sortField, setSortField] = React.useState("ownerName");
  const [sortDir, setSortDir] = React.useState("asc");

  // Sorted results (now comes AFTER results is declared)
  const sortedResults = React.useMemo(() => {
    let sorted = [...results];
    sorted.sort((a, b) => {
      const aVal = a[sortField] ? a[sortField].toString().toLowerCase() : "";
      const bVal = b[sortField] ? b[sortField].toString().toLowerCase() : "";
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [results, sortField, sortDir]);

  // Edit Task Perform Material
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleSaveEdit = async (updatedRow) => {
    setResults((prev) =>
      prev.map((item) => (item._id === updatedRow._id ? updatedRow : item))
    );

    // if (!editUser.name.trim() || !editUser.email.trim())
    //   return setSnack({ open: true, message: "Name and Email required." });

    // Make API call
    const result = await postData("propertydetails/update_property", {
      _id: updatedRow._id,
      ownerName: updatedRow.ownerName,
      mobileNo: updatedRow.mobileNo,
      email: updatedRow.email,
      zone: updatedRow.zone,
      ward: updatedRow.ward,
      mohalla: updatedRow.mohalla,
      houseUsage: updatedRow.houseUsage,
    });
    if (result.status) {
      // setSnack({ open: true, message: "User updated!" });
      // setEditOpen(false);
      // fetchAllUsers();
      console.log("Property Updated Successfully");
      fetchAllProperties();
    } else {
      // setSnack({ open: true, message: "Failed to update user" });
      console.log("Failed to update Property");
    }

    setEditOpen(false);
  };

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

  const wardOptions = locationSearch.zone
    ? zoneWardMapping[locationSearch.zone] || []
    : [];
  const mohallaOptions = locationSearch.ward
    ? wardMohallaMapping[locationSearch.ward] || []
    : [];

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
      let match = false;
      if (ownerSearch.ownerName)
        match =
          match ||
          trimLower(item.ownerName).includes(trimLower(ownerSearch.ownerName));

      if (ownerSearch.mobileNo)
        match = match || item.mobileNo.includes(ownerSearch.mobileNo);

      if (ownerSearch.email)
        match =
          match || trimLower(item.email).includes(trimLower(ownerSearch.email));
      return match;
    });
    setResults(found);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // const found = properties.filter((item) => {
    //   let match = false;
    //   if (locationSearch.zone)
    //     match = match || item.zone === locationSearch.zone;

    //   if (locationSearch.ward)
    //     match = match || item.ward === locationSearch.ward;

    //   if (locationSearch.mohalla)
    //     match = match || item.mohalla === locationSearch.mohalla;

    //   return match;

    const found = properties.filter((item) => {
      return (
        (!locationSearch.zone || item.zone === locationSearch.zone) &&
        (!locationSearch.ward || item.ward === locationSearch.ward) &&
        (!locationSearch.mohalla || item.mohalla === locationSearch.mohalla)
      );

      // let match = true;
      // if (locationSearch.zone)
      //   match = match && item.zone === locationSearch.zone;
      // // match =
      // //   match &&
      // //   trimLower(item.zone).includes(trimLower(locationSearch.zone));
      // if (locationSearch.ward)
      //   match = match && item.ward === locationSearch.ward;
      // // match =
      // //   match &&
      // //   trimLower(item.ward).includes(trimLower(locationSearch.ward));
      // if (locationSearch.mohalla)
      //   match = match && item.mohalla === locationSearch.mohalla;
      // // match =
      // //   match &&
      // //   trimLower(item.mohalla).includes(trimLower(locationSearch.mohalla));
      // return match;
    });
    setResults(found);

    // setLocationSearch({
    //   ...locationSearch,
    //   zone: "",
    //   ward: "",
    //   mohalla: "",
    // });
  };

  // const handleUsageSearch = (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);

  //   const found = properties.filter((item) => {
  //     return trimLower(item.houseUsage).includes(
  //       trimLower(usageSearch.houseUsage)
  //     );
  //   });
  //   setResults(found);
  // };

  const handleUsageSearch = (e) => {
  e.preventDefault();
  setSubmitted(true);

  const found = properties.filter((item) => {
    let match = false;
    if (usageSearch.houseUsage)
      match = match || 
        trimLower(item.houseUsage).includes(trimLower(usageSearch.houseUsage));
    // Add more fields below if needed for future expansion...

    return match;
  });

  setResults(found);
  setFound(found.length > 0); // Add this if you want to conditionally show message/UI as in previous answers
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
      <Typography variant="h5" gutterBottom align="left">
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
            {/* <Grid item xs={12} sm={4}>
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
            </Grid> */}

            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="zone">Zone</InputLabel>
                <Select
                  size="small"
                  labelId="zone"
                  id="zone"
                  value={locationSearch.zone}
                  label="Zone"
                  onChange={(e) =>
                    setLocationSearch({
                      ...locationSearch,
                      zone: e.target.value,
                      ward: "",
                      mohalla: "",
                    })
                  }
                >
                  {zones.map((z) => (
                    <MenuItem value={z.name} key={z.id}>
                      {z.name.charAt(0).toUpperCase() + z.name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
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
            </Grid> */}

            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="ward">Ward</InputLabel>
                <Select
                  size="small"
                  labelId="ward"
                  id="ward"
                  value={locationSearch.ward}
                  label="Ward"
                  onChange={(e) =>
                    setLocationSearch({
                      ...locationSearch,
                      ward: e.target.value,
                      mohalla: "",
                    })
                  }
                  disabled={!locationSearch.zone}
                >
                  <MenuItem value="">Select...</MenuItem>
                  {wardOptions.map((wardValue) => (
                    <MenuItem key={wardValue.id} value={wardValue.name}>
                      {wardValue.name.charAt(0).toUpperCase() +
                        wardValue.name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
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
            </Grid> */}

            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="mohalla">Mohalla</InputLabel>
                <Select
                  size="small"
                  labelId="mohalla"
                  id="mohalla"
                  value={locationSearch.mohalla}
                  label="mohalla"
                  onChange={(e) =>
                    setLocationSearch({
                      ...locationSearch,
                      mohalla: e.target.value,
                    })
                  }
                  disabled={!locationSearch.ward}
                >
                  {mohallaOptions.map((mohallaValue) => (
                    <MenuItem key={mohallaValue.id} value={mohallaValue.name}>
                      {mohallaValue.name.charAt(0).toUpperCase() +
                        mohallaValue.name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            <Grid item xs={12} sm={8} style={{ width: "30%" }}>
              {/* <TextField
                label="House Usage"
                name="houseUsage"
                size="small"
                fullWidth
                value={usageSearch.houseUsage}
                onChange={(e) =>
                  setUsageSearch({ ...usageSearch, houseUsage: e.target.value })
                }
              /> */}
              <FormControl fullWidth size="small">
                <InputLabel id="houseusage-label">House Usage</InputLabel>
                <Select
                  labelId="houseusage-label"
                  id="houseusage"
                  label="House Usage"
                  value={usageSearch.houseUsage}
                  onChange={(event) =>
                    setUsageSearch({
                      ...usageSearch,
                      houseUsage: event.target.value,
                    })
                  }
                >
                  {/* <MenuItem value="">Select...</MenuItem> */}
                  <MenuItem value="self-owned">Self-Owned</MenuItem>
                  <MenuItem value="rented">Rented</MenuItem>
                  <MenuItem value="mix">Mix</MenuItem>
                </Select>
              </FormControl>
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
          {results.length > 0 && (
            <Box sx={{ overflowX: "auto" }}>
              <Table size="small" stickyHeader>
                {/* <PropertyResultsTable
                  data={results} // or just 'results', if you do not use sorting
                  //   sortField={sortField}
                  //   sortDir={sortDir}
                  //   onSort={handleSort}
                /> */}

                <PropertyResultsTable
                  data={sortedResults} // sortedResults
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={(field) => {
                    if (field === sortField) {
                      setSortDir(sortDir === "asc" ? "desc" : "asc");
                    } else {
                      setSortField(field);
                      setSortDir("asc");
                    }
                  }}
                  onEdit={(row) => {
                    /* open edit modal or navigate */
                    handleEdit(row);
                  }}
                  onDelete={async (row) => {
                    /* show confirm, then delete */
                    if (!window.confirm("Delete this property?")) return;
                    const result = await postData(
                      "propertydetails/delete_property",
                      { _id: row._id }
                    );
                    if (result.status) {
                      setSnack({ open: true, message: "Property deleted!" });
                      // alert("good property id deleted");
                      // Remove deleted property from `results` state immediately:
                      setResults((prevResults) =>
                        prevResults.filter((item) => item._id !== row._id)
                      );
                      fetchAllProperties();
                    } else {
                      setSnack({
                        open: true,
                        message: "Failed to delete Property",
                      });
                      // alert("sorry bro, u done something wrong");
                    }
                  }}
                />

                <EditPropertyDialog
                  open={editOpen}
                  onClose={() => setEditOpen(false)}
                  row={editRow}
                  onSave={handleSaveEdit}
                />

                {/* <TableHead>
                  <TableRow>
                    <TableCell>Owner</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Zone | Ward | Mohalla</TableCell>
                    <TableCell>Usage</TableCell>
                    <TableCell>Ownership</TableCell>
                    <TableCell>Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((item) => (
                    <TableRow key={item._id?.$oid || item._id}>
                      <TableCell>{item.ownerName}</TableCell>
                      <TableCell>{item.mobileNo}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.zone} | {item.ward} | {item.mohalla}</TableCell>
                      <TableCell>{item.houseUsage}</TableCell>
                      <TableCell>{item.ownershipStatus}</TableCell>
                      <TableCell>{item.constructionYear}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          )}
        </Box>
      )}
      {/* FAB (Floating Action Button), changes by tab */}
      {/* {fabs.map((fab, index) => (
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
      ))} */}

      {/* --------- Add your EXTRA CONTENT here --------- */}
      <Box sx={{ mt: 4 }}>
        {/* <Typography variant="h6">Property Statistics</Typography> */}
        {/* Example: Some chart component */}
        {/* <PropertyChart data={results} /> */}
        {/* <Typography variant="body2">Total Owners: {results.length}</Typography> */}
        {/* Insert more charts, tables, summaries, etc, as desired */}

        {/* <PropertyDetailsTable properties={results} /> */}

        <Snackbar
          open={snack.open}
          message={snack.message}
          autoHideDuration={2000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={
            <IconButton
              size="small"
              onClick={() => setSnack({ ...snack, open: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
      {/* ------------------------------------------------ */}

      {/* <PropertyDetailsTable properties={results} /> */}
    </Box>
  );
}
