"use client";

import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React from "react";

const PricingPlans = () => {
  return (
    <div className={CONTAINER_STYLES}>
      <div className="bg-violet-50 hover:bg-violet-200 dark:hover:bg-light-glass duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full w-1/4 rounded-md flex flex-col items-center p-4">
        <h1 className="h-1/6 p-0 m-0 text-4xl font-semibold text-dark-black dark:text-slate-300 flex items-center">
          Free
        </h1>
        <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center">
          <div className="h-2/6 w-full overflow-hidden flex flex-col items-center justify-center">
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              from
            </p>
            <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
              $0
            </h1>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              per month, paid yearly
            </p>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              1 Users
            </p>
          </div>
          <div className="h-1/6 w-full py-4">
            <button
              disabled
              className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-brand-color rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-slate-300"
            >
              Current Plan
            </button>
          </div>
          <div className="h-3/6 w-full overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-50 hover:bg-violet-200 dark:hover:bg-light-glass duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full w-1/4 rounded-md flex flex-col items-center p-4">
        <h1 className="h-1/6 p-0 m-0 text-4xl font-semibold text-dark-black dark:text-slate-300 flex items-center">
          Basic
        </h1>
        <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center">
          <div className="h-2/6 w-full overflow-hidden flex flex-col items-center justify-center">
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              from
            </p>
            <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
              $300
            </h1>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              per month, paid yearly
            </p>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              1 Users
            </p>
          </div>
          <div className="h-1/6 w-full py-4">
            <button className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-brand-color rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-slate-300">
              Choose Basic
            </button>
          </div>
          <div className="h-3/6 w-full overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-50 hover:bg-violet-200 dark:hover:bg-light-glass duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full w-1/4 rounded-md flex flex-col items-center p-4">
        <h1 className="h-1/6 p-0 m-0 text-4xl font-semibold text-dark-black dark:text-slate-300 flex items-center">
          Standard
        </h1>
        <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center">
          <div className="h-2/6 w-full overflow-hidden flex flex-col items-center justify-center">
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              from
            </p>
            <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
              $700
            </h1>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              per month, paid yearly
            </p>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              1 Users
            </p>
          </div>
          <div className="h-1/6 w-full py-4">
            <button className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-brand-color rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-slate-300">
              Choose Standard
            </button>
          </div>
          <div className="h-3/6 w-full overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-50 hover:bg-violet-200 dark:hover:bg-light-glass duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full w-1/4 rounded-md flex flex-col items-center p-4">
        <h1 className="h-1/6 p-0 m-0 text-4xl font-semibold text-dark-black dark:text-slate-300 flex items-center">
          Premium
        </h1>
        <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center">
          <div className="h-2/6 w-full overflow-hidden flex flex-col items-center justify-center">
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              from
            </p>
            <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
              $1500
            </h1>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              per month, paid yearly
            </p>
            <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
              1 Users
            </p>
          </div>
          <div className="h-1/6 w-full py-4">
            <button className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-brand-color rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-slate-300">
              Choose Premium
            </button>
          </div>
          <div className="h-3/6 w-full overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
              <h1 className="flex gap-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                <span className="text-brand-color">✔</span>Email Marketing &
                Automation
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
