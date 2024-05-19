"use client";
import React, { useState } from "react";

const ChangePassword = () => {
  const [changeClicked, setChangeClicked] = useState(false);
  return (
    <div className="relative w-full h-full bg-dark-black rounded-md xl:p-4 flex flex-col items-center justify-center xl:gap-4 gap-0 overflow-hidden">
      {changeClicked ? (
        <form className="flex flex-col w-full p-4 xl:gap-4 gap-2">
          <div className="flex flex-col">
            <label>Current Password</label>
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          <div className="flex flex-col">
            <label>New Password</label>
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          <div className="flex flex-col">
            <label>Retype New Password</label>
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          </div>
          {changeClicked && (
            <div className=" flex items-center justify-end gap-4">
              <button className="px-4 py-2 bg-brand-color rounded-md">
                Save
              </button>
              <button
                onClick={() => {
                  setChangeClicked(false);
                }}
                className="px-4 py-2 border border-brand-color rounded-md"
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
          className="px-4 py-2 bg-brand-color rounded-md"
        >
          Change Password
        </button>
      )}
    </div>
  );
};
export default ChangePassword;
