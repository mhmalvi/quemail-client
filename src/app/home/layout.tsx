"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { customTheme } from "@/components/utils/utility";
import { Storage } from "@/store/store";
// import { themeStore } from "@/store/store";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Storage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="bg-black w-full h-screen flex flex-col items-center justify-center">
        <Spinner color="purple" aria-label="Purple spinner example" size="xl" />
      </div>
    );
  }

  return isAuthenticated ? (
    <Flowbite theme={{ theme: customTheme }}>
      <section
        className={`flex h-screen w-full dark:bg-dark-black bg-violet-50 bg-cover bg-center	`}
      >
        <Sidebar />
        <div className="flex sm:hidden h-screen w-full items-center justify-center ">
          Please use a desktop or pc to use the features.
        </div>
        <div
          className={`hidden relative p-4 sm:flex flex-col gap-4 w-full overflow-hidden`}
        >
          <Topnav />
          {children}
        </div>
      </section>
    </Flowbite>
  ) : null;
};

export default HomeLayout;
