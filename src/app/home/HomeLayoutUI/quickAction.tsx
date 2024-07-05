"use client";
import Image from "next/image";
import React, { useState } from "react";
import Images from "../../../components/utils/images";
import ImportCSV from "@/app/home/contacts/all-contacts/ImportCSV";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Modal } from "flowbite-react";
import ManualContact from "@/app/home/contacts/all-contacts/ManualContact";

const QuickActions = () => {
  const [actionClick, setActionClick] = useState({
    show: "",
  });
  const Editor = dynamic(() => import("../campaigns/MainEditor"), {
    ssr: false,
  });
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  return (
    <div className="step-4 border dark:border-none border-violet-200 xl:w-1/4 w-1/3 dark:bg-light-glass bg-white shadow-md backdrop-blur-xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Quick actions
      </h1>
      <>
      
      </>
      <button
        onClick={() => {
          setOpenAddContactModal(true);
        }}
        className="step-5 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
      >
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
        className="step-6 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
      >
        {Images.Import_Contact && (
          <Image
            src={Images.Import_Contact}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6 "
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Import Contacts
        </h1>
      </button>

      <button
        onClick={() => {
          setActionClick({
            show: "generateTemplate",
          });
        }}
        className="step-7 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
      >
        {Images.Generate_Templates && (
          <Image
            src={Images.Generate_Templates}
            alt="add_Contact"
            className="xl:w-1/4 w-1/6"
          />
        )}
        <h1 className="dark:text-slate-300 text-dark-black text-base m-0 p-0 text-start">
          Create a template
        </h1>
      </button>
      <Link
        href="/home/campaigns/new-campaign"
        className="step-8 rounded-md h-full flex gap-4 items-center xl:p-4 p-2 dark:bg-dark-glass bg-light-glass dark:border-light-glass border border-violet-200 dark:hover:border-brand-color hover:border-brand-color duration-100 ease-in"
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
