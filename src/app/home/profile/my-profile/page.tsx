"use client";
import React from "react";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import { Storage } from "@/store/store";
import Image from "next/image";
import Images from "@/components/utils/images";

const MyProfile = () => {
  const photo = Storage.getItem("photo");
  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      <div className="h-1/4 dark:bg-dark-glass bg-violet-50 shadow-md dark:border-none border w-full rounded-md flex items-center justify-between gap-4 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="m-0 p-0 xl:text-4xl text-2xl dark:text-slate-300 text-dark-black">
            {Storage.getItem("userName")}
          </h1>
        </div>
        <div className="h-full flex items-center xl:gap-8 gap-4">
          <div className="rounded-full xl:h-32 h-20 xl:w-32 w-20 overflow-hidden">
            <Image
              src={photo !== "" && photo !== null ? photo : Images.User_Icon}
              alt="user"
              width={300 }
              height={300}
            />
          </div>
          <div className="flex flex-col xl:gap-4 gap-2 ">
            <p className="m-0 p-0 text-sm dark:text-slate-300 text-dark-black">
              Upload your photo
            </p>
            <p className="m-0 p-0 text-xs dark:text-slate-300 text-dark-black">
              Photo should be at least 300px by 300px
            </p>
            <button className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm border border-brand-color text-brand-color font-semibold rounded-md">
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex gap-4">
        <AccountDetails />
        <ChangePassword />
        <AccountDetails />
      </div>
    </div>
  );
};
export default MyProfile;
