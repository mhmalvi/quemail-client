"use client";

import React from "react";
import HomeCard from "@/app/home/HomeLayoutUI/homeCard";
import QuickActions from "@/app/home/HomeLayoutUI/quickAction";
import Summary from "./HomeLayoutUI/Summary";
const Home = () => {
  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-4 h-full ">
        <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
          <div className="flex h-1/2 gap-4">
            <HomeCard />
          </div>
          <div className="flex h-1/2 gap-4">
            <Summary/>
          </div>
        </div>
        <QuickActions />
      </div>
    </div>
  );
};
export default Home;
