import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Optional: Zebra striping and sticky head styling
const getRowStyle = (index) =>
  index % 2 === 0
    ? { backgroundColor: "#f9f9f9" }
    : { backgroundColor: "#fff" };

function formatZoneWardMohalla(item) {
  return [item.zone, item.ward, item.mohalla].filter(Boolean).join(" | ");
}

export function PropertyResultsTable({
  data,
  sortField,
  onSort,
  sortDir,
  onEdit,
  onDelete,
}) {

  const user = JSON.parse(localStorage.getItem("USER") || "{}");
  const permissionAccess = user.name === "Aman Prajapati";

  // const columns = [
  //   // { id: "s.no", label: "S.No." },
  //   { id: "ownerName", label: "Owner" },
  //   { id: "mobileNo", label: "Mobile" },
  //   { id: "email", label: "Email" },
  //   { id: "zoneWardMohalla", label: "Zone | Ward | Mohalla" },
  //   { id: "houseUsage", label: "Usage" },
  //   // { id: "ownershipStatus", label: "Ownership" },
  //   // { id: "constructionYear", label: "Year" },
  //    { id: "actions", label: "Actions", disableSort: true },
  // ];

   // Columns: conditionally include Actions column based on permissionAccess
  const baseColumns = [
    { id: "ownerName", label: "Owner" },
    { id: "mobileNo", label: "Mobile" },
    { id: "email", label: "Email" },
    { id: "zoneWardMohalla", label: "Zone | Ward | Mohalla" },
    { id: "houseUsage", label: "Usage" },
  ];

  const columns = permissionAccess
    ? [...baseColumns, { id: "actions", label: "Actions", disableSort: true }]
    : baseColumns;

  

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>  {/* maxHeight: 350 */}
      <Table stickyHeader size="small" aria-label="property search results">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sortDirection={sortField === col.id ? sortDir : false}
                sx={{
                  fontWeight: 600,
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  top: 0,
                  zIndex: 1,
                  minWidth:
                    col.id === "zoneWardMohalla"
                      ? 180
                      : col.id === "email"
                      ? 160
                      : col.id === "actions"
                      ? 96
                      : 80,
                }}
              >
                {!col.disableSort &&
                ["ownerName", "mobileNo", "email", "constructionYear"].includes(
                  col.id
                ) ? (
                  <TableSortLabel
                    active={sortField === col.id}
                    direction={sortField === col.id ? sortDir : "asc"}
                    onClick={() => onSort(col.id)}
                    sx={{
                      color: "inherit",
                      "& .MuiTableSortLabel-icon": {
                        color: "inherit !important",
                      },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography>No properties found.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, idx) => (
              <TableRow
                key={item._id?.$oid || item._id}
                hover
                style={getRowStyle(idx)}
              >
                {/* <TableCell>{idx + 1}</TableCell> */}
                <TableCell>{item.ownerName}</TableCell>
                <TableCell>{item.mobileNo}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{formatZoneWardMohalla(item)}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {item.houseUsage}
                </TableCell>
                {/* <TableCell>{item.ownershipStatus}</TableCell> */}
                {/* <TableCell>{item.constructionYear}</TableCell> */}

                {/* Conditionally render Actions cell only if permissionAccess */}
                {permissionAccess && (
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}

                {/* <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
