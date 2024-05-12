import { themeAction, themeState, utilState } from "@/components/utils/types";
import { create } from "zustand";
export const Storage = {
  getItem: (key: any) => {
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) || "");
    } else {
      return null;
    }
  },
  setItem: (key: any, value: any) => {
    if (typeof window !== "undefined")
      localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: any) => {
    if (typeof window !== "undefined") localStorage.removeItem(key);
  },
};

export const sideBarStore = create<utilState>((set) => ({
  sidebarToggle: false,
  setOpenSidebar: () =>
    set((state) => ({ sidebarToggle: !state.sidebarToggle })),
  setCloseSidebar: () => set({ sidebarToggle: false }),
}));

export const themeStore = create<themeState & themeAction>((set) => ({
  theme: "",
  setTheme: (theme) => set(() => ({ theme: theme })),
}));

export const contactStore = create((set) => ({
  hasData: false,
  csvData: null,
  setCsvData: (csvData: []) => set(() => ({ csvData: csvData })),
  setHasData: (state: boolean) => set(() => ({ hasData: state })),
}));

// export const navBarStore = create;
