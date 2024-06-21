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
  data: {
    json: {
      name: string;
      email: string;
    };
  } | null;
};

export type EditContactData = {
  id: number | null;
  user_id: string | false | null;
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
  client_id: number | null;
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
  id: number;
}
interface CampaignListResponse {
  status: number | null;
  campaigns: CampaignListType[] | null;
  current_page: number | null;
  total: number | null;
  totalPages: number | null;
  message: string | null;
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
}
interface CampaignItemListResponse {
  message: string | null;
  status: number | null;
  campaigns: CampaignItemListType[] | null;
  total: number | null;
  totalPages: number | null;
  current_page: number | null;
}
export interface ShowCampaignStore {
  campaignList: CampaignListResponse | null;
  campaignItemList: CampaignItemListResponse | null;
  clickedCampaignId: number | null;
  setCampaignList: (state: CampaignListResponse) => void;
  setCampaignItemList: (state: CampaignItemListResponse) => void;
  setClickedCampaignId: (state: number) => void;
}
