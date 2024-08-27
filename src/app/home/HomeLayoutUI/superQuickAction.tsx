"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Images from "../../../components/utils/images";
import ImportCSV from "@/app/home/all-contacts/ImportCSV";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Modal } from "flowbite-react";
import ManualContact from "@/app/home/all-contacts/ManualContact";

const SuperQuickAction = () => {
  const [actionClick, setActionClick] = useState({
    show: "",
  });

  const router = useRouter();

  return (
    <div className="step-4 border dark:border-none border-violet-200 xl:w-full w-full h-full dark:bg-light-glass bg-white shadow-md backdrop-blur-xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Quick actions
      </h1>
      <div className="flex flex-col w-full h-full justify-between gap-2">
        <div className="flex flex-row w-full h-1/2 justify-between gap-2">
          <button
            onClick={() => {
              router.push("/home/super-admin/fetch-user");
            }}
            className="step-5 xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Add_Contact && (
                <Image
                  src={Images.Add_Contact}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                ALL USER
              </h1>
            </div>
          </button>
          <button
            onClick={() => {}}
            className="step-6  xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Import_Contact && (
                <Image
                  src={Images.Import_Contact}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                UPDATE USER
              </h1>
            </div>
          </button>

          <button
            onClick={() => {}}
            className="step-7 xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Delete && (
                <Image
                  src={Images.Delete}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                Delete User
              </h1>
            </div>
          </button>
        </div>
        <div className="flex flex-row w-full h-1/2 justify-between gap-2">
          <Link
            href="/home/campaigns/new-campaign"
            className="step-8 xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Create_Campaigns && (
                <Image
                  src={Images.Create_Campaigns}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                Suspense User
              </h1>
            </div>
          </Link>

          <Link
            href="/home/super-admin"
            className="step-8 xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Create_Campaigns && (
                <Image
                  src={Images.Create_Campaigns}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                Contact Mails
              </h1>
            </div>
          </Link>

          <Link
            href="/home/campaigns/new-campaign"
            className="step-8 xl:w-1/3 w-1/3 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
          >
            <div className="flex flex-col w-full h-full justify-center items-center group">
              {Images.Support && (
                <Image
                  src={Images.Support}
                  alt="add_Contact"
                  className="xl:w-1/4 w-1/4 group-hover:xl:w-1/3 group-hover:w-1/3 ease-in duration-100"
                />
              )}
              <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
                Support Mails
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SuperQuickAction;
