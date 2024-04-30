import { JWT } from "next-auth/jwt";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}
export interface Homecard {
  title: string;
  subtext: string;
  footertext: string;
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
  token: JWT | null | undefined;
}
