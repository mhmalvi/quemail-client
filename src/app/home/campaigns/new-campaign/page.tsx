"use client";
import React, { useState } from "react";
import CampaignInfo from "./CampaignInfo";
import {  NewCampaignType } from "@/components/utils/types";
import RecipientSelection from "./RecipientSelection";
import Scheduler from "./Scheduler";
import ChooseTemplate from "./ChooseTemplate/ChooseTemplate";
import { campaignStore } from "@/store/store";
import { Dropdown, Modal, Table } from "flowbite-react";
import { sendMail } from "@/app/api/campaign";

const NewCampaign = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const viewRecipients = campaignStore((state) => state.viewRecipients);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  const setViewSchedule = campaignStore((state) => state.setViewSchedule);
  const viewSchedule = campaignStore((state) => state.viewSchedule);

  const startCampaign = async () => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;

    const updatedCampaign: NewCampaignType = {
      ...newCampaign,
      userID: userID ?? null,
      template: newCampaign?.template ?? { name: null, data: null },
      campaignInfo: newCampaign?.campaignInfo ?? null,
      recipient: newCampaign?.recipient ?? null,
      schedule: newCampaign?.schedule ?? null,
    };

    setNewCampaign(updatedCampaign);

    console.log(updatedCampaign); 
    try {
      const res = await sendMail(updatedCampaign);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
};

  return (
    <div className="relative w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center rounded-md gap-8">
          <h1
            className={`${
              newCampaign?.template !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-sm  `}
          >
            Template {newCampaign?.template !== null && <span>✔</span>}
          </h1>
          <h1
            className={`${
              newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo?.fromMail !== "" &&
              newCampaign?.campaignInfo?.fromName !== "" &&
              newCampaign?.campaignInfo?.subject !== null &&
              newCampaign?.campaignInfo?.subject.length !== undefined &&
              newCampaign?.campaignInfo?.subject.length > 0
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-sm  `}
          >
            Campaign Information{" "}
            {newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo?.fromMail !== "" &&
              newCampaign?.campaignInfo?.fromName !== "" &&
              newCampaign?.campaignInfo?.subject !== null &&
              newCampaign?.campaignInfo?.subject.length !== undefined &&
              newCampaign?.campaignInfo?.subject.length > 0 && <span>✔</span>}
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
        <div className="flex gap-4 items-center">
          <button className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-sm dark:text-slate-300 text-dark-black rounded-md border border-brand-color ">
            Save & Exit
          </button>
          <Dropdown
            label="Actions"
            placement="bottom-start"
            renderTrigger={() => (
              <button className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-sm dark:text-slate-300 text-dark-black rounded-md bg-brand-color ">
                <h1 className="m-0 p-0 ">Start Campaign</h1>
              </button>
            )}
          >
            <Dropdown.Item onClick={startCampaign}>
              Run campaign Now
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setViewSchedule(!viewSchedule);
              }}
            >
              Schedule Campaign
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="flex  justify-between gap-4 h-full">
        <div className="flex flex-col gap-4 w-full">
          <ChooseTemplate />
          <div className="flex w-full h-full gap-4">
            <CampaignInfo />
            <RecipientSelection />
          </div>
        </div>
        <Scheduler />
      </div>

      <Modal
        dismissible
        show={viewRecipients}
        onClose={() => setViewRecipients(false)}
      >
        <Modal.Header className="dark:bg-dark-glass bg-violet-50">
          Selected Recipients
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300">
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewCampaign;
