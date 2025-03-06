import { create } from "zustand";

interface FormulaState {
  selectedSuggestions: string[]; 
  addSuggestion: (suggestion: string) => void;
  removeSuggestion: (index: number) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  selectedSuggestions: [],
  addSuggestion: (suggestion) =>
    set((state) => {
      if (!state.selectedSuggestions.includes(suggestion)) {
        return {
          selectedSuggestions: [...state.selectedSuggestions, suggestion],
        };
      }
      return state; 
    }),

  removeSuggestion: (index) =>
    set((state) => ({
      selectedSuggestions: state.selectedSuggestions.filter((_, i) => i !== index), 
    })),
}));