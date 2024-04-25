import {
  themeAction,
  themeState,
  utilState,
} from "@/components/utils/types";
import { create } from "zustand";

export const sideBarStore = create<utilState>((set) => ({
  sidebarToggle: false,
  setOpenSidebar: () =>
    set((state) => ({ sidebarToggle: !state.sidebarToggle })),
  setCloseSidebar: () => set({ sidebarToggle: false }),
}));


export const themeStore = create<themeState & themeAction>((set) => ({
  theme: "Dark1",
  setTheme: (theme) => set(() => ({ theme: theme })),
}));

// export const navBarStore = create;
