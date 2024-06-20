"use client";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React from "react";

const AllCampaigns = () => {
  return (
    <div className={CONTAINER_STYLES}>
      <div className="relative w-full h-full dark:bg-dark-glass bg-light-glass rounded-md p-4 flex flex-col gap-8 overflow-hidden"></div>
      <div className="relative w-full h-full dark:bg-dark-glass bg-light-glass rounded-md p-4 flex flex-col gap-8 overflow-hidden"></div>
    </div>
  );
};
export default AllCampaigns;
