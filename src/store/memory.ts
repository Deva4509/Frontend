import { create } from 'zustand'

export type MemoryType =
  | 'Conversation'
  | 'Preference'
  | 'Fact'
  | 'Task'
  | 'Note'

export interface MemoryItem {
  id: string
  title: string
  content: string
  type: MemoryType
  source: string
  created: string
  tags: string[]
  important: boolean
}

interface MemoryState {
  memories: MemoryItem[]
  selectedMemoryId: string | null
  searchQuery: string
  selectedType: MemoryType | 'All'

  setMemories: (memories: MemoryItem[]) => void
  addMemory: (memory: MemoryItem) => void
  updateMemory: (
    id: string,
    updates: Partial<MemoryItem>,
  ) => void
  deleteMemory: (id: string) => void

  setSelectedMemoryId: (
    id: string | null,
  ) => void

  setSearchQuery: (query: string) => void

  setSelectedType: (
    type: MemoryType | 'All',
  ) => void

  clearFilters: () => void
}

export const useMemoryStore = create<MemoryState>(
  (set) => ({
    memories: [],

    selectedMemoryId: null,

    searchQuery: '',

    selectedType: 'All',

    setMemories: (memories) =>
      set((state) => ({
        memories,
        selectedMemoryId:
          state.selectedMemoryId &&
          memories.some(
            (memory) =>
              memory.id === state.selectedMemoryId,
          )
            ? state.selectedMemoryId
            : memories[0]?.id ?? null,
      })),

    addMemory: (memory) =>
      set((state) => ({
        memories: [memory, ...state.memories],
        selectedMemoryId: memory.id,
      })),

    updateMemory: (id, updates) =>
      set((state) => ({
        memories: state.memories.map((memory) =>
          memory.id === id
            ? {
                ...memory,
                ...updates,
              }
            : memory,
        ),
      })),

    deleteMemory: (id) =>
      set((state) => {
        const memories = state.memories.filter(
          (memory) => memory.id !== id,
        )

        const selectedMemoryId =
          state.selectedMemoryId === id
            ? memories[0]?.id ?? null
            : state.selectedMemoryId

        return {
          memories,
          selectedMemoryId,
        }
      }),

    setSelectedMemoryId: (id) =>
      set({
        selectedMemoryId: id,
      }),

    setSearchQuery: (query) =>
      set({
        searchQuery: query,
      }),

    setSelectedType: (type) =>
      set({
        selectedType: type,
      }),

    clearFilters: () =>
      set({
        searchQuery: '',
        selectedType: 'All',
      }),
  }),
)