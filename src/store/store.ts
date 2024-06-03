"use client";

import {
  CampaignStoreState,
  ContactStoreState,
  NewCampaignType,
  themeAction,
  themeState,
  utilState,
} from "@/components/utils/types";
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

export const contactStore = create<ContactStoreState>((set) => ({
  hasData: false,
  csvData: null,
  allContactList: null,
  groupData: null,
  groupContacts: null,
  totalPages: 1,
  currentPage: 1,
  setAllContactList: (contactData) =>
    set(() => ({ allContactList: contactData })),
  setCsvData: (csvData: any[]) => set(() => ({ csvData: csvData })),
  setHasData: (state: boolean) => set(() => ({ hasData: state })),
  setGroupData: (groupData) => set(() => ({ groupData: groupData })),
  setGroupContacts: (data) => set(() => ({ groupContacts: data })),
  setTotalPages: (data) => set(() => ({ totalPages: data })),
  setCurrentPage: (data) => set(() => ({ currentPage: data })),
}));

export const campaignStore = create<CampaignStoreState>((set) => ({
  viewRecipients: false,
  newCampaign: {
    template: null,
    campaignInfo: null,
    recipient: null,
    schedule: null,
  },
  selectedTemplate: null,
  templateData: null,
  setNewCampaign: (data) =>
    set((state) => ({
      newCampaign:
        typeof data === "function"
          ? (data as (prev: NewCampaignType | null) => NewCampaignType | null)(
              state.newCampaign
            )
          : data,
    })),
  setSelectedTemplate: (data) => set(() => ({ selectedTemplate: data })),
  setTemplateData: (data) => set(() => ({ templateData: data })),
  setViewRecipients: (state) => set(() => ({ viewRecipients: state })),
}));
