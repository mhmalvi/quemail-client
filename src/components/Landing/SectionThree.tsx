"use client";
import React from "react";
import { sectionThreeData, sectionThreePackage } from "../utils/staticData";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-16 items-center justify-center h-full ">
      <h1 className="m-0 px-0 xl:text-4xl text-3xl text-center flex gap-2 text-slate-300 xl:mt-8 mt-16">
        Why choose
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 m-0 font-semibold xl:text-5xl text-4xl">
          Quemailer?
        </span>
      </h1>
      <p className="m-0 p-0 xl:text-base text-center text-slate-300">
        Quemailer is tailored to meet the needs of businesses of all sizes, from small startups to
        large enterprises. Our platform offers:
      </p>
      <div className="xl:w-full xl:p-0 lg:w-full lg:p-0 px-8 flex flex-wrap xl:gap-4 gap-y-4 justify-center">
        {sectionThreeData.map((items, index) => {
          return (
            <div
              key={index}
              className="flex flex-col xl:gap-2 items-center xl:w-1/2 lg:w-1/5 w-1/2 p-2 border-l-4 border-r-4"
            >
              <h1 className="m-0 p-0 text-3xl font-semibold text-slate-300 text-center">
                {items.title}
              </h1>
              <p className="m-0 p-0 xl:text-base text-xs text-center text-slate-300">
                {items.description}
              </p>
            </div>
          );
        })}
      </div>
      {/* <div className="w-full xl:p-0 px-8 flex flex-wrap gap-4 justify-between">
        {sectionThreePackage.map((items, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-grow xl:items-end items-center justify-center xl:h-96 h-40 bg-slate-700 animate-pulse rounded-md p-4"
            >
              <button className="px-4 py-2 bg-brand-color rounded-md">
                Get Started
              </button>
            </div>
          );
        })}
      </div> */}
      <div className="w-full rounded-md px-4 py-2 flex items-center justify-center gap-4 bg-light-glass">
        <h1 className="m-0 p-0 xl:text-base text-sm text-slate-300">
          Get connected with our team to get your custom pricing
        </h1>
        <button className="px-4 py-2 bg-yellow-300 rounded-md text-gray-800 xl:text-base text-sm font-semibold">
          Book a demo ➟
        </button>
      </div>
    </div>
  );
};

export default SectionTwo;
