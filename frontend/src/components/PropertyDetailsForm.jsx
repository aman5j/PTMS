// src/components/PropertyDetailsForm.jsx

import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { zones, zoneWardMapping, wardMohallaMapping } from "../utils/constants";

export default function PropertyDetailsForm({
  zone,
  ward,
  mohalla,
  handleZone,
  handleWard,
  handleMohalla,
  // wardOptions,
  // mohallaOptions,
  buildingId,
  setBuildingId,
  oldPid,
  setOldPid,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  roadType,
  setRoadType,
  roadWidth,
  setRoadWidth,
  ownershipStatus,
  setOwnershipStatus,
  constructionYear,
  setConstructionYear,
  plotArea,
  setPlotArea,
  constructionType,
  setConstructionType,
  houseUsage,
  setHouseUsage,
  sewerConnection,
  setSewerConnection,
  isDisabled,
  setIsDisabled,
}) {

  // Compute wardOptions based on selected zone
  const wardOptions = zone ? zoneWardMapping[zone] || [] : [];
  const mohallaOptions = ward ? wardMohallaMapping[ward] || [] : [];

  return (
    <>
      <Grid size={12}>
        {/* Add more main content here */}
        <Typography align="center" color="textSecondary">
          <strong>Property Details</strong>
        </Typography>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="zone">Zone</InputLabel>
          <Select
            size="small"
            labelId="zone"
            id="zone"
            value={zone}
            label="Zone"
            onChange={handleZone}
          >
            {zones.map((z) => (
            <MenuItem value={z.name} key={z.id}>
              {z.name.charAt(0).toUpperCase() + z.name.slice(1)}
            </MenuItem>
            ))}
            {/* <MenuItem value="zone2">Zone2</MenuItem>
            <MenuItem value="zone3">Zone3</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="ward">Ward</InputLabel>
          <Select
            size="small"
            labelId="ward"
            id="ward"
            value={ward}
            label="Ward"
            onChange={handleWard}
            disabled={!zone}
          >
            {/* {wardOptions.map((wardValue) => (
              <MenuItem key={wardValue.id} value={wardValue.name}>
                {wardValue.name.charAt(0).toUpperCase() + wardValue.name.slice(1)}
              </MenuItem>
            ))} */}

            {wardOptions.map((wardValue) => (
              <MenuItem key={wardValue.id} value={wardValue.name}>
                {wardValue.name.charAt(0).toUpperCase() + wardValue.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="mohalla">Mohalla</InputLabel>
          <Select
            size="small"
            labelId="mohalla"
            id="mohalla"
            value={mohalla}
            label="mohalla"
            onChange={handleMohalla}
            disabled={!ward}
          >
            {mohallaOptions.map((mohallaValue) => (
              <MenuItem key={mohallaValue.id} value={mohallaValue.name}>
                {mohallaValue.name.charAt(0).toUpperCase() + mohallaValue.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <TextField
          fullWidth
          margin="normal"
          id="buildingid"
          label="Building Id"
          variant="outlined"
          size="small"
          value={buildingId}
          onChange={(event) => setBuildingId(event.target.value)}
        />
      </Grid>

      <Grid size={3}>
        <TextField
          fullWidth
          margin="normal"
          id="oldpid"
          label="Old PID"
          variant="outlined"
          size="small"
          value={oldPid}
          onChange={(event) => setOldPid(event.target.value)}
        />
      </Grid>

      <Grid size={3}>
        <TextField
          fullWidth
          margin="normal"
          id="latitude"
          label="Latitude"
          variant="outlined"
          size="small"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
      </Grid>

      <Grid size={3}>
        <TextField
          fullWidth
          margin="normal"
          id="longitude"
          label="Longitude"
          variant="outlined"
          size="small"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
        />
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="roadtype">Road Type</InputLabel>
          <Select
            size="small"
            labelId="roadtype"
            id="roadtype"
            label="Road Type"
            value={roadType}
            onChange={(event) => setRoadType(event.target.value)}
          >
            <MenuItem value="minor">Minor</MenuItem>
            <MenuItem value="major">Major</MenuItem>
            <MenuItem value="other">other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="roadtype">Road Width</InputLabel>
          <Select
            size="small"
            labelId="roadwidth"
            id="roadwidth"
            label="Road Width"
            value={roadWidth}
            onChange={(event) => setRoadWidth(event.target.value)}
          >
            <MenuItem value="1">1cm</MenuItem>
            <MenuItem value="2">2cm</MenuItem>
            <MenuItem value="3">3cm</MenuItem>
            <MenuItem value="4">4cm</MenuItem>
            <MenuItem value="5">5cm</MenuItem>
            <MenuItem value="6">6cm</MenuItem>
            <MenuItem value="7">7cm</MenuItem>
            <MenuItem value="8">8cm</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="roadtype">Ownership Status</InputLabel>
          <Select
            size="small"
            labelId="ownershipstatus"
            id="ownershipstatus"
            label="Ownership Status"
            value={ownershipStatus}
            onChange={(event) => setOwnershipStatus(event.target.value)}
          >
            <MenuItem value="self-owned">Self Owned</MenuItem>
            <MenuItem value="rented">Rented</MenuItem>
            <MenuItem value="mix">Mix</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Construction Year"
              openTo="year"
              views={["year"]}
              value={
                constructionYear ? dayjs(`${constructionYear}-01-01`) : null
              }
              onChange={(newValue) => {
                if (newValue) {
                  setConstructionYear(dayjs(newValue).year()); // store year only as number
                } else {
                  setConstructionYear(null);
                }
              }}
              slotProps={{
                textField: { size: "small", fullWidth: true },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      <Grid size={3}>
        <TextField
          fullWidth
          margin="normal"
          id="plotarea"
          label="Plot Area"
          variant="outlined"
          size="small"
          value={plotArea}
          onChange={(event) => setPlotArea(event.target.value)}
        />
      </Grid>

      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="constructiontype">Construction Type</InputLabel>
          <Select
            size="small"
            labelId="constructiontype"
            id="constructiontype"
            label="Construction Type"
            value={constructionType}
            onChange={(event) => setConstructionType(event.target.value)}
          >
            <MenuItem value="Kaccha">Kaccha</MenuItem>
            <MenuItem value="Pakka">Pakka</MenuItem>
            <MenuItem value="other">other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="houseusage">House Usage</InputLabel>
          <Select
            size="small"
            labelId="houseusage"
            id="houseusage"
            label="House Usage"
            value={houseUsage}
            onChange={(event) => setHouseUsage(event.target.value)}
          >
            <MenuItem value="self-owned">Self-Owned</MenuItem>
            <MenuItem value="rented">Rented</MenuItem>
            <MenuItem value="mix">Mix</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={12}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox   onChange={(event) => setSewerConnection(event.target.checked)} />}
            label="Sewer Connection"
            checked={sewerConnection}
          />
          <FormControlLabel
            control={<Checkbox  onChange={(event) => setIsDisabled(event.target.checked)}  />}
            label="Is Disabled"
            checked={isDisabled}
          />
          {/* <FormControlLabel required control={<Checkbox />} label="Required" />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
        </FormGroup>
      </Grid>
    </>
  );
}
