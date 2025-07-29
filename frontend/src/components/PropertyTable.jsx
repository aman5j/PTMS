import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { getData } from "../services/FetchNodeServices";
import { useState, useEffect } from "react";

export default function AddPropertyTable({
  floorsData = [],
  // floorNo,
  // floorUsage,
  // floorRentType,
  // floorConstructionType,
  // floorArea,
}) {

  // Example data
// const floorsData = [
//   { floorNo: "1-floor", floorRentType: "self", floorArea: "800" },
//   { floorNo: "2-floor", floorRentType: "rented", floorArea: "500" },
// ];

const totalSelf = floorsData
  .filter(floor => floor.floorRentType && floor.floorRentType.toLowerCase() === "self")
  .reduce((sum, floor) => sum + parseFloat(floor.floorArea || 0), 0);

const totalRent = floorsData
  .filter(floor => floor.floorRentType && 
    (floor.floorRentType.toLowerCase() === "rent" || floor.floorRentType.toLowerCase() === "rented")
  )
  .reduce((sum, floor) => sum + parseFloat(floor.floorArea || 0), 0);

  //     const floors = [
  //   {
  //     floorNo: 1,
  //     floorUsage: "Residential",
  //     floorRentType: "Self",
  //     floorConstructionType: "RCC/RBC",
  //     floorArea: 500,
  //   },
  //   {
  //     floorNo: 2,
  //     floorUsage: "Non-Residential",
  //     floorRentType: "Rented",
  //     floorConstructionType: "Kaccha",
  //     floorArea: 300,
  //   },
  // ];

  // For quick lookups, define header columns:
  // const usageTypes = ["Residential", "Non-Residential"];
  // const rentTypes = ["Self", "Rented"];
  // const constructionTypes = [
  //   "RCC/RBC",
  //   "Kaccha",
  //   "Pakka",
  //   "Under Construction",
  //   "Empty",
  // ];

  // const [detail, setDetail] = useState([]);

  // Get Users Data
  // const fetchFloorDetails = async () => {
  //   var result = await getData("floordetails/fetch_floordetails");
  //   console.log("In Property Table Data : ", result.data);

  //   setDetail(result.data);
  //   // console.log("in detail variable have data: ", detail);
  // };

  // useEffect(function () {
  //   fetchFloorDetails();
  // }, []);

  const detailColumnsCount = 28;

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        Floor Wise Details/तल अनुसार विवरण
      </Typography>
      <Table>
        <TableHead>
          {/* --- Row 1 --- */}
          <TableRow>
            <TableCell rowSpan={4} align="center">
              S.No./Actions
            </TableCell>
            <TableCell rowSpan={4} align="center">
              Floor
            </TableCell>
            <TableCell rowSpan={4} align="center">
              Usage
            </TableCell>

            <TableCell align="center" colSpan={8}>
              Residential
            </TableCell>
            <TableCell align="center" colSpan={12}>
              Non Residential
            </TableCell>
          </TableRow>
          {/* --- Row 2 --- */}
          <TableRow>
            {/* RESIDENTIAL */}
            <TableCell align="center" colSpan={2}>
              RCC/RBC
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Asbestos or Corrugated
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Kachha
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Vacant Land/Demolished
            </TableCell>

            {/* NON RESIDENTIAL */}
            <TableCell align="center" colSpan={2}>
              RCC/RBC
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Asbestos or Corrugated
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Kachha
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Vacant Land/Demolished
            </TableCell>

            {/* For future columns if needed fill below
            <TableCell align="center" colSpan={2}>
              RCC/RBC
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Asbestos or Corrugated
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Kachha
            </TableCell>
            <TableCell align="center" colSpan={2}>
              Vacant Land/Demolished
            </TableCell> */}
          </TableRow>
          {/* --- Row 3 --- */}
          <TableRow>
            {/* RESIDENTIAL */}
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>

            {/* NON RESIDENTIAL */}
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>

            {/* --- Repeated for extra columns as per column structure */}
            {/* <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Self</TableCell>
            <TableCell align="center">Rent</TableCell> */}
            {/* Under Construction, Vacant, Covered Area, Total RI Area
                already covered by rowSpan=2 in previous row */}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Table rows go here. For demonstration, we're using one empty row. */}
          {floorsData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={31} align="center">
                No floors available
              </TableCell>
            </TableRow>
          ) : (
            floorsData.map((floor, idx) => (
              
              <TableRow key={idx}>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell align="center">{floor.floorNo || "-"}</TableCell>
                <TableCell align="center">{floor.floorUsage || "-"}</TableCell>
                
                {/* Residensial */}
                {/* RCC/RBC   */}
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "RCC/RBC"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "RCC/RBC"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Asbestos or Corrugated */}
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Asbestos or Corrugated"   
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Asbestos or Corrugated"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Kaccha */}
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Kachha"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Kachha"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Vacant Land/Demolished */}
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Vacant Land/Demolished"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Residensial" &&
                  floor.floorConstructionType === "Vacant Land/Demolished"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>


                {/* Non-Residensial */}
                {/* RCC/RBC   */}
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "RCC/RBC"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "RCC/RBC"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Asbestos or Corrugated */}
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Asbestos or Corrugated"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Asbestos or Corrugated"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Kaccha */}
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Kachha"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Kachha"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>

                {/* Vacant Land/Demolished */}
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Vacant Land/Demolished"
                    ? floor.floorRentType === "Self"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>
                <TableCell align="center">
                  {floor.floorUsage === "Non-Residensial" &&
                  floor.floorConstructionType === "Vacant Land/Demolished"
                    ? floor.floorRentType === "Rent"
                      ? floor.floorArea // replace with your desired other value
                      : 0
                    : 0}
                </TableCell>



                {/* Another row fix */}

                {/* Insert data cells for each column, as per above header structure */}
                {Array.from({ length: 1 }).map((_, idx) => (
                  <TableCell align="center" key={idx}></TableCell>
                ))}
              </TableRow>
            ))
          )}

          {/* If no data */}
          {/* <TableRow>
            <TableCell colSpan={31} align="center">
              No available options
            </TableCell>
          </TableRow> */}
          {/* Totals row */}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <b>Total Self:</b>  {totalSelf}
            </TableCell>
            <TableCell colSpan={12} align="right">
              <b>Total Rent:</b>  {totalRent}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
