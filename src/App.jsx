import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTasks from "./hooks/useTasks";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import { Button } from "@mui/material";

const COLUMNS = ["backlog", "in progress", "review", "done"];

export default function App() {
  const { tasks, add, update, remove } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", column: "backlog" });

  const handleDropTask = (task, newColumn) => {
    if (task.column !== newColumn) update.mutate({ ...task, column: newColumn });
  };

  const handleEdit = (task) => {
    setFormData(task);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (formData.id) update.mutate(formData);
    else add.mutate(formData);
    setShowModal(false);
    setFormData({ title: "", description: "", column: "backlog" });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <Button variant="contained" onClick={() => setShowModal(true)}>Add Task</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLUMNS.map((col) => (
            <TaskColumn
              key={col}
              column={col}
              tasks={tasks.filter((t) => t.column === col)}
              onDropTask={handleDropTask}
              actions={{ onEdit: handleEdit, onDelete: remove.mutate }}
            />
          ))}
        </div>
        <TaskModal
          open={showModal}
          onOpenChange={setShowModal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </DndProvider>
  );
}
