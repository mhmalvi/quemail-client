"use client";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect, useState } from "react";
import CampaignList from "./CampaignList";
import CampaignItems from "./CampaignItems";
import { showCampaignStore } from "@/store/store";

const AllCampaigns = () => {
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );
  const [campaignDetails, setCampaignDetails] = useState<{
    campaignName: string;
    senderName: string;
    senderEmail: string;
    count: number;
  } | null>(null);
  return (
    <div className={CONTAINER_STYLES}>
      <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
        {clickedCampaignId !== null ? (
          <CampaignItems/>
        ) : (
          <CampaignList/>
        )}
      </div>
    </div>
  );
};
export default AllCampaigns;
