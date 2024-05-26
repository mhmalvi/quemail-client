"use client";
import React, { useState } from "react";
import Image from "next/image";
import Images from "../utils/images";
import { Modal, Spinner } from "flowbite-react";
import { addMailInfo } from "@/app/api/campaign";
const HomeCard = () => {
  const [emailInfo, setEmailInfo] = useState({
    email: null,
    appPassword: null,
    provider: null,
    loading: false,
  });
  const handleAddMail = async (
    email: string | null,
    appPassword: string | null,
    provider: string | null
  ) => {
    if (emailInfo.provider === "Google") {
      try {
        const res = await addMailInfo(email, appPassword, provider);
        if (res.status === 201) {
          setEmailInfo((prev: any) => ({
            ...prev,
            loading: false,
          }));

          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-full relative dark:bg-dark-glass shadow-md bg-[#ffffffbf] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Connect your email address
      </h1>
      <p className="xl:text-base text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        Use your email to send more targeted emails
      </p>
      <div className="bg-[url('/SVG/Home/homeCardBg.svg')] w-full h-1/2 border dark:border-dark-black/30 shadow-xl shadow-inner rounded-md flex items-center justify-center gap-4">
        <div
          className="bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out"
          onClick={() => {
            setEmailInfo((prev: any) => ({
              ...prev,
              provider: "Google",
            }));
          }}
        >
          <Image src={Images.Google} alt="Google" className="h-full" />
        </div>
        <div
          className=" bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out"
          // onClick={() => {
          //   setServiceClicked("Yahoo");
          // }}
          // disabled={true}
        >
          <Image src={Images.Yahoo} alt="Yahoo" className="h-full" />
        </div>
        <div
          className=" bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out"
          // onClick={() => {
          //   setServiceClicked("Outlook");
          // }}
        >
          <Image src={Images.Outlook} alt="Outlook" className="h-full" />
        </div>
      </div>
      <p className="xl:text-sm text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        Segment and target customers based on purchase behavior using real-time
        data from your online store.
      </p>
      <Modal
        show={emailInfo.provider === "Google"}
        dismissible
        onClose={() => {
          setEmailInfo(() => ({
            email: null,
            appPassword: null,
            provider: null,
            loading: false,
          }));
        }}
      >
        <Modal.Header className=" dark:text-slate-300 text-dark-black">
          Connect store
        </Modal.Header>
        <Modal.Body className=" flex flex-col gap-4">
          <div className="flex flex-col justify-center">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Add email
            </label>
            <input
              onChange={(e) => {
                setEmailInfo((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent dark:text-slate-300 text-dark-black rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Add App Password
            </label>
            <input
              onChange={(e) => {
                setEmailInfo((prev: any) => ({
                  ...prev,
                  appPassword: e.target.value,
                }));
              }}
              className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent dark:text-slate-300 text-dark-black rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            />
          </div>
          <div className="flex items-center gap-4 justify-end">
            <button
              className="xl:px-4 px-2 xl:py-2 py-1 bg-brand-color text-slate-50 rounded-md disabled:opacity-20"
              onClick={() => {
                handleAddMail(
                  emailInfo.email,
                  emailInfo.appPassword,
                  emailInfo.provider
                );
                setEmailInfo((prev: any) => ({
                  ...prev,
                  loading: true,
                }));
              }}
              disabled={
                emailInfo.email === null || emailInfo.appPassword === null
              }
            >
              {emailInfo.loading ? (
                <Spinner
                  color="purple"
                  aria-label="Purple spinner example"
                  size="xl"
                />
              ) : (
                "Save"
              )}
            </button>

            <button
              className="xl:px-4 px-2 xl:py-2 py-1 bg-red-500 text-slate-50 rounded-md"
              onClick={() => {
                setEmailInfo(() => ({
                  email: null,
                  appPassword: null,
                  provider: null,
                  loading: false,
                }));
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}
    </div>
  );
};
export default HomeCard;
