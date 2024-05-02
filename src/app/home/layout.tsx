"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/HomeLayoutUI/sidebar";
import Topnav from "@/components/HomeLayoutUI/topnav";
import { Flowbite } from "flowbite-react";
import { themeStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { googleLoginData } from "@/components/utils/types";
import { googleLogin } from "../api/backend/auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = themeStore((state: any) => state.theme);
  const { data: session, status } = useSession();

  var count = 0;
  useEffect(() => {
    const data: googleLoginData = {
      userName: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
      token: session?.user?.accessToken,
    };
    const sendCredentialsToBackend = async () => {
      try {
        if (count === 0) {
          count++;
        } else if (count === 1) {
          const response = await googleLogin(data);
          console.log(response);
          count++;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    sendCredentialsToBackend();
  }, [
    count,
    session?.user?.accessToken,
    session?.user?.email,
    session?.user?.image,
    session?.user?.name,
  ]);

  if (status !== "authenticated") {
    redirect("/login");
  }

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
