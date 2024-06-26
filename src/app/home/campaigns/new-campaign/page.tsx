"use client";
import React, { useRef, useState } from "react";
import CampaignInfo from "./CampaignInfo";
import { NewCampaignType } from "@/components/utils/types";
import RecipientSelection from "./RecipientSelection";
import ChooseTemplate from "./ChooseTemplate/ChooseTemplate";
import { campaignStore } from "@/store/store";
import { Tabs, TabsRef } from "flowbite-react";
import { sendMail } from "@/app/api/campaign";
import Link from "next/link";
import { successNotification } from "@/components/utils/utility";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Review from "./Review";
import { TbCheck } from "react-icons/tb";
import StartCampaign from "./StartCampaign/StartCampaign";

const NewCampaign = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);

  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Tabs
        aria-label="Default tabs"
        ref={tabsRef}
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item
          active={activeTab === 1}
          title={
            newCampaign?.campaignInfo?.subject !== null &&
            newCampaign?.campaignInfo?.subject !== "" &&
            newCampaign?.campaignInfo?.fromMail !== null &&
            newCampaign?.campaignInfo?.fromMail !== "" &&
            newCampaign?.campaignInfo?.fromName !== null &&
            newCampaign?.campaignInfo?.fromName !== "" &&
            newCampaign?.campaignInfo?.campaignName !== null &&
            newCampaign?.campaignInfo?.campaignName !== "" &&
            newCampaign?.campaignInfo !== null ? (
              <p className="flex items-center gap-2">
                1. Campaign Information
                <span className="text-green-500">
                  <TbCheck />
                </span>
              </p>
            ) : (
              <p>1. Campaign Information</p>
            )
          }
          icon={HiUserCircle}
        >
          <CampaignInfo tabsRef={tabsRef} />
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === 2}
          title={
            newCampaign?.template?.data !== null &&
            newCampaign?.template !== null &&
            newCampaign?.template?.data !== "" ? (
              <p className="flex items-center gap-2">
                2. Add Template
                <span className="text-green-500">
                  <TbCheck />
                </span>
              </p>
            ) : (
              <p>2. Add Template</p>
            )
          }
          icon={MdDashboard}
          disabled={
            newCampaign?.campaignInfo?.subject === null ||
            newCampaign?.campaignInfo?.subject === "" ||
            newCampaign?.campaignInfo?.fromMail === null ||
            newCampaign?.campaignInfo?.fromMail === "" ||
            newCampaign?.campaignInfo?.fromName === null ||
            newCampaign?.campaignInfo?.fromName === "" ||
            newCampaign?.campaignInfo?.campaignName === null ||
            newCampaign?.campaignInfo?.campaignName === "" ||
            newCampaign?.campaignInfo === null
          }
        >
          <ChooseTemplate tabsRef={tabsRef} />
        </Tabs.Item>
        <Tabs.Item
          active={activeTab === 3}
          title={
            newCampaign?.recipient !== null ? (
              <p className="flex items-center gap-2 ">
                3. Add Contacts
                <span className="text-green-500">
                  <TbCheck />
                </span>
              </p>
            ) : (
              <p>3. Add Contacts</p>
            )
          }
          icon={HiAdjustments}
          disabled={
            newCampaign?.template?.data === null ||
            newCampaign?.template === null ||
            newCampaign?.template?.data === "" ||
            newCampaign?.campaignInfo?.subject === null ||
            newCampaign?.campaignInfo?.subject === "" ||
            newCampaign?.campaignInfo?.fromMail === null ||
            newCampaign?.campaignInfo?.fromMail === "" ||
            newCampaign?.campaignInfo?.fromName === null ||
            newCampaign?.campaignInfo?.fromName === "" ||
            newCampaign?.campaignInfo?.campaignName === null ||
            newCampaign?.campaignInfo?.campaignName === "" ||
            newCampaign?.campaignInfo === null
          }
        >
          <RecipientSelection tabsRef={tabsRef} />
        </Tabs.Item>
        <Tabs.Item
          title={
            activeTab >= 4 ? (
              <p className="flex items-center gap-2">
                4. Review
                <span className="text-green-500">
                  <TbCheck />
                </span>
              </p>
            ) : (
              <p>4. Review</p>
            )
          }
          icon={HiClipboardList}
          disabled={
            newCampaign?.recipient === null ||
            newCampaign?.template?.data === null ||
            newCampaign?.template === null ||
            newCampaign?.template?.data === "" ||
            newCampaign?.campaignInfo?.subject === null ||
            newCampaign?.campaignInfo?.subject === "" ||
            newCampaign?.campaignInfo?.fromMail === null ||
            newCampaign?.campaignInfo?.fromMail === "" ||
            newCampaign?.campaignInfo?.fromName === null ||
            newCampaign?.campaignInfo?.fromName === "" ||
            newCampaign?.campaignInfo?.campaignName === null ||
            newCampaign?.campaignInfo?.campaignName === "" ||
            newCampaign?.campaignInfo === null
          }
        >
          <Review tabsRef={tabsRef} />
        </Tabs.Item>
        <Tabs.Item
          title={<p className="flex items-center gap-2">5. Schedule and Run</p>}
          icon={HiClipboardList}
          disabled={
            newCampaign?.recipient === null ||
            newCampaign?.template?.data === null ||
            newCampaign?.template === null ||
            newCampaign?.template?.data === "" ||
            newCampaign?.campaignInfo?.subject === null ||
            newCampaign?.campaignInfo?.subject === "" ||
            newCampaign?.campaignInfo?.fromMail === null ||
            newCampaign?.campaignInfo?.fromMail === "" ||
            newCampaign?.campaignInfo?.fromName === null ||
            newCampaign?.campaignInfo?.fromName === "" ||
            newCampaign?.campaignInfo?.campaignName === null ||
            newCampaign?.campaignInfo?.campaignName === "" ||
            newCampaign?.campaignInfo === null
          }
        >
          <StartCampaign tabsRef={tabsRef}/>
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
