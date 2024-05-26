"use client";
import Image from "next/image";
import React, { useState } from "react";
import Images from "../utils/images";
import ImportCSV from "@/app/home/contacts/all-contacts/ImportCSV";
import Link from "next/link";

const QuickActions = () => {
  const [actionClick, setActionClick] = useState({
    show: "",
  });
  return (
    <div className=" xl:w-1/4 w-1/3 dark:bg-dark-glass bg-[#ffffffbf] shadow-md backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Quick actions
      </h1>
      <p className="text-xs m-0 p-0 dark:text-slate-300 text-dark-black">
        Use these features to excel your work flow
      </p>
      <Link
        href="/home/campaigns/new-campaign"
        className="rounded-md h-full flex gap-4 items-center 2xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-black border dark:border-slate-500 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
      >
        {Images.Create_Campaigns && (
          <Image
            src={Images.Create_Campaigns}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6"
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Create Campaigns
        </h1>
      </Link>
      <button className="rounded-md h-full flex gap-4 items-center 2xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-black border dark:border-slate-500 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in">
        {Images.Add_Contact && (
          <Image
            src={Images.Add_Contact}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6"
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Add a contact
        </h1>
      </button>
      <button
        onClick={() => {
          setActionClick({
            show: "importContacts",
          });
        }}
        className="rounded-md h-full flex gap-4 items-center 2xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-black border  dark:border-slate-500 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
      >
        {Images.Import_Contact && (
          <Image
            src={Images.Import_Contact}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6"
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Import Contacts
        </h1>
      </button>
      <button className="rounded-md h-full flex gap-4 items-center 2xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-black border  dark:border-slate-500 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in">
        {Images.Generate_Templates && (
          <Image
            src={Images.Generate_Templates}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6"
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Generate Templates
        </h1>
      </button>

      {actionClick.show === "importContacts" && (
        <ImportCSV openModal={actionClick} setOpenModal={setActionClick} />
      )}
    </div>
  );
};
export default QuickActions;
