"use client";

import React from "react";
import HomeCard from "@/app/home/HomeLayoutUI/homeCard";
import QuickActions from "@/app/home/HomeLayoutUI/quickAction";
const Home = () => {
  return (
    <div className="relative w-full h-full dark:bg-dark-glass dark:border-none border bg-[#ffffff40] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-4 h-full ">
        <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
          <div className="flex h-full gap-4">
            <HomeCard />
            {/* <HomeCard /> */}
          </div>
          <div className="flex h-full gap-4">
            {/* <HomeCard />
            <HomeCard /> */}
          </div>
        </div>
        <QuickActions />
      </div>
    </div>
  );
};
export default Home;
