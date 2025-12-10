import { create } from "zustand";

export const useImageSearchStore = create((set) => ({
  results: [],
  setResults: (data) => set({ results: data }),
}));
