import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

export default function OwnerDetails({
  ownerName,
  setOwnerName,
  mobileNo,
  setMobileno,
  email,
  setEmail,
  fatherName,
  setFatherName,
  husbandName,
  setHusbandName,
  houseno,
  setHouseno,
  propertyAddress,
  setPropertyAddress,
}) {
  return (
    <>
      <Grid size={12}>
        {/* Add more main content here */}
        <Typography align="center" color="textSecondary">
          <strong>Owner Details</strong>
        </Typography>
      </Grid>

      <Grid size={4} item xs={4}>
        <TextField
          fullWidth
          margin="normal"
          id="ownername"
          label="Owner Name"
          variant="outlined"
          size="small"
          value={ownerName}
          onChange={(event) => setOwnerName(event.target.value)}
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
      </Grid>

      <Grid size={4} item xs={4}>
        <TextField
          fullWidth
          margin="normal"
          id="mobileno"
          label="Mobile Number"
          variant="outlined"
          size="small"
          value={mobileNo}
          onChange={(event) => setMobileno(event.target.value)}
        />
      </Grid>

      <Grid size={4} item xs={4}>
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid>

      <Grid size={3} item xs={3}>
        <TextField
          fullWidth
          margin="normal"
          id="fathername"
          label="Father Name"
          variant="outlined"
          size="small"
          value={fatherName}
          disabled={husbandName.length > 0}
          onChange={(event) => setFatherName(event.target.value)}
        />
      </Grid>

      <Grid size={3} item xs={3}>
        <TextField
          fullWidth
          margin="normal"
          id="husband"
          label="Husband Name"
          variant="outlined"
          size="small"
          value={husbandName}
          disabled={fatherName.length > 0}
          onChange={(event) => setHusbandName(event.target.value)}
        />
      </Grid>

      <Grid size={3} item xs={3}>
        <TextField
          fullWidth
          margin="normal"
          id="houseno"
          label="House Number"
          variant="outlined"
          size="small"
          value={houseno}
          onChange={(event) => setHouseno(event.target.value)}
        />
      </Grid>

      <Grid size={3} item xs={3}>
        <TextField
          fullWidth
          margin="normal"
          id="propertyaddress"
          label="Property Address"
          variant="outlined"
          size="small"
          value={propertyAddress}
          onChange={(event) => setPropertyAddress(event.target.value)}
        />
      </Grid>
    </>
  );
}
