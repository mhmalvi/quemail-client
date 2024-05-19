"use client";
import React, { useState } from "react";

const CampaignInfo = () => {
  return (
    <div className="relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-light-glass rounded-md shadow-md border dark:border-none gap-4">
      <h1 className="text-2xl text-brand-color font-semibold">
        Campaign Information
      </h1>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black">
          Subject Line
        </label>
        <input
          placeholder="What is the subject?"
          className="w-full px-4 py-2 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
        />
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black">From Name</label>
        <input
          placeholder="Who is sending?"
          className="w-full px-4 py-2 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
        />
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black">From Mail</label>
        <input
          placeholder="From which mail?"
          className="w-full px-4 py-2 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
        />
      </div>
    </div>
  );
};
export default CampaignInfo;
