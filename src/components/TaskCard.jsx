import { useDrag } from "react-dnd";
import { Button } from "@mui/material";

export default function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div ref={drag} className="mb-2 p-2 bg-white rounded shadow cursor-move" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p className="font-bold">{task.title}</p>
      <p className="text-sm">{task.description}</p>
      <div className="flex justify-end gap-2 mt-2">
        <Button size="small" variant="outlined" onClick={() => onEdit(task)}>Edit</Button>
        <Button size="small" color="error" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </div>
  );
}