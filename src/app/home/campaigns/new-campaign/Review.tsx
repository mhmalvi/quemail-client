"use client";

import { campaignStore } from "@/store/store";
import React from "react";

const Review = ({ tabsRef }: any) => {
  const newCampaign = campaignStore((state) => state.newCampaign);

  return (
    <div className="w-full flex gap-4 h-[72vh] xl:h-[80vh]">
      <div className="flex flex-col h-full gap-4 w-1/2">
        <div className="h-1/2 flex flex-col gap-4 w-full bg-white shadow-md dark:bg-dark-black border dark:border-light-glass px-4 rounded-md overflow-auto">
          <h1 className="m-0 py-2 xl:text-xl text-base border-b text-brand-color ">
            Campaign Info
          </h1>
          <p className="m-0 p-0 xl:text-base text-xs text-dark-black dark:text-slate-300">
            Campaign Name: {newCampaign?.campaignInfo?.campaignName}
          </p>
          <p className="m-0 p-0 xl:text-base text-xs text-dark-black dark:text-slate-300">
            Sender Email: {newCampaign?.campaignInfo?.fromMail}
          </p>
          <p className="m-0 p-0 xl:text-base text-xs text-dark-black dark:text-slate-300">
            Sender Name: {newCampaign?.campaignInfo?.fromName}
          </p>
          <p className="m-0 p-0 xl:text-base text-xs text-dark-black dark:text-slate-300">
            Subject: {newCampaign?.campaignInfo?.subject}
          </p>
        </div>
        <div className="h-1/2 relative w-full bg-white shadow-md dark:bg-dark-black border dark:border-light-glass rounded-md overflow-hidden">
          <div className="h-full flex flex-col gap-2 w-full px-4 overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-dark-black flex flex-col gap-4">
              <h1 className="m-0 pt-2 xl:text-xl text-base text-brand-color top-0 bg-white dark:bg-dark-black">
                Recipient Info
              </h1>
              <p className=" w-full flex items-center justify-between m-0 p-0 border-b border-light-glass xl:text-base text-xs text-dark-black dark:text-slate-300">
                <span className="w-1/4 text-center">Name</span>
                <span className="w-1/2 text-center">Email</span>
                <span className="w-1/4 text-center">Group</span>
              </p>
            </div>
            {newCampaign?.recipient?.map((items, index) => {
              return (
                <div key={index}>
                  <p className="w-full flex items-center justify-between m-0 p-0 xl:text-base text-xs text-dark-black dark:text-slate-300">
                    <span className="w-1/4 text-center">{items.json.name}</span>
                    <span className="w-1/2 text-center">
                      {items.json.email}
                    </span>
                    <span className="w-1/4 text-center">
                      {items.json.group}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full gap-4 w-1/2 ">
        <div className="h-5/6 flex flex-col gap-4 w-full shadow-md bg-white dark:bg-dark-black border dark:border-light-glass p-2 rounded-md">
          <h1 className="text-brand-color m-0 py-2 xl:text-xl text-base border-b flex items-center justify-between">
            Template Info
            <p className="m-0 p-0 xl:text-base text-xs dark:text-slate-300 text-dark-black">
              Template name: {newCampaign?.template?.name}
            </p>
          </h1>

          <div className="w-full bg-white dark:bg-dark-black rounded-md overflow-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: `${newCampaign?.template?.data}`,
              }}
              className="innerHtml left-0"
            />
          </div>
        </div>
        <div className="h-1/6 flex items-center justify-between w-full gap-4">
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            onClick={() => tabsRef.current.setActiveTab(2)}
          >
            Previous
          </button>
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            disabled={
              newCampaign?.template?.data === null ||
              newCampaign?.template === null ||
              newCampaign?.template?.data === ""
            }
            onClick={() => tabsRef.current.setActiveTab(4)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
