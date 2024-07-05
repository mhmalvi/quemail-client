"use client";

import React, { useState } from "react";
import HomeCard from "@/app/home/HomeLayoutUI/homeCard";
import QuickActions from "@/app/home/HomeLayoutUI/quickAction";
import Summary from "./HomeLayoutUI/Summary";
import Tour from "reactour";
import { useTourStore } from "@/store/store";
import tourSteps from "@/components/utils/tourSteps";

const Home = () => {
  const isTourGoing = useTourStore((state) => state.isTourGoing);
  const setIsTourGoing = useTourStore((state) => state.setIsTourGoing);

  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-4 h-full ">
        <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
          <div className="home-card-element flex h-1/2 gap-4">
            <HomeCard />
          </div>
          <div className="flex h-1/2 gap-4">
            <Summary />
          </div>
        </div>
        <QuickActions />
      </div>
      <Tour
        steps={tourSteps}
        isOpen={isTourGoing}
        rounded={5}
        accentColor="#5F01D1"
        onRequestClose={() => setIsTourGoing(false)}
      />
    </div>
  );
};
export default Home;
