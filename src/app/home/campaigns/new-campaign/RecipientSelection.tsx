"use client";
import React, { useState } from "react";

const RecipientSelection = () => {
  return (
    <div className="relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-light-glass rounded-md shadow-md border dark:border-none gap-4">
      <h1 className="text-2xl text-brand-color font-semibold">
        Recipient Selection
      </h1>
      <p className="m-0 p-0 dark:text-slate-300 text-dark-black font-semibold">
        Who are you sending this campaign to?
      </p>
      <div className="flex flex-col gap-4">
        <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300 ">
          Select from all contacts
        </button>
        <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300 ">
          Select from groups
        </button>
      </div>
    </div>
  );
};
export default RecipientSelection;
