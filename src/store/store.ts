import { create } from "zustand";

interface utilState {
  sidebarToggle: boolean;
  openSidebar: (by: boolean) => void;
}

export const sideBarStore = create<utilState>((set) => ({
  sidebarToggle: false,
  openSidebar: (by: boolean) =>
    set((state) => ({ sidebarToggle: !state.sidebarToggle })),
  closeSidebar: (by: boolean) => set((state) => ({ sidebarToggle: false })),
}));
