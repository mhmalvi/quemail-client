export interface DashboardLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}
export interface Homecard {
  title: string;
  subtext: string;
  footertext: string;
}
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
  template: string | null;
};
export type GroupContactType = {
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
  groupData: any[];
  templateData: [TemplateType];
  groupContacts: [GroupContactType] | null;
  setTemplateData: (data: [TemplateType]) => void;
  setCsvData: (csvData: any[]) => void;
  setHasData: (state: boolean) => void;
  setGroupData: (data: any[]) => void;
  setGroupContacts: (data: [GroupContactType] | null) => void;
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
