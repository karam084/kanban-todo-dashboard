import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useRef, useEffect } from "react";

export default function TaskModal({ open, onOpenChange, formData, setFormData, onSubmit }) {
  const titleRef = useRef();

  useEffect(() => {
    if (open && titleRef.current) titleRef.current.focus();
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>{formData.id ? "Edit Task" : "New Task"}</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={titleRef}
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <TextField
          select
          label="Column"
          fullWidth
          margin="dense"
          value={formData.column}
          onChange={(e) => setFormData({ ...formData, column: e.target.value })}
        >
          {["backlog", "in progress", "review", "done"].map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>{formData.id ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}
