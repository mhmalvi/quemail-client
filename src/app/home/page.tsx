"use client";

import React, { useState } from "react";
import HomeCard from "@/app/home/HomeLayoutUI/homeCard";
import CardResources from "./billing/billing-components/CardResources";
import QuickActions from "@/app/home/HomeLayoutUI/quickAction";
import Summary from "./HomeLayoutUI/Summary";
import { useTourStore } from "@/store/store";
import { tourSteps } from "@/components/utils/tourSteps";
import dynamic from "next/dynamic";
const Home = () => {
  const Tour = dynamic(() => import("reactour"), {
    ssr: false,
  });
  const isTourGoing = useTourStore((state) => state.isTourGoing);
  const setIsTourGoing = useTourStore((state) => state.setIsTourGoing);

  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-col gap-4 h-full ">
        <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
          <div className="home-card-element flex h-full gap-4">
            <div className="w-1/2">
              <HomeCard />
            </div>
            <div className="w-1/2">
              <CardResources />
            </div>
          </div>
        </div>
        <QuickActions />
      </div>
      {typeof window !== undefined && (
        <Tour
          steps={tourSteps}
          isOpen={isTourGoing}
          rounded={5}
          accentColor="#6D53FF"
          onRequestClose={() => setIsTourGoing(false)}
          className="bg-orange-300"
        />
      )}
    </div>
  );
};
export default Home;
