"use client";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import SelectTemplate from "./SelectTemplate";
import CreateTemplateModal from "./CreateTemplateModal";
import { campaignStore } from "@/store/store";
import { BIG_BUTTON_STYLES } from "@/components/styles/button";

const ChooseTemplate = ({ tabsRef }: any) => {
  const [chooseTemplate, setChooseTemplate] = useState<string>("");
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  return (
    <>
      {newCampaign?.template === undefined ||
      newCampaign?.template === null ||
      newCampaign?.template.data === null ||
      newCampaign?.template.name === null ? (
        <div className="relative w-full flex flex-col items-center justify-center xl:pt-16 py-4 px-4 gap-4 h-full ">
          <h1 className="xl:text-base text-xs dark:text-slate-300 text-dark-black w-1/2 text-center">
            If you&apos;re looking to launch a new campaign, you can easily
            create one. But you need to set up a template first.
          </h1>
          <div className="flex gap-4">
            <button
              className={BIG_BUTTON_STYLES}
              onClick={() => {
                setChooseTemplate("select");
              }}
            >
              Select a Template
            </button>
            <button
              className={BIG_BUTTON_STYLES}
              onClick={() => {
                setChooseTemplate("create");
              }}
            >
              Create a Template
            </button>
          </div>
          <SelectTemplate
            chooseTemplate={chooseTemplate}
            setChooseTemplate={setChooseTemplate}
          />
          <CreateTemplateModal
            chooseTemplate={chooseTemplate}
            setChooseTemplate={setChooseTemplate}
          />
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center justify-center xl:pt-16 py-4 px-4 gap-4 h-full">
          <div className="flex items-center justify-center gap-4 ">
            <h1 className="m-0 p-0 text-dark-black dark:text-slate-300 text-xs xl:text-base">
              Template Selected: {newCampaign.template.name}
            </h1>
            <button
              className="bg-red-500 px-4 py-1 text-slate-50 text-xs xl:text-base rounded-md"
              onClick={() => {
                setNewCampaign((prev: any | null) => ({
                  ...prev,
                  template: null,
                }));
              }}
            >
              Clear selection
            </button>
          </div>
          <div className="w-1/2 bg-dark-black h-[calc(60vh-2rem)] overflow-auto rounded-md ">
            <div
              dangerouslySetInnerHTML={{
                __html: `${newCampaign.template.data}`,
              }}
              className="p-2 h-full innerHtml"
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex items-center justify-between w-1/2 gap-4">
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            onClick={() => tabsRef.current.setActiveTab(0)}
          >
            Previous
          </button>
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20" disabled={
              newCampaign?.template?.data === null ||
              newCampaign?.template === null ||
              newCampaign?.template?.data === ""
            }
            onClick={() => tabsRef.current.setActiveTab(2)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default ChooseTemplate;
