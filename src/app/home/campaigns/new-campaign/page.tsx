"use client";
import React, { useRef, useState } from "react";
import CampaignInfo from "./CampaignInfo";
import RecipientSelection from "./RecipientSelection";
import ChooseTemplate from "./ChooseTemplate/ChooseTemplate";
import { campaignStore } from "@/store/store";
import { Tabs, TabsRef } from "flowbite-react";
import { TbBrandCampaignmonitor, TbTemplate,TbUserCog,TbChartCandle  ,TbCalendarBolt   } from "react-icons/tb";
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
          icon={TbBrandCampaignmonitor}
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
          icon={TbTemplate}
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
          icon={TbUserCog}
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
          icon={TbChartCandle }
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
          icon={TbCalendarBolt }
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
    </div>
  );
};

export default NewCampaign;
