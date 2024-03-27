import React from "react";
import { sectionThreeData, sectionThreePackage } from "../utils/staticData";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-16 items-center justify-center h-screen">
      <h1 className="m-0 p-0 text-4xl text-center flex lg:gap-2 text-slate-300 mt-16">
        Why
        <span className="text-brand-color ml-2"> Quemailer?</span>
      </h1>

      <div className="lg:w-full lg:p-0 px-8 flex flex-wrap lg:gap-4 gap-y-4 justify-between">
        {sectionThreeData.map((items, index) => {
          return (
            <div
              key={index}
              className="flex flex-col lg:gap-2 items-center lg:w-1/5 w-1/2 p-2"
            >
              <h1 className="m-0 p-0 text-3xl font-semibold text-slate-300">
                {items.title}
              </h1>
              <p className="m-0 p-0 lg:text-base text-xs text-center text-slate-300">
                {items.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full lg:p-0 px-8 flex flex-wrap gap-4 justify-between">
        {sectionThreePackage.map((items, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-grow lg:items-end items-center justify-center lg:h-96 h-40 bg-slate-700 animate-pulse rounded-md p-4"
            >
              <button className="px-4 py-2 bg-brand-color rounded-md">
                Get Started
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-full rounded-md px-4 py-2 flex items-center justify-center gap-4 bg-gradient-to-b from-blue-900 to-indigo-900">
        <h1 className="m-0 p-0 lg:text-base text-sm text-slate-300">
          Get connected with our team to get your custom pricing
        </h1>
        <button className="px-4 py-2 bg-yellow-500 rounded-md text-gray-800 lg:text-base text-sm font-semibold">
          Book a demo ➟
        </button>
      </div>
    </div>
  );
};

export default SectionTwo;
