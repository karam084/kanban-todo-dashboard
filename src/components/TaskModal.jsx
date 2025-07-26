import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export default function TaskModal({ open, onOpenChange, formData, setFormData, onSubmit }) {
  const titleRef = useRef();

  useEffect(() => {
    if (open && titleRef.current) {
      titleRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} aria-labelledby="task-dialog-title">
      <DialogTitle id="task-dialog-title">{formData.id ? "Edit Task" : "New Task"}</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button onClick={onSubmit}>{formData.id ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
}
