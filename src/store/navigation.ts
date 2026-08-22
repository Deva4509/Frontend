import { create } from 'zustand'

export type NexusView =
  | 'startup'
  | 'home'
  | 'profile'
  | 'chat'
  | 'voice'
  | 'memory'
  | 'vision'
  | 'automation'
  | 'planner'
  | 'devices'
  | 'plugins'
  | 'skills'
  | 'files'
  | 'settings'
  | 'developer'
  | 'analytics'

interface NavigationState {
  currentView: NexusView
  isBooted: boolean
  pendingChatMessage: string | null
  setCurrentView: (view: NexusView) => void
  setBooted: (booted: boolean) => void
  openChatWithMessage: (message: string) => void
  clearPendingChatMessage: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'startup',
  isBooted: false,
  pendingChatMessage: null,

  setCurrentView: (currentView) => set({ currentView }),

  setBooted: (isBooted) => set({ isBooted }),

  openChatWithMessage: (message) =>
    set({
      currentView: 'chat',
      pendingChatMessage: message.trim() || null,
    }),

  clearPendingChatMessage: () =>
    set({
      pendingChatMessage: null,
    }),
}))
