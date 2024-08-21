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
    <div className="w-full h-full rounded-md flex flex-row gap-4">
      <div className="h-1/4 w-full rounded-md flex items-center justify-between gap-4">
        <div className="h-full w-full flex flex-col items-center justify-center xl:gap-8 gap-4">
          <div className="rounded-full xl:h-5/6 h-5/6 xl:w-32 w-20 overflow-hidden">
            <Image
              src={photo !== "" && photo !== null ? photo : Images.User_Icon}
              alt="user"
              width={300}
              height={300}
            />
          </div>
          <ChangePassword></ChangePassword>
        </div>
      </div>
      <div className="h-full w-full flex gap-4 drop-shadow">
        <AccountDetails />
      </div>
    </div>
  );
};
export default MyProfile;
