import { Progress } from "flowbite-react";
import { useState } from "react";

const CardResources = () => {
  const [progress, setProgress] = useState<number>(50);
  return (
    <div className="step-3 summary-element w-full h-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Current / Remaining Resources
      </h1>
      <div className="h-5/6 flex flex-row justify-center items-center">
        <div className="flex flex-col w-full h-2/3 justify-between">
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Campaigns:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              2/3
            </span>
          </div>
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Contacts:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              255/2000
            </span>

            <Progress progress={progress}></Progress>
          </div>
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Emails:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              267/2000
            </span>
            <Progress progress={progress}></Progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResources;
