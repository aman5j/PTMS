import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { getData, postData } from "../services/FetchNodeServices";

const useStyles = makeStyles({
  table: { minWidth: 650 },
  header: { backgroundColor: "#e0e0e0" },
});

export default function UsersTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Editing dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState({ _id: "", name: "", email: "" });

  // Snackbar
  const [snack, setSnack] = useState({ open: false, message: "" });

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

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Edit dialog handlers
  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const handleEditField = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!editUser.name.trim() || !editUser.email.trim())
      return setSnack({ open: true, message: "Name and Email required." });

    // Make API call
    const result = await postData("login/update_user", {
      _id: editUser._id,
      name: editUser.name,
      email: editUser.email,
    });
    if (result.status) {
      setSnack({ open: true, message: "User updated!" });
      setEditOpen(false);
      fetchAllUsers();
    } else {
      setSnack({ open: true, message: "Failed to update user" });
    }
  };

  // Delete Handler
  const handleDelete = async (user) => {
    if (!window.confirm("Delete this user?")) return;
    const result = await postData("login/delete_user", { _id: user._id });
    if (result.status) {
      setSnack({ open: true, message: "User deleted!" });
      fetchAllUsers();
    } else {
      setSnack({ open: true, message: "Failed to delete user" });
    }
  };

  // Pagination
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper style={{ width: "70vw", margin: "2rem auto" }}>
      <Typography variant="h5" gutterBottom align="left">
        Users Table
      </Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="users table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            margin="dense"
            value={editUser.name}
            onChange={handleEditField}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            margin="dense"
            value={editUser.email}
            onChange={handleEditField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
    </Paper>
  );
}
