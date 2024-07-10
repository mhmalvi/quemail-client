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

export type ContactStoreState = {
  hasData: boolean;
  csvData: any[] | null;
  groupData: [string] | null;
  groupContacts: [ContactType] | null;
  allContactList: [ContactType] | null;
  totalPages: number;
  groupTotalPages: number;
  currentPage: number;
  currentGroupPage: number;
  allContactPerPage: number;
  setAllContactPerPage: (state: number) => void;
  setAllContactList: (contactData: [ContactType] | null) => void;
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
}
export interface credentialLoginStep {
  item: boolean;
  loading: boolean;
}

// FETCHING CAMPAIGNS
export interface CampaignListType {
  campaignName: string;
  count: number;
  fromMail: string;
  fromName: string;
  id: number;
  updatedAt: string;
}
interface CampaignListResponse {
  status: number | null;
  campaigns: CampaignListType[] | null;
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
  open:number | null,
  not_opened:number | null,
  subscribed:number | null,
  unSubscribed:number | null,
  bounce:number | null,
  delivered:number | null,
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
export interface nameFilterState {
  count: number | null;
  current_page: number | null;
  totalPages: number | null;
  paginatedData: [CampaignListType];
}

export interface PerformanceState {
  nameFilter: nameFilterState | null;
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
