import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

export default function EditPropertyDialog({ open, onClose, row, onSave }) {
  const [formData, setFormData] = useState(row || {});

  useEffect(() => {
    setFormData(row || {});
  }, [row]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          fullWidth
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName || ""}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Mobile No"
          name="mobileNo"
          value={formData.mobileNo || ""}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Zone"
          name="zone"
          value={formData.zone || ""}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Ward"
          name="ward"
          value={formData.ward || ""}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Mohalla"
          name="mohalla"
          value={formData.mohalla || ""}
          onChange={handleChange}
        />

        {/* If houseUsage has defined options, use select */}

        <FormControl fullWidth margin="normal">
          <InputLabel id="houseusage-label">House Usage</InputLabel>
          <Select
            labelId="houseusage-label"
            id="houseusage"
            name="houseUsage"
            label="House Usage"
            value={formData.houseUsage || ""}
            onChange={handleChange}
          >
            <MenuItem value="">Select...</MenuItem>
            <MenuItem value="self-owned">Self-Owned</MenuItem>
            <MenuItem value="rented">Rented</MenuItem>
            <MenuItem value="mix">Mix</MenuItem>
          </Select>
        </FormControl>


      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
