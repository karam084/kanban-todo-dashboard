import axios from "axios";

const API_URL = "http://localhost:4000/tasks";

export const fetchTasks = () => axios.get(API_URL).then(res => res.data);
export const createTask = (task) => axios.post(API_URL, task).then(res => res.data);
export const updateTask = (task) => axios.put(`${API_URL}/${task.id}`, task).then(res => res.data);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
