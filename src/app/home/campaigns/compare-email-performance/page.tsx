"use client";
import { useState } from "react";
import Filter from "./Filter";
import CompareBox from "./CompareBox";

const CompareEmailCampaign = () => {

  return (
    <div className="w-full h-full flex justify-center gap-4 dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 overflow-hidden">
      <div className="flex flex-col w-1/4 gap-4">
        <Filter position="left" />
        <CompareBox position="left" />
      </div>

      <div className="w-1/4 h-full flex flex-col justify-end items-center pt-14">
        <div className="w-full h-full flex flex-col justify-center gap-9 items-center border-4 border-transparent">
          <div className="flex flex-row items-center w-full">
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
            <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
              Clicked
            </h1>
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
          </div>
          <div className="flex flex-row items-center w-full">
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
            <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
              Opened
            </h1>
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
          </div>
          <div className="flex flex-row items-center w-full">
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
            <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
              Subscribed
            </h1>
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
          </div>
          <div className="flex flex-row items-center w-full">
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
            <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
              Bounced
            </h1>
            <hr className="flex-grow border-violet-300 dark:border-light-glass border-t-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 gap-4">
        <Filter position={"right"} />
        <CompareBox position="right" />
      </div>
    </div>
  );
};
// 2xl:gap-24 xl:gap-16 gap-8

export default CompareEmailCampaign;
