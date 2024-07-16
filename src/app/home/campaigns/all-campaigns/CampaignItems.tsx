"use client";
import { useState } from "react";
import SummaryRate from "./SummaryRate";
import CampaignPerformanceList from "./CampaignPerformanceList";

import { compareCampaignStore, showCampaignStore } from "@/store/store";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";

const CampaignItems = () => {
  const [openTemplateModal, setOpenTemplateModal] = useState<boolean>(false);
  const setCampaignItemList = showCampaignStore(
    (state) => state.setCampaignItemList
  );
  const setCompareID1 = compareCampaignStore(
    (state) => state.setClickedCampaignId1
  );
  const setLeftFilterName = compareCampaignStore(
    (state) => state.setCampaign1Name
  );
  const compareID1details = compareCampaignStore(
    (state) => state.setCampaignDetails1
  );
  const campaignItemList = showCampaignStore((state) => state.campaignItemList);
  const currentCampaign = showCampaignStore((state) => state.clickedCampaignId);
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );

  const campaignDetails = showCampaignStore((state) => state.campaignDetails);
  const router = useRouter();

  const handleClick = () => {
    setCompareID1(currentCampaign);
    compareID1details(campaignItemList);
    setLeftFilterName(campaignDetails?.campaignName);
    router.push("/home/campaigns/compare-email-performance");
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <div className=" flex items-center justify-between gap-4 text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
        <div className="flex items-center gap-4 2xl:w-1/3 w-1/3">
          <button
            onClick={() => {
              setClickedCampaignId(null);
              setCampaignItemList(null);
            }}
            className="h-8 w-8 flex items-center justify-center rounded-md text-dark-black bg-violet-200 dark:bg-brand-color dark:text-slate-300 font-semibold"
          >
            &lt;
          </button>
          <h1 className="text-dark-black dark:text-slate-300 2xl:text-sm text-xs">
            Campaign name:{" "}
            <span className="text-green-500 font-semibold">
              {campaignDetails?.campaignName}
            </span>
          </h1>
          <button
            className="w-1/8 h-full flex flex-col justify-center 2xl:p-2 py-1 px-2 rounded-md 2xl:text-sm text-xs text-dark-black dark:text-slate-300 hover:text-slate-300 border border-slate-300 hover:bg-dark-black bg-transparent duration-100 ease-in-out"
            onClick={handleClick}
          >
            Compare Performance
          </button>
        </div>
        <div className="flex items-center justify-end gap-4 2xl:w-2/3 w-2/3">
          <button
            onClick={() => {
              setOpenTemplateModal(true);
            }}
            className="w-1/8 h-full flex flex-col justify-center 2xl:p-2 py-1 px-2 rounded-md 2xl:text-sm text-xs text-dark-black dark:text-slate-300 hover:text-slate-300 border border-slate-300 hover:bg-dark-black bg-transparent duration-100 ease-in-out"
          >
            View Sent Template
          </button>
          <h1 className="2xl:text-sm text-xs m-0 px-2">
            Sender Name:{" "}
            <span className="text-green-500 font-semibold">
              {campaignDetails?.senderName}
            </span>
          </h1>
          <h1 className="2xl:text-sm text-xs m-0 px-2">
            Sender Email:{" "}
            <span className="text-green-500 font-semibold">
              {campaignDetails?.senderEmail}
            </span>
          </h1>
          <div className="w-1/8 h-full flex flex-col justify-center p-2 rounded-md">
            <h1 className="2xl:text-sm text-xs">
              Total Recipients:{" "}
              <span className="text-green-500 font-semibold">
                {campaignDetails?.count}
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="h-1/4 z-10">
        <SummaryRate />
      </div>
      <div className="h-3/4">
        <CampaignPerformanceList />
      </div>
      <Modal
        show={openTemplateModal}
        dismissible
        onClose={() => {
          setOpenTemplateModal(false);
        }}
        size={"4xl"}
      >
        <Modal.Header>
          <h1>This is the template used in this campaign</h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300">
          <div className="h-[80vh] w-full rounded-md overflow-y-auto">
            <div
              className="bg-[#F7F8F9]"
              // style={{
              //   transform: `scale(${scale})`,
              //   transition: "transform 0.2s",
              // }}
              dangerouslySetInnerHTML={{
                __html: `${campaignItemList?.recipients?.[0].templateData}`,
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CampaignItems;
