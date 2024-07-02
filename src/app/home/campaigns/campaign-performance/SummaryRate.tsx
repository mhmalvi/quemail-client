"use client";
import React from "react";

const SummaryRate = () => {
  return (
    <div className="relative w-full h-full flex gap-8 overflow-hidden">
      <div className="flex bg-violet-100 dark:bg-dark-black shadow-md rounded-2xl w-1/3 h-full overflow-hidden">
        <div className="w-2/3 h-full flex flex-col items-start justify-between xl:gap-4 gap-2 p-4">
          <div className="h-full w-full">
            <h1 className="xl:text-3xl text-xl text-dark-black dark:text-slate-300 font-semibold">
              Clicks
            </h1>
            <p className="xl:text-base text-sm text-dark-black dark:text-slate-300">
              40 Clicked
            </p>
          </div>
          <div className="flex items-center justify-center bg-brand-color/20 border-2 border-brand-color h-1/2 rounded-md p-2">
            <p className="xl:text-2xl text-base -rotate-45 text-brand-color">
              →
            </p>
            <p className="xl:text-2xl text-base text-brand-color">0.3%</p>
          </div>
        </div>
        <div className="relative w-2/3 flex flex-col items-end">
          <h1 className="xl:text-8xl text-5xl text-dark-black dark:text-slate-300 font-semibold px-4 py-2 z-20">
            90%
          </h1>
          <div className="absolute bottom-0 px-4 flex items-end xl:gap-4 gap-2 z-10">
            <div className="xl:w-10 xl:h-10 w-8 h-8 bg-gradient-to-r from-brand-color to-brand-color-2 bottom-0 rounded-t-full"></div>
            <div className="xl:w-10 xl:h-16 w-8 h-12 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-t-full"></div>
            <div className="xl:w-10 xl:h-20 w-8 h-16 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-t-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryRate;
