"use client";
import React, { useState } from "react";
import { Datepicker } from "flowbite-react";
import { campaignStore } from "@/store/store";
const Scheduler = () => {
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const viewSchedule = campaignStore((state) => state.viewSchedule);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleSetSchedule = () => {
    setShowSchedule(true);
  };
  return (
    <div
      className={`${
        viewSchedule ? "content" : "hidden"
      } duration-200 ease-in relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4`}
    >
      <h1 className="xl:text-xl text-sm text-brand-color font-semibold flex items-center gap-4 ">
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
              let date = e.toISOString().split("T");
              setDate(date[0]);
            }}
          />
        </div>

        <form className="w-full shadow-md">
          <div className="flex">
            <input
              type="time"
              id="time"
              className=" rounded-md bg-white border-none text-dark-black leading-none focus:ring-0 focus:border-none block flex-1 w-full text-sm p-2.5 dark:bg-dark-glass dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-0 dark:focus:border-none fill-white"
              min="00:00"
              max="24:00"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
        </form>
      </div>
      {showSchedule ? (
        <div className="flex flex-col gap-4 p-4 border border-brand-color rounded-md">
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black flex items-center justify-between text-sm">
            Scheduled Date: <span>{date}</span>
          </h1>
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black flex items-center justify-between text-sm">
            Scheduled Time: <span>{time}</span>
          </h1>
          <button
            className="w-full px-4 py-2 bg-red-500 rounded-md disabled:cursor-not-allowed disabled:opacity-25"
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
          className="w-full px-2 py-1 text-sm border border-brand-color rounded-md disabled:cursor-not-allowed disabled:opacity-25"
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
