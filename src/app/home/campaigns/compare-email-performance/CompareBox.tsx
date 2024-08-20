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

  const winnerCampaign = compareCampaignStore((state) => state.winnerCampaign);

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
          ? "text-green-500 dark:text-green-500"
          : "text-red-500 dark:text-red-500";
      } else if (leftValue > rightValue) {
        return state === rightCampaignDetails
          ? "text-green-500 dark:text-green-500"
          : "text-red-500 dark:text-red-500";
      }
    }

    if (field != "bounce" && leftValue !== null && rightValue !== null) {
      if (leftValue > rightValue) {
        return state === leftCampaignDetails
          ? "text-green-500 dark:text-green-500"
          : "text-red-500 dark:text-red-500";
      } else if (leftValue < rightValue) {
        return state === rightCampaignDetails
          ? "text-green-500 dark:text-green-500"
          : "text-red-500 dark:text-red-500";
      }
    }
    return "text-dark-black dark:text-slate-300";
  };

  const winnerDiv = () => {
    if (position === "left" && winnerCampaign === "left") {
      return "border-4 border-green-500 dark:border-green-500";
    }
    if (position === "left" && winnerCampaign === "right") {
      return "border-4 border-red-500 dark:border-red-500";
    }
    if (position === "right" && winnerCampaign === "right") {
      return "border-4 border-green-500 dark:border-green-500";
    }
    if (position === "right" && winnerCampaign === "left") {
      return "border-4 border-red-500 dark:border-red-500";
    }
    return "bg-violet-200 dark:bg-light-glass";
  };

  return (
    <div
      className={`duration-100 ease-in-out border h-full rounded-md flex flex-col gap-6 items-center justify-center p-4 ${winnerDiv()}`}
    >
      <div className="flex flex-col gap-6 items-center justify-center pt-4">
        {/* <Tooltip content="Hovered over" className="bg-brand-color">
        <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold p-0 m-0">
          33
        </h1>
      </Tooltip> */}

        <Tooltip content="Hovered over" className="bg-brand-color">
          <h1
            className={`text-4xl font-semibold ${getTextColor("open")} p-0 m-0`}
          >
            {state?.open}
          </h1>
        </Tooltip>

        <Tooltip content="Hovered over" className="bg-brand-color">
          <h1
            className={`text-4xl font-semibold ${getTextColor(
              "subscribed"
            )} p-0 m-0`}
          >
            {state?.subscribed}
          </h1>
        </Tooltip>

        <Tooltip content="Hovered over" className="bg-brand-color">
          <h1
            className={`text-4xl font-semibold ${getTextColor(
              "bounce"
            )} p-0 m-0`}
          >
            {state?.bounce}
          </h1>
        </Tooltip>
      </div>
    </div>
  );
};

export default CompareBox;
