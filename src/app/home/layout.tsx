"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite } from "flowbite-react";
import { useRouter } from "next/navigation";
import { customTheme } from "@/components/utils/utility";
// import { themeStore } from "@/store/store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  // const theme = themeStore((state: any) => state.theme);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const router = useRouter();

  useEffect(() => {
    if (token !== null) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <section
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

export default HomeLayout;
