"use client";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect, useState } from "react";
import CampaignList from "./CampaignList";
import CampaignItems from "./CampaignItems";

const AllCampaigns = () => {
  return (
    <div className={CONTAINER_STYLES}>
      <div className="relative w-1/3 h-full rounded-md flex flex-col gap-4 overflow-hidden">
        <CampaignList />
      </div>
      <div className="relative w-2/3 h-full dark:bg-dark-glass bg-violet-50 rounded-md p-4 flex flex-col gap-8 overflow-hidden">
        <CampaignItems />
      </div>
    </div>
  );
};
export default AllCampaigns;
