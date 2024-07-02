"use client";
import React, { useState } from "react";
import { Storage } from "@/store/store";

const AccountDetails = () => {
  const [editClicked, setEditClicked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeFirst = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFirstName(e.target.value);
  };

  const handleChangeLast = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const setUserInfo = () =>{
    if (firstName && lastName && email) {
      Storage.setItem("userName", firstName+" "+lastName);
      Storage.setItem("email", email);
    }
  }
  return (
    <div className="relative dark:border-none border w-full h-full dark:bg-dark-glass bg-violet-50 shadow-md background-blur-2xl rounded-md xl:p-4 flex flex-col xl:gap-4 gap-0 overflow-hidden">
      <div className="flex items-center xl:h-20 h-16 justify-between p-4">
        <h1 className="m-0 p-0 text-lg dark:text-slate-300 text-dark-black">Account Details</h1>
        {editClicked ? (
          <div className="flex items-center justify-end gap-4">
            <button onClick={()=>{
             setUserInfo()
             setEditClicked(false)
            }} className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-brand-color text-slate-50 rounded-md">
              Save
            </button>
            <button
              onClick={() => {
                setEditClicked(false);
              }}
              className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-red-500 rounded-md text-slate-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEditClicked(true);
            }}
            className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col w-full p-4 xl:gap-4 gap-2">
        <div className="flex flex-col justify-center">
          <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">First Name</label>
          {editClicked ? (
            <input
            className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent dark:text-slate-300 text-dark-black rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            value={firstName}
            onChange={handleChangeFirst}
          />
          ) : (
            <h1 className="text-brand-color font-semibold xl:px-4 px-2 xl:py-2 py-1 xl:text-base text-sm">
              {Storage.getItem("userName")}
            </h1>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">Last Name</label>
          {editClicked ? (
            <input className=" dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            value={lastName}
            onChange={handleChangeLast}
             />
          ) : (
            <h1 className="text-brand-color font-semibold xl:px-4 px-2 xl:py-2 py-1 m-0 xl:text-base text-sm">
              {Storage.getItem("userName")}
            </h1>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">Email Address</label>
          {editClicked ? (
            <input className=" dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            value={email}
            onChange={handleChangeEmail}
             />
          ) : (
            <h1 className="text-brand-color font-semibold xl:px-4 px-2 xl:py-2 py-1 m-0 xl:text-base text-sm">
              {Storage.getItem("email")}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
