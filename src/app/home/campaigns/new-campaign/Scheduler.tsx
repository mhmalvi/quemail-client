"use client";
import React, { useState } from "react";
import { Datepicker } from "flowbite-react";
import { campaignStore } from "@/store/store";
import { NewCampaignType } from "@/components/utils/types";
import { sendMail } from "@/app/api/campaign";
const Scheduler = () => {
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const viewSchedule = campaignStore((state) => state.viewSchedule);
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);

  const startCampaign = async () => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const formattedDate = `${date} ${time}`;
    const updatedCampaign: NewCampaignType = {
      ...newCampaign,
      userID: userID ?? null,
      template: newCampaign?.template ?? { name: null, data: null },
      campaignInfo: newCampaign?.campaignInfo ?? null,
      recipient: newCampaign?.recipient ?? null,
      schedule: formattedDate ?? null,
    };

    setNewCampaign(updatedCampaign);

    try {
      const res = await sendMail(updatedCampaign);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localTime = event.target.value;
    const [hours, minutes] = localTime.split(":").map(Number);

    const localDate = new Date();
    localDate.setHours(hours, minutes, 0, 0);

    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();
    const utcSeconds = localDate.getUTCSeconds();

    const utcTime = `${String(utcHours).padStart(2, "0")}:${String(
      utcMinutes
    ).padStart(2, "0")}:${String(utcSeconds).padStart(2, "0")}`;
    setTime(utcTime);
  };
  const handleSetSchedule = () => {
    setShowSchedule(true);
    startCampaign();
  };

  return (
    <div
      className={`${
        viewSchedule ? "content" : "hidden"
      } duration-200 ease-in relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4`}
    >
      <h1 className="xl:text-xl text-xs text-brand-color font-semibold flex items-center gap-4 ">
        Schedule your campaign
        <span className="px-2 py-1 bg-dark-black xl:text-sm text-xs rounded-md text-slate-300">
          Optional
        </span>
      </h1>

      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <div className="w-full flex items-center justify-center">
          <Datepicker
            inline
            showClearButton={false}
            onSelectedDateChanged={(e: any) => {
              let localDate = new Date(
                e.getTime() - e.getTimezoneOffset() * 60000
              );
              let date = localDate.toISOString().split("T");
              setDate(date[0]);
            }}
          />
        </div>

        <form className="w-full shadow-md">
          <input
            type="time"
            id="time"
            className=" rounded-md bg-white border-none text-dark-black leading-none focus:ring-0 focus:border-none block flex-1 w-full xl:text-sm text-xs xl:p-2.5 px-4 py-1 dark:bg-dark-glass dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-0 dark:focus:border-none fill-white"
            min="00:00"
            max="24:00"
            value={time}
            onChange={handleTimeChange}
          />
        </form>
      </div>
      {showSchedule ? (
        <div className="flex flex-col gap-2 xl:p-4 xl:border xl:border-brand-color rounded-md">
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black flex items-center justify-between xl:text-sm text-xs">
            Scheduled Date: <span>{date}</span>
          </h1>
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black flex items-center justify-between xl:text-sm text-xs">
            Scheduled Time: <span>{time}</span>
          </h1>
          <button
            className="w-full xl:px-4 xl:py-2 bg-red-500 rounded-md disabled:cursor-not-allowed disabled:opacity-25"
            disabled={date === ""}
            onClick={() => {
              setTime("00:00");
              setDate("");
              setShowSchedule(false);
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <button
          className="w-full px-2 py-1 xl:text-sm text-xs border border-brand-color text-dark-black dark:text-slate-300 rounded-md disabled:cursor-not-allowed disabled:opacity-25"
          disabled={date === ""}
          onClick={handleSetSchedule}
        >
          Add Schedule
        </button>
      )}
    </div>
  );
};
export default Scheduler;
