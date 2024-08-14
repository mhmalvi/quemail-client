"use client";

import {
  // CampaignListResponse,
  CampaignStoreState,
  ContactStoreState,
  NewCampaignType,
  PerformanceState,
  ShowCampaignStore,
  themeAction,
  themeState,
  utilState,
  TourState,
  compareCampaignState,
  BillingState,
  checkoutProps,
  subscriptionDetailsProps,
  landingState,
  passwordState,
} from "@/components/utils/types";
import { create } from "zustand";

export const useTourStore = create<TourState>((set) => ({
  isTourGoing: false,
  setIsTourGoing: (isTourGoing) => set({ isTourGoing }),
}));

export const Storage = {
  getItem: (key: any) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error("Failed to parse JSON from localStorage", error);
          return null;
        }
      }
    }
    return null;
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
    recipients: null,
    total: null,
    totalPages: null,
    current_page: null,
    open: null,
    not_opened: null,
    subscribed: null,
    unSubscribed: null,
    bounce: null,
    delivered: null,
  },
  clickedCampaignId: null,
  campaignDetails: null,
  allCampaignItemsPerPage: 8,
  setAllCampaignItemsPerPage: (state) =>
    set(() => ({ allCampaignItemsPerPage: state })),
  setCampaignList: (state) => set(() => ({ campaignList: state })),
  setClickedCampaignId: (state) => set(() => ({ clickedCampaignId: state })),
  setCampaignItemList(state) {
    set(() => ({ campaignItemList: state }));
  },
  setCampaignDetails(state) {
    set(() => ({ campaignDetails: state }));
  },
}));

export const compareCampaignStore = create<compareCampaignState>((set) => ({
  clickedCampaignId1: null,
  clickedCampaignId2: null,
  campaign1Name: undefined,
  campaign2Name: undefined,
  campaignDetails1: null,
  campaignDetails2: null,
  winnerCampaign: null,
  setClickedCampaignId1: (state) => set(() => ({ clickedCampaignId1: state })),
  setClickedCampaignId2: (state) => set(() => ({ clickedCampaignId2: state })),
  setCampaign1Name(state) {
    set(() => ({ campaign1Name: state }));
  },
  setCampaign2Name(state) {
    set(() => ({ campaign2Name: state }));
  },
  setCampaignDetails1(state) {
    set(() => ({ campaignDetails1: state }));
  },
  setCampaignDetails2(state) {
    set(() => ({ campaignDetails2: state }));
  },
  setWinnerCampaign(state) {
    set(() => ({ winnerCampaign: state }));
  },
}));

export const performanceStore = create<PerformanceState>((set) => ({
  campaignName: undefined,
  nameFilter: null,
  leads: {
    count: null,
    item: [],
  },

  setCampaignName: (state) => set(() => ({ campaignName: state })),
  setLeads: (index, item) =>
    set((state) => {
      if (
        performanceStore.getState().campaignName !=
        showCampaignStore.getState().campaignDetails?.campaignName
      ) {
        // Reset leads
        return {
          leads: {
            ...state.leads,
            item: [],
          },
        };
      }
      const existingIndex = state.leads.item?.findIndex(
        (i) => i.index === index
      );
      let updatedItems;
      if (existingIndex !== -1 && existingIndex !== undefined) {
        // Item exists, remove it
        updatedItems = state.leads.item?.filter((i) => i.index !== index) || [];
      } else {
        // Item does not exist, add it
        updatedItems = [...(state.leads.item || []), { ...item, index }];
      }
      return {
        leads: {
          ...state.leads,
          item: updatedItems,
        },
      };
    }),
  setNameFilter: (state) =>
    set(() => ({
      nameFilter: state,
    })),
}));
export const billingStore = create<BillingState>((set) => ({
  products: [],
  priceId: null,
  checkoutModal: false,
  cancelModal: false,
  amount: null,
  quantity: null,
  setProducts(state) {
    set(() => ({ products: state }));
  },
  setCheckoutModal(state) {
    set(() => ({ checkoutModal: state }));
  },
  setCancelModal(state) {
    set(() => ({ cancelModal: state }));
  },
  setPriceId(state) {
    set(() => ({ priceId: state }));
  },
  setAmount(state) {
    set(() => ({ amount: state }));
  },
  setQuantity(state) {
    set(() => ({ quantity: state }));
  },
}));

export const checkout = create<checkoutProps>((set) => ({
  cardID: null,
  index: null,
  setCardID(state) {
    set(() => ({ cardID: state }));
  },
  setIndex(state) {
    set(() => ({ index: state }));
  },
}));

export const subsciption = create<subscriptionDetailsProps>((set) => ({
  subscriptonID: null,
  plan: null,
  setSubscriptonID(state) {
    set(() => ({ subscriptonID: state }));
  },
  setPlan(state) {
    set(() => ({ plan: state }));
  },
}));

export const landingStore = create<landingState>((set) => ({
  welcomeVisible: false,
  setWelcomeVisible: (visible: boolean) => set({ welcomeVisible: visible }),
}));

export const passwordLoginStore = create<passwordState>((set) => ({
  passwordExist: false,
  setPasswordExist(state) {
    set(() => ({ passwordExist: state }));
  },
}));
