"use client";
import React from "react";
import { Homecard } from "@/components/utils/types";
const HomeCard = ({ title, subtext, footertext }: Homecard) => {
  return (
    <div className="relative dark:bg-dark-glass shadow-md bg-[#ffffffbf] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        {title}
      </h1>
      <p className="xl:text-base text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        {subtext}
      </p>
      <div className="w-full h-1/2 bg-brand-color rounded-md"></div>
      <p className="xl:text-sm text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        {footertext}
      </p>
    </div>
  );
};
export default HomeCard;
