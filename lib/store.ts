import { create } from "zustand";
import type { GlossaryTerm } from "@/lib/glossary";

interface AtlasState {
  selectedTerm: GlossaryTerm | null;
  hoveredId: string | null;
  searchQuery: string;
  setSelectedTerm: (term: GlossaryTerm | null) => void;
  setHoveredId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useAtlasStore = create<AtlasState>((set) => ({
  selectedTerm: null,
  hoveredId: null,
  searchQuery: "",
  setSelectedTerm: (term) => set({ selectedTerm: term }),
  setHoveredId: (id) => set({ hoveredId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
