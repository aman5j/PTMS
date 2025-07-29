import React from "react";
import { Grid, TextField, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { postData } from "../services/FetchNodeServices";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BuildingImages({
  frontView,
  setFrontView,
  rightView,
  setRightView,
  leftView,
  setLeftView,
}) {
  //   const [frontView, setFrontView] = useState({ url: "", bytes: "" });
  //   const [rightView, setRightView] = useState({ url: "", bytes: "" });
  //   const [leftView, setLeftView] = useState({ url: "", bytes: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("frontView", frontView.bytes);
    formData.append("rightView", rightView.bytes);
    formData.append("leftView", leftView.bytes);

    console.log(`Building Images : frontView = ${formData}`);
    try {
      var result = await postData(
        "buildingimages/buildingimages_submit",
        formData
      );
      if (result.status) {
        console.log("images save successfully in database");
      } else {
        console.log("failed!!, to save images in database");
      }
      //   floorNo,
      //   floorUsage,
      //   floorRentType,
      //   floorConstructionType,
      //   floorArea,
      // });
      // console.log("floor submit:", result);
      // setMsg(result.message);
      // setToastOpen(true);
      //   if (result.status) {
      //     setTimeout(() => {
      //       navigate("/");
      //     }, 1500);
      //   }
    } catch (e) {
      // setMsg(result.message);
      // setToastOpen(true);
      console.log("error: ", e);
    }
  };

  const handleFrontView = (event) => {
    setFrontView({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleRightView = (event) => {
    setRightView({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleLeftView = (event) => {
    setLeftView({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={12} style={{ paddingTop: "20px" }}>
            {/* Add more main content here */}
            <Typography align="center" color="textSecondary">
              <strong>Building Images</strong>
            </Typography>
          </Grid>

          <Grid size={4}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Front View
              <VisuallyHiddenInput
                type="file"
                //   onChange={(event) => console.log(event.target.files)}
                onChange={handleFrontView}
                multiple
              />
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Right View
              <VisuallyHiddenInput
                type="file"
                //   onChange={(event) => console.log(event.target.files)}
                onChange={handleRightView}
                multiple
              />
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Left View
              <VisuallyHiddenInput
                type="file"
                //   onChange={(event) => console.log(event.target.files)}
                onChange={handleLeftView}
                multiple
              />
            </Button>
          </Grid>

          <Grid size={4} style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              variant="rounded"
              src={frontView.url}
              sx={{ width: 46, height: 46 }}
            />
          </Grid>
          <Grid size={4} style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              variant="rounded"
              src={rightView.url}
              sx={{ width: 46, height: 46 }}
            />
          </Grid>
          <Grid size={4} style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              variant="rounded"
              src={leftView.url}
              sx={{ width: 46, height: 46 }}
            />
          </Grid>

          {/* <Grid size={12}>
            <Button onClick={handleSubmit}>Add</Button>
          </Grid> */}
        </Grid>
      </form>
    </>
  );
}
