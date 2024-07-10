"use client";
import { useState } from "react";
import SummaryRate from "./SummaryRate";
import CampaignPerformanceList from "./CampaignPerformanceList";

import { showCampaignStore } from "@/store/store";

const CampaignItems = () => {
  const [scale, setScale] = useState(1);
  const setCampaignItemList = showCampaignStore(
    (state) => state.setCampaignItemList
  );
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );

  const campaignDetails = showCampaignStore((state) => state.campaignDetails);

  return (
    <div className="h-full flex flex-col gap-2">
        <div className=" flex items-center justify-between gap-4 text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
          <div className="flex items-center gap-4 xl:w-1/2 w-1/3">
            <button
              onClick={() => {
                setClickedCampaignId(null);
                setCampaignItemList(null);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-md text-dark-black bg-violet-200 dark:bg-brand-color dark:text-slate-300 font-semibold"
            >
              &lt;
            </button>
            <h1 className="text-dark-black dark:text-slate-300 xl:text-sm text-xs">
              Campaign name:{" "}
              <span className="text-green-500 font-semibold">
                {campaignDetails?.campaignName}
              </span>
            </h1>
            <button className="w-1/8 h-full flex flex-col justify-center 2xl:p-2 py-1 px-2 rounded-md xl:text-sm text-xs text-slate-300 border border-slate-300 hover:bg-dark-black bg-transparent duration-100 ease-in-out">
              Compare Performance
            </button>
          </div>
          <h1 className="xl:text-sm text-xs m-0 px-2">
            Sender Name:{" "}
            <span className="text-green-500 font-semibold">
              {campaignDetails?.senderName}
            </span>
          </h1>
          <h1 className="xl:text-sm text-xs m-0 px-2">
            Sender Email:{" "}
            <span className="text-green-500 font-semibold">
              {campaignDetails?.senderEmail}
            </span>
          </h1>
          <div className="w-1/8 h-full flex flex-col justify-center p-2 rounded-md">
            <h1 className="xl:text-sm text-xs">
              Total Recipients:{" "}
              <span className="text-green-500 font-semibold">
                {campaignDetails?.count}
              </span>
            </h1>
          </div>
        </div>
        <div className="h-1/4 z-10">
          <SummaryRate />
        </div>
        <div className="h-3/4">
          <CampaignPerformanceList />
        </div>
    </div>
  );
};

export default CampaignItems;
