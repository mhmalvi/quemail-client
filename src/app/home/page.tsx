"use client";
import React from "react";
import HomeCard from "@/components/HomeLayoutUI/homeCard";
import QuickActions from "@/components/HomeLayoutUI/quickAction";

const Dashboard = () => {
  return (
    <div className="relative w-full h-full dark:bg-dark-glass dark:border-none border bg-[#ffffff40] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <p className="text-sm dark:text-slate-300 text-light-black">
        Recommended next steps based on your profile...
      </p>
      <div className="flex gap-4 h-full">
        <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
          <div className="flex h-full gap-4">
            <HomeCard
              title="Connect your Store"
              subtext="Use your customer data to create more targeted emails"
              footertext="Segment and target customers based on purchase behavior using real-time data from your online store."
            />
            <HomeCard
              title="Create your first email"
              subtext="Design high-performance emails in minutes"
              footertext="Get started with flexible templates, drag-and-drop design tools, and our built-in, expert advice."
            />
          </div>
          <div className="flex h-full gap-4">
            <HomeCard
              title="Connect your Store"
              subtext="Use your customer data to create more targeted emails"
              footertext="Segment and target customers based on purchase behavior using real-time data from your online store."
            />
            {/* <HomeCard
              title="Create your first email"
              subtext="Design high-performance emails in minutes"
              footertext="Get started with flexible templates, drag-and-drop design tools, and our built-in, expert advice."
            /> */}
          </div>
        </div>
        <QuickActions />
      </div>
    </div>
  );
};
export default Dashboard;
