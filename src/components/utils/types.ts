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
