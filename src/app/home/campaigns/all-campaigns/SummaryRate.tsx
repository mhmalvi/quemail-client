"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const SummaryRate = () => {
  const [hovered, setHovered] = useState("");
  return (
    <div className="relative w-full h-full flex gap-8 overflow-hidden">
      <div
        onMouseOver={() => {
          setHovered("Clicked");
        }}
        onMouseOut={() => {
          setHovered("");
        }}
        className="flex bg-violet-100 dark:bg-dark-black border border-violet-200 dark:border-light-glass  rounded-2xl w-1/3 h-full overflow-hidden"
      >
        <div className="w-2/3 h-full flex flex-col items-start justify-between xl:gap-4 gap-2 p-4">
          <div className="h-full w-full">
            <h1 className="text-xl text-brand-color font-semibold">Clicks</h1>
            <p className="xl:text-base text-sm text-dark-black dark:text-slate-300">
              40 Clicked
            </p>
          </div>
          <div className="flex items-center justify-center bg-brand-color/20 border-2 border-brand-color h-1/2 rounded-md p-2">
            <p className="2xl:text-2xl text-base -rotate-45 text-brand-color">
              →
            </p>
            <p className="2xl:text-2xl text-base text-brand-color">0.3%</p>
          </div>
        </div>
        <div className="relative w-2/3 flex flex-col items-end">
          <h1 className="2xl:text-7xl xl:text-5xl text-4xl text-dark-black dark:text-slate-300 font-semibold px-4 py-2 z-20">
            90%
          </h1>
          <div className="absolute bottom-0 px-4 flex items-end xl:gap-4 gap-2 z-10">
            <div
              className={`${
                hovered === "Clicked" && "animate-up"
              } translate-y-8 xl:w-10 xl:h-20 w-8 h-16 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-t-full`}
            ></div>
            <div
              className={`${
                hovered === "Clicked" && "animate-up1"
              } translate-y-4 xl:w-10 xl:h-20 w-8 h-16 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-t-full`}
            ></div>
            <div
              className={`${
                hovered === "Clicked" && "animate-up2"
              } xl:w-10 xl:h-20 w-8 h-16 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-t-full`}
            ></div>
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => {
          setHovered("Delivered");
        }}
        onMouseOut={() => {
          setHovered("");
        }}
        className="flex bg-violet-100 dark:bg-dark-black border border-violet-200 dark:border-light-glass  rounded-2xl w-1/3 h-full overflow-hidden"
      >
        <div className="w-2/3 h-full flex flex-col items-start justify-between xl:gap-4 gap-2 p-4">
          <div className="h-full w-full">
            <h1 className="text-xl text-brand-color font-semibold">
              Delivered
            </h1>
            <p className="xl:text-base text-sm text-dark-black dark:text-slate-300">
              40 Clicked
            </p>
          </div>
          <div className="flex items-center justify-center bg-brand-color/20 border-2 border-brand-color h-1/2 rounded-md p-2">
            <p className="2xl:text-2xl text-base -rotate-45 text-brand-color">
              →
            </p>
            <p className="2xl:text-2xl text-base text-brand-color">0.3%</p>
          </div>
        </div>
        <div className="relative w-2/3 flex flex-col items-end">
          <h1 className="2xl:text-7xl xl:text-5xl text-4xl text-dark-black dark:text-slate-300 font-semibold px-4 py-2 z-20">
            90%
          </h1>
          <div className="absolute bottom-0 px-4 flex items-end xl:gap-4 gap-2 z-10">
            <div className="p-2">
              <div className="xl:text-5xl text-2xl bg-gradient-to-r from-brand-color to-brand-color-2 p-4 rounded-full overflow-hidden">
                <FaPaperPlane
                  className={`${
                    hovered === "Delivered" &&
                    "duration-400 ease-in animate-moveRight"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => {
          setHovered("Unsubscribed");
        }}
        onMouseOut={() => {
          setHovered("");
        }}
        className="flex bg-violet-100 dark:bg-dark-black border border-violet-200 dark:border-light-glass  rounded-2xl w-1/3 h-full overflow-hidden"
      >
        <div className="w-2/3 h-full flex flex-col items-start justify-between xl:gap-4 gap-2 p-4">
          <div className="h-full w-full">
            <h1 className="text-xl text-brand-color font-semibold">
              Unsubscribed
            </h1>
            <p className="xl:text-base text-sm text-dark-black dark:text-slate-300">
              40 Clicked
            </p>
          </div>
          <div className="flex items-center justify-center bg-red-500/20 border-2 border-red-500 h-1/2 rounded-md p-2">
            <p className="2xl:text-2xl text-base rotate-45 text-red-500">→</p>
            <p className="2xl:text-2xl text-base text-red-500">0.3%</p>
          </div>
        </div>
        <div className="relative w-2/3 flex flex-col items-end">
          <h1 className="2xl:text-7xl xl:text-5xl text-4xl text-dark-black dark:text-slate-300 font-semibold px-4 py-2 z-20">
            10%
          </h1>
          <div className="absolute bottom-0 px-4 flex items-end xl:gap-4 gap-2 z-10">
            <div className="p-2">
              <div className="xl:w-20 xl:h-20 w-16 h-16 xl:text-5xl text-2xl bg-gradient-to-r from-brand-color to-brand-color-2 p-4 rounded-full overflow-hidden flex flex-col items-center justify-center gap-4">
                <div className="flex w-full  xl:gap-4 relative">
                  <div className="h-4 w-1/2 relative left-0 bottom-0">
                    <div
                      className={`relative bottom-0 w-4 h-4 rounded-full border bg-gradient-to-r from-brand-color to-brand-color-2 flex items-end justify-center overflow-hidden `}
                    >
                      <div
                        className={`absolute  bottom-0 w-4 h-4 rounded-full bg-white flex items-end justify-center overflow-hidden ${
                          hovered === "Unsubscribed" && "animate-closeEyes"
                        } `}
                      >
                        <div className="w-2 h-2 rounded-full bg-dark-black "></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-4 w-1/2 relative right-0 bottom-0">
                    <div
                      className={`relative bottom-0 w-4 h-4 rounded-full border bg-gradient-to-r from-brand-color to-brand-color-2 flex items-end justify-center overflow-hidden `}
                    >
                      <div
                        className={`absolute  bottom-0 w-4 h-4 rounded-full bg-white flex items-end justify-center overflow-hidden ${
                          hovered === "Unsubscribed" && "animate-closeEyes"
                        } `}
                      >
                        <div className="w-2 h-2 rounded-full bg-dark-black "></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="origin-center w-1/2 h-8 rounded-full xl:border-t-4 border-t-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => {
          setHovered("Opened");
        }}
        onMouseOut={() => {
          setHovered("");
        }}
        className="flex bg-violet-100 dark:bg-dark-black border border-violet-200 dark:border-light-glass  rounded-2xl w-1/3 h-full overflow-hidden"
      >
        <div className="w-2/3 h-full flex flex-col items-start justify-between xl:gap-4 gap-2 p-4">
          <div className="h-full w-full">
            <h1 className="text-xl text-brand-color font-semibold">Opened</h1>
            <p className="xl:text-base text-sm text-dark-black dark:text-slate-300">
              40 Clicked
            </p>
          </div>
          <div className="flex items-center justify-center bg-red-500/20 border-2 border-red-500 h-1/2 rounded-md p-2">
            <p className="2xl:text-2xl text-base rotate-45 text-red-500">→</p>
            <p className="2xl:text-2xl text-base text-red-500">0.3%</p>
          </div>
        </div>
        <div className="relative w-2/3 flex flex-col items-end">
          <h1 className="2xl:text-7xl xl:text-5xl text-4xl text-dark-black dark:text-slate-300 font-semibold px-4 py-2 z-20">
            10%
          </h1>
          <div className="absolute bottom-0 px-4 flex items-end xl:gap-4 gap-2 z-10">
            <div className="p-2">
              <div className="relative xl:w-20 xl:h-20 w-16 h-16 xl:text-5xl text-2xl bg-gradient-to-r from-brand-color to-brand-color-2 p-4 rounded-full overflow-hidden flex items-center justify-center">
                <div className="h-full w-full relative">
                  <div
                    className={`absolute ${
                      hovered === "Opened"
                        ? "left-0 skew-y-6 w-1/2 bg-brand-color"
                        : "bg-white xl:left-5 left-3 w-2"
                    } border h-full rounded  duration-200 ease-in-out`}
                  ></div>
                  <div
                    className={`absolute ${
                      hovered === "Opened"
                        ? "right-0 -skew-y-6 w-1/2 bg-brand-color"
                        : "bg-white xl:right-5 right-3 w-2"
                    } border h-full rounded  duration-200 ease-in-out`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryRate;
