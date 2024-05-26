"use client";
import React, { useState } from "react";

const ChangePassword = () => {
  const [changeClicked, setChangeClicked] = useState(false);
  return (
    <div className="relative w-full h-full dark:bg-dark-glass bg-violet-50 dark:border-none border shadow-md rounded-md xl:p-4 flex flex-col items-center justify-center xl:gap-4 gap-0 overflow-hidden">
      {changeClicked ? (
        <form className="flex flex-col w-full p-4 xl:gap-4 gap-2">
          <div className="flex flex-col">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Current Password
            </label>
            <input className="dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          <div className="flex flex-col">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              New Password
            </label>
            <input className="dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          <div className="flex flex-col">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Retype New Password
            </label>
            <input className="dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          {changeClicked && (
            <div className=" flex items-center justify-end gap-4">
              <button className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-brand-color rounded-md text-slate-300">
                Save
              </button>
              <button
                onClick={() => {
                  setChangeClicked(false);
                }}
                className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-red-500 rounded-md text-slate-50"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      ) : (
        <button
          onClick={() => {
            setChangeClicked(true);
          }}
          className="xl:px-4 xl:py-2  px-2 py-1 xl:text-base text-sm bg-brand-color rounded-md"
        >
          Change Password
        </button>
      )}
    </div>
  );
};
export default ChangePassword;
