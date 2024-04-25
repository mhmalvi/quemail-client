"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite } from "flowbite-react";
import Images from "@/components/utils/images";
import { themeStore } from "@/store/store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = themeStore((state: any) => state.theme);
  return (
    <Flowbite>
      <section
        // className={`flex h-screen w-full bg-brand-color bg-cover bg-center	`}
        className={`flex h-screen w-full dark:bg-[url("/Themes/Dark/1.svg")] bg-[url("/Themes/Light/1.svg")] bg-cover bg-center	`}
      >
        <Sidebar />
        <div
          className={`relative p-8 flex flex-col gap-4 w-full overflow-hidden`}
        >
          <Topnav />
          {children}
        </div>
      </section>
    </Flowbite>
  );
};

export default DashboardLayout;
