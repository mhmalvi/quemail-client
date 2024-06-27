"use client";
import { sendMail } from "@/app/api/campaign";
import { NewCampaignType } from "@/components/utils/types";
import { successNotification } from "@/components/utils/utility";
import { campaignStore } from "@/store/store";
import Link from "next/link";
import React from "react";
import Scheduler from "./Scheduler";

const StartCampaign = ({ tabsRef }: any) => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const setClickedGroup = campaignStore((state) => state.setClickedGroup);
  const viewRecipients = campaignStore((state) => state.viewRecipients);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  const setViewSchedule = campaignStore((state) => state.setViewSchedule);
  const viewSchedule = campaignStore((state) => state.viewSchedule);

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
        setTimeout(() => {
          tabsRef.current.setActiveTab(0);
        }, 1000);
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
  return (
    <div className="w-full bg-dark-glass flex flex-col items-center justify-center relative gap-8 h-[72vh] xl:h-[82vh] p-4 rounded-md">
      {viewSchedule ? (
        <div className="flex items-center justify-center gap-32  w-full">
          <button
            className="absolute xl:top-8 xl:left-8 top-4 left-4 text-sm xl:text-base px-4 py-2 border border-brand-color rounded-md text-dark-black dark:text-slate-300 text-center"
            onClick={() => {
              setViewSchedule(!viewSchedule);
            }}
          >
            Back
          </button>
          <Scheduler tabsRef={tabsRef} />
        </div>
      ) : (
        <>
          <h1 className="text-2xl text-dark-black dark:text-slate-300">
            You are almost there. Schedule or start your email marketing now.
          </h1>
          <div className="w-full flex items-center justify-center gap-8">
            <button
              className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
              onClick={startCampaign}
            >
              Run Now
            </button>
            <button
              className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
              onClick={() => {
                setViewSchedule(!viewSchedule);
              }}
            >
              Schedule
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default StartCampaign;
