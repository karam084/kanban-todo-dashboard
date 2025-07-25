// Import core React functionality
import { useState } from "react";

// React DnD for drag and drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Custom hooks & components
import useTasks from "./hooks/useTasks";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";

// UI components
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//Jquery list
import JQueryList from "./components/JQueryList"; 

// Define task status columns
const COLUMNS = ["backlog", "in progress", "review", "done"];

export default function App() {
  const { tasks, add, update, remove } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", column: "backlog" });
  const [search, setSearch] = useState("");

  // Update task when dropped into a new column
  const handleDropTask = (task, newColumn) => {
    if (task.column !== newColumn) update.mutate({ ...task, column: newColumn });
  };

  // Open modal with selected task for editing
  const handleEdit = (task) => {
    setFormData(task);
    setShowModal(true);
  };

  // Submit task (add or update)
  const handleSubmit = () => {
    if (formData.id) update.mutate(formData);
    else add.mutate(formData);
    setShowModal(false);
    setFormData({ title: "", description: "", column: "backlog" });
  };
  
  // Filter tasks based on search
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex" style={{ minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
        {/* Sidebar */}
        <aside className="bg-white border-end p-4" style={{ width: "250px" }}>
          <h4 className="fw-bold text-dark mb-3">Kanban Board</h4>
          <p className="text-muted small mb-0">Manage your tasks visually</p>
        </aside>

        {/* Main Kanban Area */}
        <main className="flex-grow-1 px-5 py-4" style={{ backgroundColor: "#f1f3f5" }}>
          <div className="row g-3 align-items-end mb-4">
            <div className="col-md">
              <TextField
                fullWidth
                placeholder="Search by task title or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-auto">
              <Button variant="contained" className="rounded-3 px-4" onClick={() => setShowModal(true)}>
                + Add Task
              </Button>
            </div>
          </div>

          <div className="row g-4">
            {COLUMNS.map((col) => (
              <div key={col} className="col-12 col-md-6 col-lg-3">
                <TaskColumn
                  column={col}
                  tasks={filteredTasks.filter((t) => t.column === col)}
                  onDropTask={handleDropTask}
                  actions={{ onEdit: handleEdit, onDelete: remove.mutate }}
                />
              </div>
            ))}
          </div>
        </main>

        {/* Right-Side Bonus jQuery List */}
        <aside className="bg-white border-start p-4" style={{ width: "300px" }}>
          <h5 className="fw-bold mb-3">Dynamic List</h5>
          <JQueryList />
        </aside>

        {/* Modal */}
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
