"use client";
import React, { useState } from "react";

const Scheduler = () => {
  return (
    <div className="relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
      <h1 className="xl:text-xl text-brand-color font-semibold flex items-center gap-2 ">
        Schedule
        <span className="px-2 py-1 bg-dark-black text-sm rounded-md">
          Optional
        </span>
      </h1>
      <p className="m-0 p-0 dark:text-slate-300 text-dark-black text-sm">
        Schedule your campaign to send at a later date and time.
      </p>
      <div className="flex flex-col gap-4">
        <button className="xl:py-2 xl:px-4 py-1 px-2 bg-brand-color rounded-md text-slate-300 ">
          Schedule
        </button>
      </div>
    </div>
  );
};
export default Scheduler;
