import { create } from "zustand";

const useTaskStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search })
}));

export default useTaskStore;