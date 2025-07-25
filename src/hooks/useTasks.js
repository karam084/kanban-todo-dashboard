import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...query
  } = useInfiniteQuery(
    ["tasks"],
    ({ pageParam = 1 }) => getTasks(pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === 5? pages.length + 1: undefined,
    }
  );

  const addTask = useMutation(createTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const editTask = useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const removeTask = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const tasks = data?.pages.flat() || [];

  return {
    tasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    addTask,
    editTask,
    removeTask,
    ...query,
  };
};
