import { Key } from "react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}
// export interface Homecard {
//   title: string;
//   subtext: string;
//   footertext: string;
// }
export type OpenEditContactModal = {
  show: boolean;
  data: EditContactData | null;
};

export type EditContactData = {
  id: number | null;
  userID: string | false | null;
  json: {
    name: string | null;
    email: string | null;
    group: string | null;
  };
};

interface OpenModalState {
  show: string;
}

export interface ImportCSVProps {
  openModal: OpenModalState;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenModalState>>;
}

// Store Types
export interface utilState {
  sidebarToggle: boolean;
  setOpenSidebar: (by: boolean) => void;
}
export type themeState = {
  theme: string;
};
export interface themeAction {
  setTheme: (theme: themeState["theme"]) => void;
}
export type TemplateType = {
  name: string | null;
  userID: number | null;
  id: number | null;
  template: {
    html: string | null;
    design: {} | null;
    chunks: {} | null;
    amp: {} | null;
  };
};

export type ContactType = {
  id: number;
  json: {
    name: string | null;
    email: string | null;
    group: string | null;
  };
  userID: number;
};

export type GroupType = {
  group: string | null;
};

export type ContactStoreState = {
  hasData: boolean;
  csvData: any[] | null;
  groupData: [string] | null;
  groupContacts: [ContactType] | null;
  allContactList: [ContactType] | null;
  allGroupList: [GroupType] | null;
  totalPages: number;
  groupTotalPages: number;
  currentPage: number;
  currentGroupPage: number;
  allContactPerPage: number;
  setAllContactPerPage: (state: number) => void;
  setAllContactList: (contactData: [ContactType] | null) => void;
  setAllGroupList: (contactData: [GroupType] | null) => void;
  setCsvData: (csvData: any[]) => void;
  setHasData: (state: boolean) => void;
  setGroupData: (data: [string] | null) => void;
  setGroupContacts: (data: [ContactType] | null) => void;
  setTotalPages: (data: number) => void;
  setGroupTotalPages: (data: number) => void;
  setCurrentPage: (data: number) => void;
  setCurrentGroupPage: (data: number) => void;
};

export type CampaignInfoType = {
  campaignName: string | null;
  subject: string | null;
  fromName: string | null;
  fromMail: string | null;
};

export type NewCampaignType = {
  template: {
    name: string | null;
    data: string | null;
  } | null;
  campaignInfo: CampaignInfoType | null;
  recipient: [ContactType] | null;
  schedule: string | null;
  userID: number | null;
} | null;
export type CampaignStoreState = {
  newCampaign: NewCampaignType | null;
  templateData: [TemplateType] | null;
  selectedTemplate: TemplateType | null;
  viewRecipients: boolean;
  viewSchedule: boolean;
  clickedGroup: number[] | null;
  setNewCampaign: (
    data:
      | NewCampaignType
      | ((prev: NewCampaignType | null) => NewCampaignType | null)
  ) => void;
  setSelectedTemplate: (data: TemplateType | null) => void;
  setTemplateData: (data: [TemplateType]) => void;
  setViewRecipients: (state: boolean) => void;
  setViewSchedule: (state: boolean) => void;
  setClickedGroup: (
    state: number[] | null | ((prev: number[] | null) => number[])
  ) => void;
};

// API TYPES
export interface googleLoginData {
  userName: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  token: string | null | undefined;
}
export interface OTPData {
  email: string;
  otp: string;
  password: string;
}
export interface credentialLoginStep {
  item: boolean;
  loading: boolean;
}

