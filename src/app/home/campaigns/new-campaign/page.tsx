"use client";
import React, { useRef, useState } from "react";
import CampaignInfo from "./CampaignInfo";
import { NewCampaignType } from "@/components/utils/types";
import RecipientSelection from "./RecipientSelection";
import Scheduler from "./Scheduler";
import ChooseTemplate from "./ChooseTemplate/ChooseTemplate";
import { campaignStore } from "@/store/store";
import { Dropdown, Modal, Table, Tabs, TabsRef } from "flowbite-react";
import { sendMail } from "@/app/api/campaign";
import { COL_CONTAINER_STYLES } from "@/components/styles/flex_col_container";
import {
  BIG_BUTTON_STYLES,
  BORDERED_BUTTON_STYLES,
} from "@/components/styles/button";
import Link from "next/link";
import { successNotification } from "@/components/utils/utility";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const NewCampaign = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const viewRecipients = campaignStore((state) => state.viewRecipients);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  const setViewSchedule = campaignStore((state) => state.setViewSchedule);
  const setClickedGroup = campaignStore((state) => state.setClickedGroup);
  const viewSchedule = campaignStore((state) => state.viewSchedule);

  const tabsRef = useRef<TabsRef>(null);
  const [activeTab,setActiveTab] = useState(0) 
  const startCampaign = async () => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const date = new Date().toISOString();
    const [fullDate, fullTime] = date.split("T");
    const time = fullTime.split(".")[0];
    const formattedDate = `${fullDate} ${time}`;
    const updatedCampaign: NewCampaignType = {
      ...newCampaign,
      userID: userID ?? null,
      template: newCampaign?.template ?? { name: null, data: null },
      campaignInfo: newCampaign?.campaignInfo ?? null,
      recipient: newCampaign?.recipient ?? null,
      schedule: formattedDate ?? null,
    };
    setNewCampaign(updatedCampaign);

    try {
      const res = await sendMail(updatedCampaign);
      if (res.status === 200) {
        successNotification(
          <div className="flex flex-col gap-1">
            <h1>Campaign has started</h1>
            <Link href="/home/campaigns/all-campaigns">
              <button className="m-0 px-4 py-1 bg-brand-color text-slate-300 rounded-md">
                View
              </button>
            </Link>
          </div>
        );
        setNewCampaign({
          userID: null,
          template: {
            name: null,
            data: null,
          },
          campaignInfo: {
            campaignName: null,
            subject: null,
            fromMail: null,
            fromName: null,
          },
          recipient: null,
          schedule: null,
        });
        setClickedGroup(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newCampaign);
  return (
    <div className={COL_CONTAINER_STYLES}>
      <Tabs
        aria-label="Default tabs"
        ref={tabsRef}
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item
          active={activeTab === 1}
          title="1. Campaign Information"
          icon={HiUserCircle}
        >
          <CampaignInfo tabsRef={tabsRef} setActiveTab={setActiveTab}/>
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === 2}
          title="2. Add Template"
          icon={MdDashboard}
        >
          <ChooseTemplate tabsRef={tabsRef} setActiveTab={setActiveTab}/>
        </Tabs.Item>
        <Tabs.Item title="3. Add Contacts" icon={HiAdjustments}>
          <RecipientSelection />
        </Tabs.Item>
        <Tabs.Item title="4. Review" icon={HiClipboardList}>
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tabs associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item disabled title="Disabled">
          Disabled content
        </Tabs.Item>
      </Tabs>
      {/* <div className="w-full flex items-center justify-between">
        <div className="flex items-center rounded-md gap-8">
          <h1
            className={`${
              newCampaign?.template !== null &&
              newCampaign?.template.data !== null &&
              newCampaign?.template.name !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-xs  `}
          >
            Template{" "}
            {newCampaign?.template !== null &&
              newCampaign?.template.data !== null &&
              newCampaign?.template.name !== null && <span>✔</span>}
          </h1>
          <h1
            className={`${
              newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo.campaignName !== "" &&
              newCampaign?.campaignInfo.campaignName !== null &&
              newCampaign?.campaignInfo.campaignName !== undefined &&
              newCampaign?.campaignInfo.subject !== "" &&
              newCampaign?.campaignInfo.subject !== undefined &&
              newCampaign?.campaignInfo.fromName !== "" &&
              newCampaign?.campaignInfo.fromName !== undefined &&
              newCampaign?.campaignInfo.fromMail !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-xs  `}
          >
            Campaign Information
            {newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo.campaignName !== "" &&
              newCampaign?.campaignInfo.campaignName !== null &&
              newCampaign?.campaignInfo.campaignName !== undefined &&
              newCampaign?.campaignInfo.subject !== "" &&
              newCampaign?.campaignInfo.subject !== undefined &&
              newCampaign?.campaignInfo.fromName !== "" &&
              newCampaign?.campaignInfo.fromName !== undefined &&
              newCampaign?.campaignInfo.fromMail !== null && <span>✔</span>}
          </h1>
          <h1
            className={`${
              newCampaign?.recipient !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-xs  `}
          >
            Recipients Selection
            {newCampaign?.recipient !== null && <span>✔</span>}
          </h1>
          <h1
            className={`${
              newCampaign?.schedule !== null
                ? "text-green-500"
                : "dark:text-slate-300 text-dark-black opacity-20"
            } xl:text-base text-xs  `}
          >
            Schedule {newCampaign?.schedule !== null && <span>✔</span>}
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <button className={BORDERED_BUTTON_STYLES}>Save & Exit</button>

          {newCampaign?.template !== null &&
          newCampaign?.template.data !== null &&
          newCampaign?.template.name !== null &&
          newCampaign?.campaignInfo !== null &&
          newCampaign?.recipient !== null &&
          newCampaign?.campaignInfo.campaignName !== null &&
          newCampaign?.campaignInfo.fromMail !== null &&
          newCampaign?.campaignInfo.fromName !== null &&
          newCampaign?.campaignInfo.subject !== null ? (
            <Dropdown
              label="Actions"
              placement="bottom-start"
              renderTrigger={() => (
                <button className={BIG_BUTTON_STYLES}>
                  <h1 className="m-0 p-0 ">Start Campaign ▼</h1>
                </button>
              )}
            >
              <Dropdown.Item
                onClick={startCampaign}
                className="xl:text-base text-sm"
              >
                Run campaign Now
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setViewSchedule(!viewSchedule);
                }}
                className="xl:text-base text-sm"
              >
                Schedule Campaign
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <button
              className={`opacity-10 cursor-not-allowed ${BIG_BUTTON_STYLES}`}
            >
              <h1 className="m-0 p-0 ">Start Campaign ▼</h1>
            </button>
          )}
        </div>
      </div> */}
      {/* <div className="flex  justify-between gap-4 h-full">
        <div className="flex flex-col gap-4 w-full">
          
          <div className="flex w-full h-full gap-4">
            
            
          </div>
        </div>
        <Scheduler />
      </div> */}

      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default NewCampaign;
