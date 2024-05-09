"use client"
import React from "react";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";

const MyProfile = () => {
  return (
    <div className="relative w-full h-full bg-gray-800/80 rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <div className="h-1/4 w-full bg-background-color rounded-md flex items-center justify-between gap-4 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="m-0 p-0 text-4xl">John Doe</h1>
          <p className="m-0 px-4 py-2 text-base bg-gray-800/80 rounded-md text-center">
            Profile 01
          </p>
        </div>
        <div className="h-full flex items-center gap-8">
          <div className="rounded-full xl:h-32 h-28 xl:w-32 w-28 bg-yellow-500"></div>
          <div className="flex flex-col gap-4">
            <p className="m-0 p-0 text-sm">Upload your photo</p>
            <p className="m-0 p-0 text-xs">
              Photo should be at least 300px by 300px
            </p>
            <button className="px-4 py-2 border border-brand-color text-brand-color rounded-md">
              Upload your photo
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex gap-4">
        <AccountDetails />
        <ChangePassword />
        {/* <AccountDetails /> */}
      </div>
    </div>
  );
};
export default MyProfile;
