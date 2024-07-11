"use client";
import { useState } from "react";
import Filter from "./Filter";
import CompareBox from "./CompareBox";

const CompareEmailCampaign = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const handleFetchCampaign = async (id:any, setData:any) => {
    try {
      const response = await fetch(`https://backend.quemailer.com/campaigns/${id}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center gap-4 dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 overflow-hidden">
      <div className = "flex flex-col w-1/4 gap-4">
          <Filter position="left" />
          <CompareBox position="left" />
      </div>
      <div className="w-1/4 flex flex-col justify-between justify-center items-center pt-32 pb-20">
      <div className="flex flex-row items-center w-full">
        <hr className="flex-grow border-violet-300 border-t-2" />
        <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
          Clicked
        </h1>
        <hr className="flex-grow border-violet-300 border-t-2" />
      </div>

      <div className="flex flex-row items-center w-full">
        <hr className="flex-grow border-violet-300 border-t-2" />
        <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
          Opened
        </h1>
        <hr className="flex-grow border-violet-300 border-t-2" />
      </div>
      <div className="flex flex-row items-center w-full">
        <hr className="flex-grow border-violet-300 border-t-2" />
        <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
          Subscribed
        </h1>
        <hr className="flex-grow border-violet-300 border-t-2" />
      </div>
      <div className="flex flex-row items-center w-full">
        <hr className="flex-grow border-violet-300 border-t-2" />
        <h1 className="px-4 text-xl font-semibold text-dark-black dark:text-slate-300">
          Bounced
        </h1>
        <hr className="flex-grow border-violet-300 border-t-2" />
      </div>
      </div>

      <div className = "flex flex-col w-1/4 gap-4">
          <Filter position={"right"} />
          <CompareBox position="right"/>
      </div>
    </div>
  );
};

export default CompareEmailCampaign;
