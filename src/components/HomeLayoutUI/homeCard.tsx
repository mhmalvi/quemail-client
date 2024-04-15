"use client";
import React from "react";
import { Homecard } from "@/components/utils/types";
const HomeCard = ({ title, subtext, footertext }: Homecard) => {
  return (
    <div className="relative bg-background-color rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 text-slate-300">
        {title}
      </h1>
      <p className="xl:text-base text-xs m-0 p-0 text-slate-300">
        {subtext}
      </p>
      <div className="w-full h-1/2 bg-gray-800/80 rounded-md"></div>
      <p className="xl:text-sm text-xs m-0 p-0 text-slate-300">
        {footertext}
      </p>
    </div>
  );
};
export default HomeCard;
