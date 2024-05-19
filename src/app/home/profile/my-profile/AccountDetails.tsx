"use client";
import React, { useState } from "react";

const AccountDetails = () => {
  const [editClicked, setEditClicked] = useState(false);
  return (
    <div className="relative w-full h-full bg-dark-black rounded-md xl:p-4 flex flex-col xl:gap-4 gap-0 overflow-hidden">
      <div className="flex items-center xl:h-20 h-16 justify-between p-4">
        <h1 className="m-0 p-0 text-lg">Account Details</h1>
        {editClicked ? (
          <div className="flex items-center justify-end gap-4">
            <button className="px-4 py-2 bg-brand-color rounded-md">
              Save
            </button>
            <button
              onClick={() => {
                setEditClicked(false);
              }}
              className="px-4 py-2 border border-brand-color rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEditClicked(true);
            }}
            className="xl:px-4 px-2 xl:py-2 py-1 text-base border border-brand-color rounded-md"
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col w-full p-4 xl:gap-4 gap-2">
        <div className="flex flex-col">
          <label>First Name</label>
          {editClicked ? (
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          ) : (
            <h1 className="text-brand-color xl:px-4 px-2 xl:py-2 py-1 m-0">
              John
            </h1>
          )}
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          {editClicked ? (
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          ) : (
            <h1 className="text-brand-color xl:px-4 px-2 xl:py-2 py-1 m-0 ">
              Doe
            </h1>
          )}
        </div>
        <div className="flex flex-col">
          <label>Email Address</label>
          {editClicked ? (
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          ) : (
            <h1 className="text-brand-color xl:px-4 px-2 xl:py-2 py-1 m-0">
              john@doe.com
            </h1>
          )}
        </div>
        <div className="flex flex-col">
          <label>Website</label>
          {editClicked ? (
            <input className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0" />
          ) : (
            <h1 className="text-brand-color xl:px-4 px-2 xl:py-2 py-1 m-0">
              johndoe.com
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
