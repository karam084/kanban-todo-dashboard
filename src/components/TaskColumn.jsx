import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { useEffect, useRef, useState } from "react";

const columnColors = {
  backlog: "secondary",
  "in progress": "primary",
  review: "warning",
  done: "success",
};

export default function TaskColumn({ column, tasks, onDropTask, actions }) {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (task) => onDropTask(task, column),
  }));

  const containerRef = useRef();
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [tasks]);

  const visibleTasks = tasks.slice(0, visibleCount);

  return (
    <div
      ref={drop}
      className="bg-white rounded-4 shadow-sm p-3 min-vh-25 border d-flex flex-column"
    >
      <h5
        className={`fw-bold text-${columnColors[column]} mb-3 text-capitalize`}
      >
        {column}
      </h5>
      {visibleTasks.length === 0 ? (
        <p className="text-muted fst-italic small">No tasks</p>
      ) : (
        visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} {...actions} />
        ))
      )}
      <div ref={containerRef} />
    </div>
  );
}
