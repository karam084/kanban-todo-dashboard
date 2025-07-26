import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ column, tasks, onDropTask, actions }) {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (task) => onDropTask(task, column),
  }));

  return (
    <div ref={drop} className="w-full p-2 bg-gray-100 rounded min-h-[300px]">
      <h2 className="text-xl font-semibold mb-2 capitalize">{column}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} {...actions} />
      ))}
    </div>
  );
}
