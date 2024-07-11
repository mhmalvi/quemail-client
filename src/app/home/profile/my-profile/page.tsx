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
    <div className="relative w-full h-full rounded-md flex flex-row gap-4 overflow-hidden">
      <div className="h-1/4 w-full rounded-md flex items-center justify-between gap-4 p-8">
        <div className="h-full flex flex-col items-center justify-center xl:gap-8 gap-4 ml-14 mt-6">
          <div className="rounded-full xl:h-32 h-20 xl:w-32 w-20 overflow-hidden">
            <Image
              src={photo !== "" && photo !== null ? photo : Images.User_Icon}
              alt="user"
              width={300}
              height={300}
            />
          </div>
          <button className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm border border-brand-color text-brand-color font-semibold rounded-md">
            Upload
          </button>
        </div>
      </div>
      <div className="h-full w-full flex gap-4 drop-shadow m-6">
        <AccountDetails />
      </div>
    </div>
  );
};
export default MyProfile;
