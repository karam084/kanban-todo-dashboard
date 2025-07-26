import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskApi";

export default function useTasks() {
  const queryClient = useQueryClient();

  const { data: tasks = [], ...queryRest } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const add = useMutation({ mutationFn: createTask, onSuccess: () => queryClient.invalidateQueries(["tasks"]) });
  const update = useMutation({ mutationFn: updateTask, onSuccess: () => queryClient.invalidateQueries(["tasks"]) });
  const remove = useMutation({ mutationFn: deleteTask, onSuccess: () => queryClient.invalidateQueries(["tasks"]) });

  return { tasks, add, update, remove, ...queryRest };
}