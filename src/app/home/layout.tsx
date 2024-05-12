"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite } from "flowbite-react";
import { useRouter } from "next/navigation";
import { customTheme } from "@/components/utils/utility";
import { Storage } from "@/store/store";
// import { themeStore } from "@/store/store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  // const theme = themeStore((state: any) => state.theme);
  const token = typeof window !== "undefined" && Storage.getItem("token");

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      {token ? (
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
      ) : (
        <div className="bg-black w-full h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl text-brand-color font-bold">
            You don&apos;t have authorization to access this page.
          </h1>
          <h2 className="text-2xl text-white font-normal animate-pulse">
            Redirecting you to login page...
          </h2>
        </div>
      )}
    </Flowbite>
  );
};

export default HomeLayout;
