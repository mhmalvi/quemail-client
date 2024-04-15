"use client";
import React from "react";
import { Homecard } from "@/components/utils/types";
const QuickActions = () => {
  return (
    <div className="relative xl:w-1/4 w-1/3 bg-background-color rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 text-slate-300">
        Quick actions
      </h1>
      <p className="xl:text-sm text-xs m-0 p-0 text-slate-300">
        Unlock the full potential of Quemailer with our exclusive subscriber
        content.
      </p>
      <button className="px-4 py-2 w-full border border-gray-800/80 xl:text-base text-xs rounded-md">
        Add a subscriber
      </button>
      <p className="xl:text-sm text-xs m-0 p-0 text-slate-300">
        Streamline your contact management process and get started with this
        feature.
      </p>
      <button className="px-4 py-2 w-full border border-gray-800/80 xl:text-base text-xs rounded-md">
        Import Contacts
      </button>
      <p className="xl:text-sm text-xs m-0 p-0 text-slate-300">
        Unlock the power of data-driven decision- making with Custom Reports.
      </p>
      <button className="px-4 py-2 w-full border border-gray-800/80 xl:text-base text-xs rounded-md">
        Create a custom report
      </button>
    </div>
  );
};
export default QuickActions;
