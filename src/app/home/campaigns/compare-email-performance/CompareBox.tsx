"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import { FilterProps } from "@/components/utils/types";
import { compareCampaignStore } from "@/store/store";

const CompareBox: React.FC<FilterProps> = ({ position }) => {
  const leftCampaignDetails = compareCampaignStore(
    (state) => state.campaignDetails1
  );
  const rightCampaignDetails = compareCampaignStore(
    (state) => state.campaignDetails2
  );

  const winnerCampaign = compareCampaignStore(
    (state) => state.winnerCampaign
  );

  const [state, setState] = useState<any>(null);

  useEffect(() => {
    if (position === "left") {
      setState(leftCampaignDetails);
    } else if (position === "right") {
      setState(rightCampaignDetails);
    }
  }, [position, leftCampaignDetails, rightCampaignDetails]);

  const getTextColor = (field: "open" | "subscribed" | "bounce") => {
    if (!leftCampaignDetails || !rightCampaignDetails)
      return "text-dark-black dark:text-slate-300";
    const leftValue = leftCampaignDetails[field];
    const rightValue = rightCampaignDetails[field];

    if (field === "bounce" && leftValue != null && rightValue != null) {
      if (leftValue < rightValue) {
        return state === leftCampaignDetails
          ? "text-green-500 dark:text-green-800"
          : "text-red-500 dark:text-red-800";
      } else if (leftValue > rightValue) {
        return state === rightCampaignDetails
          ? "text-green-500 dark:text-green-800"
          : "text-red-500 dark:text-red-800";
      }
    }

    if (field != "bounce" && leftValue !== null && rightValue !== null) {
      if (leftValue > rightValue) {
        return state === leftCampaignDetails
          ? "text-green-500 dark:text-green-800"
          : "text-red-500 dark:text-red-800";
      } else if (leftValue < rightValue) {
        return state === rightCampaignDetails
          ? "text-green-500 dark:text-green-800"
          : "text-red-500 dark:text-red-800";
      }
    }
    return "text-dark-black dark:text-slate-300";
  };

  const winnerDiv = () => {
    if ( position === "left" && winnerCampaign === "left"){
        return "bg-green-200 dark:bg-green-200/70"
    }
    if ( position === "left" && winnerCampaign === "right"){
        return "bg-red-200 dark:bg-red-200/70"
    }
    if ( position === "right" && winnerCampaign === "right"){
        return "bg-green-200 dark:bg-green-200/70 "
    }
    if ( position === "right" && winnerCampaign === "left"){
        return "bg-red-200 dark:bg-red-200/70"
    }
    return "bg-violet-200 dark:bg-dark-black"
  }

  return (
    <div
      className={`duration-100 ease-in-out border border-violet-200 dark:border-light-glass h-full rounded-md flex flex-col items-center justify-center p-4 ${winnerDiv()}`}
    >
      <div className="h-full m-5 w-full p-4 rounded-md flex flex-col items-center gap-4">
        <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center">
          <Tooltip content="Hovered over" className="bg-brand-color">
            <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
              33
            </h1>
          </Tooltip>
        </div>
        <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center">
          <Tooltip content="Hovered over" className="bg-brand-color">
            <h1 className={`text-4xl font-semibold ${getTextColor("open")}`}>
              {state?.open}
            </h1>
          </Tooltip>
        </div>
        <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center">
          <Tooltip content="Hovered over" className="bg-brand-color">
            <h1
              className={`text-4xl font-semibold ${getTextColor("subscribed")}`}
            >
              {state?.subscribed}
            </h1>
          </Tooltip>
        </div>
        <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center">
          <Tooltip content="Hovered over" className="bg-brand-color">
            <h1 className={`text-4xl font-semibold ${getTextColor("bounce")}`}>
              {state?.bounce}
            </h1>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CompareBox;
