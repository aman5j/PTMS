import React from "react";
import { useState } from "react";
import { postData } from "../services/FetchNodeServices";
import {
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  root: {
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: "auto",
    background: "#fff",
    padding: 12,
    borderRadius: 10,
  },
});

export default function FloorWiseDetails({
  floorsData,
  setFloorsData,
  // floorNo, setFloorNo,
  // floorUsage, setFloorUsage,
  // floorRentType, setFloorRentType,
  // floorConstructionType, setFloorConstructionType,
  // floorArea, setFloorArea
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [floorNo, setFloorNo] = useState("");
  const [floorUsage, setFloorUsage] = useState("");
  const [floorRentType, setFloorRentType] = useState("");
  const [floorConstructionType, setFloorConstructionType] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [msg, setMsg] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // To add a new floor's data without erasing the existing floors:
    setFloorsData((prev) => [
      ...prev,
      { floorNo, floorUsage, floorRentType, floorConstructionType, floorArea },
    ]);

    setFloorNo("");
    setFloorUsage("");
    setFloorRentType("");
    setFloorConstructionType("");
    setFloorArea("");

    setMsg("floor added successfully");
    setToastOpen(true);

    console.log(
      `Floor Data : FloorNo = ${floorNo}, Floor Usage = ${floorUsage}, floorRentType = ${floorRentType}, floorConstruction = ${floorConstructionType}, floorArea = ${floorArea}`
    );

    setOpen(false);
    // try {
    //   var result = await postData("floordetails/floordetails_submit", {
    //     floorNo,
    //     floorUsage,
    //     floorRentType,
    //     floorConstructionType,
    //     floorArea,
    //   });
    //   console.log("floor submit:", result);
    //   setMsg(result.message);
    //   setToastOpen(true);
    //   //   if (result.status) {
    //   //     setTimeout(() => {
    //   //       navigate("/");
    //   //     }, 1500);
    //   //   }
    // } catch (e) {
    //   setMsg(result.message);
    //   setToastOpen(true);
    //   console.log("error: ", e);
    // }
  };

  const showData = () => {
    return (
      //   <div className={classes.root}>
      //     <div className={classes.box}>
      <form onSubmit={()=> console.log("Good")} noValidate>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography align="left" color="textSecondary">
              <strong>Floor Details</strong>
            </Typography>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="floorno">Floor No</InputLabel>
              <Select
                size="small"
                labelId="floorno"
                id="floorno"
                label="Floor No"
                value={floorNo}
                onChange={(event) => setFloorNo(event.target.value)}
              >
                <MenuItem value="1-floor">1 Floor</MenuItem>
                <MenuItem value="2-floor">2 Floor</MenuItem>
                <MenuItem value="3-floor">3 Floor</MenuItem>
                <MenuItem value="4-floor">4 Floor</MenuItem>
                <MenuItem value="5-floor">5 Floor</MenuItem>
                <MenuItem value="6-floor">6 Floor</MenuItem>
                <MenuItem value="7-floor">7 Floor</MenuItem>
                <MenuItem value="8-floor">8 Floor</MenuItem>
                <MenuItem value="9-floor">9 Floor</MenuItem>
                <MenuItem value="10-floor">10 Floor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="floorusage">Floor Usage</InputLabel>
              <Select
                size="small"
                labelId="floorusage"
                id="floorusage"
                value={floorUsage}
                label="Floor Usage"
                onChange={(event) => setFloorUsage(event.target.value)}
              >
                <MenuItem value="Residensial">Residensial</MenuItem>
                <MenuItem value="Non-Residensial">Non-Residensial</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="floorrenttype">Floor Rent Type</InputLabel>
              <Select
                size="small"
                labelId="floorrenttype"
                id="floorrenttype"
                value={floorRentType}
                label="Floor Rent Type"
                onChange={(event) => setFloorRentType(event.target.value)}
              >
                <MenuItem value="Self">Self</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="floorconstructiontype">
                Floor Construction Type
              </InputLabel>
              <Select
                size="small"
                labelId="floorconstructiontype"
                id="floorconstructiontype"
                value={floorConstructionType}
                label="Floor Construction Type"
                onChange={(event) =>
                  setFloorConstructionType(event.target.value)
                }
              >
                <MenuItem value="RCC/RBC">RCC/RBC</MenuItem>
                <MenuItem value="Asbestos or Corrugated">Asbestos or Corrugated</MenuItem>
                <MenuItem value="Kachha">Kachha</MenuItem>
                <MenuItem value="Vacant Land/Demolished">Vacant Land/Demolished</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              margin="normal"
              id="floorarea"
              label="Floor Area"
              variant="outlined"
              size="small"
              value={floorArea}
              onChange={(event) => setFloorArea(event.target.value)}
            />
          </Grid>
        </Grid>
      </form>
      //     </div>
      //   </div>
    );
  };

  // maxWidth={"md"}
  const showDataForDialog = () => {
    return (
      <div>
        <Dialog fullWidth maxWidth={"md"} open={open}>
          <DialogContent>{showData()}</DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
            <Button onClick={handleSubmit}>Add</Button>
            <Snackbar
              open={toastOpen}
              autoHideDuration={4000}
              onClose={handleClose}
              message={msg}
              action={action}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      <Grid size={12}>
        {/* Add more main content here */}
        <Typography align="center" color="textSecondary">
          <strong>Floor Wise Details</strong>
        </Typography>
      </Grid>

      <Grid size={3} style={{ paddingBottom: "20px" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          <AddIcon /> Add Floor
        </Button>
      </Grid>

      <Grid size={12}>{showDataForDialog()}</Grid>
    </>
  );
}
