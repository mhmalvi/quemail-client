"use client";
import React, { useState } from "react";
import CampaignInfo from "./CampaignInfo";
import RecipientSelection from "./RecipientSelection";
import Scheduler from "./Scheduler";

const NewCampaign = () => {
  return (
    <div className="w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-8 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center rounded-md gap-8">
          <h1 className={`dark:text-slate-300 text-dark-black opacity-20`}>
            Template <span>✔</span>
          </h1>
          <h1 className={`dark:text-slate-300 text-dark-black opacity-20`}>
            Campaign Information <span>✔</span>
          </h1>
          <h1 className={`dark:text-slate-300 text-dark-black opacity-20`}>
            Recipients Selection <span>✔</span>
          </h1>
          <h1 className={`dark:text-slate-300 text-dark-black opacity-20`}>
            Schedule <span>✔</span>
          </h1>
        </div>
        <div className="flex gap-8 items-center">
          <button className="py-2 px-4 rounded-md border border-brand-color duration-300 ease-in animate-bounce hover:animate-none">
            Save & Exit
          </button>
          <button
            className="py-2 px-4 rounded-md bg-brand-color duration-300 ease-in 
            animate-bounce hover:animate-none
            "
          >
            Run campaign Now
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 h-full">
        {/* TOP */}
        <div className="relative h-full w-full flex flex-col py-8 items-center justify-center dark:bg-dark-glass bg-light-glass rounded-md shadow-md border dark:border-none gap-4">
       
          <h1 className="dark:text-slate-300 text-dark-black w-1/2 text-center">
            If you&apos;re looking to launch a new campaign, you can easily
            create one. But you need to set up a template first.
          </h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300 ">
              Select a Template
            </button>
            <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300 ">
              Create a Template
            </button>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex h-full gap-4">
          <CampaignInfo />
          <RecipientSelection />
          <Scheduler />
        </div>
      </div>
    </div>
  );
};
export default NewCampaign;
