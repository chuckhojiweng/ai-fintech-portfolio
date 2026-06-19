import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Parent, ChildProfile } from "@/types/user";

interface SessionState {
  parent: Parent | null;
  activeChild: ChildProfile | null;
  isAuthenticated: boolean;
  setParent: (parent: Parent | null) => void;
  setActiveChild: (child: ChildProfile | null) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      parent: null,
      activeChild: null,
      isAuthenticated: false,
      setParent: (parent) =>
        set({ parent, isAuthenticated: parent !== null }),
      setActiveChild: (activeChild) => set({ activeChild }),
      logout: () =>
        set({ parent: null, activeChild: null, isAuthenticated: false }),
    }),
    { name: "codecritters-session" }
  )
);
