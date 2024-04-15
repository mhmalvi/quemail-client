"use client";
import React from "react";
import HomeCard from "@/components/HomeLayoutUI/homeCard";
import QuickActions from "@/components/HomeLayoutUI/quickAction";

const Dashboard = () => {
  return (
    <div className="relative w-full h-full bg-gray-800/80 rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <p className="text-sm text-slate-300">
        Recommended next steps based on your profile...
      </p>
      <div className="h-full w-full flex flex-grow flex-grow justify-around gap-4">
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
        <QuickActions />
      </div>
      <div className="h-full w-full flex flex-grow flex-grow justify-around gap-4">
        {/* <HomeCard />
        <HomeCard />
        <HomeCard /> */}
      </div>
    </div>
  );
};
export default Dashboard;
