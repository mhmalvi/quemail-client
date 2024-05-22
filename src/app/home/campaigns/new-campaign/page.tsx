"use client";
import React, { useState } from "react";
import CampaignInfo from "./CampaignInfo";
import RecipientSelection from "./RecipientSelection";
import Scheduler from "./Scheduler";
import { campaignStore } from "@/store/store";
import { Table } from "flowbite-react";

const NewCampaign = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const viewRecipients = campaignStore((state) => state.viewRecipients);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  return (
    <div className="relative w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center rounded-md gap-8">
          <h1
            className={`xl:text-base text-sm dark:text-slate-300 text-dark-black opacity-20`}
          >
            Template {newCampaign?.template !== null && <span>✔</span>}
          </h1>
          <h1
            className={`xl:text-base text-sm dark:text-slate-300 text-dark-black opacity-20`}
          >
            Campaign Information{" "}
            {newCampaign?.campaignInfo !== null && <span>✔</span>}
          </h1>
          <h1
            className={`${
              newCampaign?.recipient !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-sm  `}
          >
            Recipients Selection{" "}
            {newCampaign?.recipient !== null && <span>✔</span>}
          </h1>
          <h1
            className={`xl:text-base text-sm dark:text-slate-300 text-dark-black opacity-20`}
          >
            Schedule {newCampaign?.schedule !== null && <span>✔</span>}
          </h1>
        </div>
        <div className="flex gap-8 items-center">
          <button className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-sm dark:text-slate-300 text-dark-black rounded-md border border-brand-color ">
            Save & Exit
          </button>
          <button className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-sm text-slate-300 rounded-md bg-brand-color duration-300 ease-in">
            Run campaign Now
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 h-full">
        {/* TOP */}
        <div className="relative h-full w-full flex flex-col py-8 items-center justify-center dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
          <h1 className="xl:text-base text-sm dark:text-slate-300 text-dark-black w-1/2 text-center">
            If you&apos;re looking to launch a new campaign, you can easily
            create one. But you need to set up a template first.
          </h1>
          <div className="flex gap-4">
            <button className="xl:py-2 xl:px-4 py-1 px-2 bg-brand-color rounded-md text-slate-300 ">
              Select a Template
            </button>
            <button className="xl:py-2 xl:px-4 py-1 px-2 bg-brand-color rounded-md text-slate-300 ">
              Create a Template
            </button>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex h-full gap-4">
          <CampaignInfo />
          <RecipientSelection />
          <Scheduler />
        </div>
      </div>
      <div
        className={`  w-full ${
          viewRecipients ? "h-1/2" : "h-0 hidden"
        }  absolute right-0 bottom-0 duration-300 ease-in flex items-center justify-center gap-4`}
      >
        <div className="h-full bg-dark-black bottom-0 p-4 w-1/3 rounded-t-md flex flex-col gap-4 ">
          <button
            className="w-full px-2 py-1 border border-brand-color rounded-md"
            onClick={() => setViewRecipients(false)}
          >
            Close
          </button>
          <Table className="w-full !h-20 overflow-y-scroll">
            <Table.Head className="sticky top-0 py-0 !rounded-tl-md w-full">
              <Table.HeadCell className="sticky top-0 py-2">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2">
                Email
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2">
                Group
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y overflow-auto">
              {newCampaign?.recipient !== null &&
                newCampaign?.recipient.map((item: any, index: number) => (
                  <Table.Row
                    key={index}
                    className="dark:border-gray-700 dark:bg-gray-800 w-full"
                  >
                    <Table.Cell className="w-1/3">{item.json.name}</Table.Cell>
                    <Table.Cell className="w-1/3">{item.json.email}</Table.Cell>
                    <Table.Cell className="w-1/3">{item.json.group}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
