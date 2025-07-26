import { useDrag } from "react-dnd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const colorMap = {
  backlog: "secondary",
  "in progress": "primary",
  review: "warning",
  done: "success",
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <div
      ref={drag}
      className={`card mb-3 border-0 shadow-sm rounded-4 ${isDragging ? "opacity-50" : ""}`}
      style={{
        cursor: "move",
        backgroundColor: "#ffffff",
        borderLeft: `6px solid var(--bs-${colorMap[task.column] || "dark"})`,
      }}
    >
      <div className="card-body">
        <h6 className="card-title mb-1 fw-semibold text-dark">{task.title}</h6>
        <p className="card-text text-muted small mb-2">{task.description}</p>
        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-sm btn-outline-secondary rounded-circle"
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger rounded-circle"
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}
