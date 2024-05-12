"use client";
export interface DashboardLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}
export interface Homecard {
  title: string;
  subtext: string;
  footertext: string;
}

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
