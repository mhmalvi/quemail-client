
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
  totalPages: number | null;
  setAllContactList: (contactData: [ContactType] | null) => void;

  setCsvData: (csvData: any[]) => void;
  setHasData: (state: boolean) => void;
  setGroupData: (data: [string] | null) => void;
  setGroupContacts: (data: [ContactType] | null) => void;
  setTotalPages: (data: number | null) => void;
};

export type CampaignInfoType = {
  subject: string | null | null;
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
} | null;
export type CampaignStoreState = {
  newCampaign: NewCampaignType | null;
  templateData: [TemplateType] | null;
  selectedTemplate: TemplateType | null;
  viewRecipients: boolean;
  setNewCampaign: (
    data:
      | NewCampaignType
      | ((prev: NewCampaignType | null) => NewCampaignType | null)
  ) => void;
  setSelectedTemplate: (data: TemplateType | null) => void;
  setTemplateData: (data: [TemplateType]) => void;
  setViewRecipients: (state: boolean) => void;
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
