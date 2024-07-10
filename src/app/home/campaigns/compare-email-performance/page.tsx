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
      <div className = "flex flex-col w-1/4">
          <Filter position={"left"} />
          <CompareBox />
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center pt-16">
        <h1 className="h-1/6 p-0 m-0 text-xl font-semibold text-dark-black dark:text-slate-300 flex">
          Clicked
        </h1>
        <h1 className="h-1/6 p-0 m-0 text-xl font-semibold text-dark-black dark:text-slate-300 flex">
          Opened
        </h1>
        <h1 className="h-1/6 p-0 m-0 text-xl font-semibold text-dark-black dark:text-slate-300 flex">
          Subscribed
        </h1>
        <h1 className="h-1/6 p-0 m-0 text-xl font-semibold text-dark-black dark:text-slate-300 flex">
          Bounced
        </h1>
      </div>

      <div className = "flex flex-col w-1/4">
          <Filter position={"right"} />
          <CompareBox />
      </div>
    </div>
  );
};

export default CompareEmailCampaign;
