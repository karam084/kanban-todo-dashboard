import axios from "axios";

const API_URL = "http://localhost:4000/tasks";

export const getTasks = async (page = 1) => {
  const res = await axios.get(`${API_URL}?_page=${page}&_limit=5`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (task) => {
  const res = await axios.put(`${API_URL}/${task.id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};