"use client";
import Image from "next/image";
import React, { useState } from "react";
import Images from "../../../components/utils/images";
import ImportCSV from "@/app/home/all-contacts/ImportCSV";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Modal } from "flowbite-react";
import ManualContact from "@/app/home/all-contacts/ManualContact";
import { paymentDue } from "@/store/store";

const QuickActions = () => {
  const hasDue = paymentDue((state) => state.hasDue);
  console.log("coming from quickaction", hasDue);

  const [actionClick, setActionClick] = useState({
    show: "",
  });
  const Editor = dynamic(() => import("../campaigns/MainEditor"), {
    ssr: false,
  });
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  return (
    <div className="relative step-4 border dark:border-none border-violet-200 xl:w-full w-full h-full dark:bg-light-glass bg-white shadow-md backdrop-blur-xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Quick actions
      </h1>
      <div className="flex flex-row w-full h-full justify-between gap-2">
        <button
          onClick={() => {
            setOpenAddContactModal(true);
          }}
          className="step-5 xl:w-1/4 w-1/4 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            {Images.Add_Contact && (
              <Image
                src={Images.Add_Contact}
                alt="add_Contact"
                className="xl:w-1/4 w-1/4"
              />
            )}
            <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
              Add a contact
            </h1>
          </div>
        </button>
        <button
          onClick={() => {
            setActionClick({
              show: "importContacts",
            });
          }}
          className="step-6  xl:w-1/4 w-1/4 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            {Images.Import_Contact && (
              <Image
                src={Images.Import_Contact}
                alt="add_Contact"
                className="xl:w-1/4 w-1/4"
              />
            )}
            <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
              Import Contacts
            </h1>
          </div>
        </button>

        <button
          onClick={() => {
            setActionClick({
              show: "generateTemplate",
            });
          }}
          className="step-7 xl:w-1/4 w-1/4 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            {Images.Generate_Templates && (
              <Image
                src={Images.Generate_Templates}
                alt="add_Contact"
                className="xl:w-1/4 w-1/4"
              />
            )}
            <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
              Create a template
            </h1>
          </div>
        </button>

        <Link
          href="/home/campaigns/new-campaign"
          className="step-8 xl:w-1/4 w-1/4 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
        >
          <div className="flex flex-col w-full h-full justify-center items-center">
            {Images.Create_Campaigns && (
              <Image
                src={Images.Create_Campaigns}
                alt="add_Contact"
                className="xl:w-1/4 w-1/4"
              />
            )}
            <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
              Create Campaigns
            </h1>
          </div>
        </Link>
      </div>
      {hasDue && 
      <div className="absolute top-0 left-0 xl:w-full w-full h-full flex items-center justify-center dark:bg-[#212121bf] bg-[#ffffffbf]">
        <p className="text-red-600 dark:text-red-600 font-semibold">
          You have Payment Deu, Please go to
          <Link
            href="/home/billing"
            className="px-4 py-2 mt-3 font-normal bg-brand-color text-white rounded-md flex items-center justify-center gap-2"
          >
            Billing Dashboard
          </Link>
        </p>
      </div>
      }

      {actionClick.show === "importContacts" && (
        <ImportCSV openModal={actionClick} setOpenModal={setActionClick} />
      )}
      <Modal
        show={actionClick.show === "generateTemplate"}
        dismissible
        onClose={() => {
          setActionClick({
            show: "",
          });
        }}
        size={"7xl"}
        className="h-screen"
      >
        <Modal.Header>Create a template</Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 h-[calc(100vh-100px)] overflow-y-auto">
          <Editor />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openAddContactModal}
        onClose={() => setOpenAddContactModal(false)}
      >
        <Modal.Header>Add a Contact</Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 rounded-md">
          <ManualContact setOpenAddContactModal={setOpenAddContactModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default QuickActions;
