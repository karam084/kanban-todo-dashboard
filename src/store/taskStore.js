import { create } from 'zustand';

export const taskStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));