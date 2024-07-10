"use client";
import { useState } from "react";
import Filter from "./Filter";

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
      <div className="w-1/3">
        <Filter />
      </div>
      <div className="w-1/3">
        
      </div>
      <div className="w-1/3">
        <Filter />
      </div>

    </div>
  );
};

export default CompareEmailCampaign;