// FETCHING CAMPAIGNS
export interface CampaignListType {
  schedule: Date;
  campaignName: string;
  count: number;
  fromMail: string;
  fromName: string;
  id: number;
  updatedAt: string;
}
interface CampaignListResponse {
  status: number | null;
  paginatedData: CampaignListType[] | null;
  current_page: number | null;
  total: number | null;
  totalPages: number | null;
  message: string | null;
}
interface CampaignDetails {
  campaignName: string;
  senderName: string;
  senderEmail: string;
  count: number;
}
export interface CampaignItemListType {
  id: number;
  subject: string | null;
  fromName: string | null;
  fromEmail: string | null;
  recipientName: string | null;
  recipientEmail: string | null;
  group: string | null;
  templateName: string | null;
  templateData: string | null;
  campaignID: number | null;
  userID: number | null;
  schedule: string | null;
  open: number | null;
  click: number | null;
  bounce: number | null;
  deliver: number | null;
  index: number | null;
  subscription_status: number | null;
}
interface CampaignItemListResponse {
  message: string | null;
  status: number | null;
  recipients: CampaignItemListType[] | null;
  total: number | null;
  totalPages: number | null;
  current_page: number | null;
  open: number | null;
  not_opened: number | null;
  subscribed: number | null;
  unSubscribed: number | null;
  bounce: number | null;
  delivered: number | null;
}
export interface ShowCampaignStore {
  campaignList: CampaignListResponse | null;
  campaignItemList: CampaignItemListResponse | null;
  clickedCampaignId: number | null;
  campaignDetails: CampaignDetails | null;
  allCampaignItemsPerPage: number;
  setAllCampaignItemsPerPage: (state: number) => void;
  setCampaignList: (state: CampaignListResponse) => void;
  setCampaignItemList: (state: CampaignItemListResponse | null) => void;
  setClickedCampaignId: (state: number | null) => void;
  setCampaignDetails: (state: CampaignDetails | null) => void;
}

export interface compareCampaignState {
  campaign1Name: string | undefined;
  campaign2Name: string | undefined;
  clickedCampaignId1: number | null;
  clickedCampaignId2: number | null;
  campaignDetails1: CampaignItemListResponse | null;
  campaignDetails2: CampaignItemListResponse | null;
  winnerCampaign: string | null;
  setCampaign1Name: (state: string | undefined) => void;
  setCampaign2Name: (state: string | undefined) => void;
  setClickedCampaignId1: (state: number | null) => void;
  setClickedCampaignId2: (state: number | null) => void;
  setCampaignDetails1: (state: CampaignItemListResponse | null) => void;
  setCampaignDetails2: (state: CampaignItemListResponse | null) => void;
  setWinnerCampaign: (state: string | null) => void;
}

export interface campaignStatus {
  scheduleTime: Date | null;
  setScheduleTime: (state: Date | undefined) => void;
}

export interface nameFilterState {
  count: number | null;
  current_page: number | null;
  totalPages: number | null;
  paginatedData: [CampaignListType];
}

export interface PerformanceState {
  campaignName: string | undefined;
  nameFilter: nameFilterState | null;

  setCampaignName: (state: string | undefined) => void;
  setNameFilter: (state: nameFilterState) => void;
  leads: {
    count: number | null;
    item: CampaignItemListType[] | null;
  };
  setLeads: (index: number, item: CampaignItemListType) => void;
}

export interface TourState {
  isTourGoing: boolean;
  setIsTourGoing: (isTourGoing: boolean) => void;
}

export interface FilterProps {
  position: string;
}

export interface BillingState {
  amount: string | null;
  products: [] | null;
  priceId: number | null;
  checkoutModal: boolean;
  cancelModal: boolean;
  quantity: number | null;
  setProducts: (state: [] | null) => void;
  setPriceId: (state: number | null) => void;
  setCheckoutModal: (state: boolean) => void;
  setCancelModal: (state: boolean) => void;
  setAmount: (state: string | null) => void;
  setQuantity: (state: number | null) => void;
}

// Define the type for mailAdded
export interface MailAdded {
  google?: {
    email: string;
    app_password: string;
    id: number;
  };
}

export interface checkoutProps {
  cardID: string | null;
  index: Key | null;
  setCardID: (state: string | null) => void;
  setIndex: (state: Key | null) => void;
}

export interface subscriptionDetailsProps {
  subscriptonID: string | null;
  plan: string | null;
  setSubscriptonID: (state: string | null) => void;
  setPlan: (state: string | null) => void;
}

export interface Card {
  name: string;
  brand: string;
  last4: number;
  id: string;
}

export interface landingState {
  disableScroll: boolean;
  setDisableScroll: (disableScroll: boolean) => void;
}

export interface passwordState {
  passwordExist: boolean;
  setPasswordExist: (state: boolean) => void;
}

export interface subscriptionProps {
  stripeCustomerID: string;
  priceID: string;
  amount: number;
  paymentSourceID: string;
}

export interface DeleteCardModalProps {
  show: boolean;
  onClose: () => void;
  name: string;
  brand: string;
  digit: number;
  id: string;
}

export interface currentResources {
  currentCampaigns: number | null;
  currentContacts: number | null;
  currentEmails: number | null;
}
