"use client";

import {
  // CampaignListResponse,
  CampaignStoreState,
  ContactStoreState,
  NewCampaignType,
  ShowCampaignStore,
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
  allContactPerPage: 8,
  totalPages: 1,
  groupTotalPages: 1,
  currentPage: 1,
  currentGroupPage: 1,
  setAllContactPerPage: (state) => set(() => ({ allContactPerPage: state })),
  setAllContactList: (contactData) =>
    set(() => ({ allContactList: contactData })),
  setCsvData: (csvData: any[]) => set(() => ({ csvData: csvData })),
  setHasData: (state: boolean) => set(() => ({ hasData: state })),
  setGroupData: (groupData) => set(() => ({ groupData: groupData })),
  setGroupContacts: (data) => set(() => ({ groupContacts: data })),
  setTotalPages: (data) => set(() => ({ totalPages: data })),
  setGroupTotalPages: (data) => set(() => ({ groupTotalPages: data })),
  setCurrentPage: (data) => set(() => ({ currentPage: data })),
  setCurrentGroupPage: (data) => set(() => ({ currentPage: data })),
}));

export const campaignStore = create<CampaignStoreState>((set) => ({
  viewRecipients: false,
  viewSchedule: false,
  newCampaign: {
    template: null,
    campaignInfo: {
      campaignName: null,
      fromMail: null,
      fromName: null,
      subject: null,
    },
    recipient: null,
    schedule: null,
    userID: null,
  },
  selectedTemplate: null,
  templateData: null,
  clickedGroup: null,
  

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
  setViewSchedule: (state) => set(() => ({ viewSchedule: state })),
  setClickedGroup: (state) =>
    set((prevState) => ({
      clickedGroup:
        typeof state === "function" ? state(prevState.clickedGroup) : state,
    })),
}));

export const showCampaignStore = create<ShowCampaignStore>((set) => ({
  campaignList: {
    status: null,
    campaigns: null,
    current_page: null,
    total: null,
    totalPages: null,
    message: null,
  },
  campaignItemList: {
    message: null,
    status: null,
    campaigns: null,
    total: null,
    totalPages: null,
    current_page: null,
  },
  clickedCampaignId: null,
  campaignDetails: null,
  allCampaignItemsPerPage: 8,
  setAllCampaignItemsPerPage: (state) => set(() => ({ allCampaignItemsPerPage: state })),
  setCampaignList: (state) => set(() => ({ campaignList: state })),
  setClickedCampaignId: (state) => set(() => ({ clickedCampaignId: state })),
  setCampaignItemList(state) {
    set(() => ({ campaignItemList: state }));
  },
  setCampaignDetails(state) {
    set(() => ({ campaignDetails: state }));
  },
}));
