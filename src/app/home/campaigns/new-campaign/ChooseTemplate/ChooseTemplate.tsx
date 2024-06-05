"use client";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import SelectTemplate from "./SelectTemplate";
import CreateTemplateModal from "./CreateTemplateModal";
import { campaignStore } from "@/store/store";

const ChooseTemplate = () => {
  const [chooseTemplate, setChooseTemplate] = useState<string>("");
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  return (
    <>
      {newCampaign?.template === undefined || newCampaign?.template === null ? (
        <div className="relative h-full w-full flex flex-col py-8 items-center justify-center dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
          <h1 className="xl:text-base text-xs dark:text-slate-300 text-dark-black w-1/2 text-center">
            If you&apos;re looking to launch a new campaign, you can easily
            create one. But you need to set up a template first.
          </h1>
          <div className="flex gap-4">
            <button
              className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-xs bg-brand-color rounded-md text-slate-50 "
              onClick={() => {
                setChooseTemplate("select");
              }}
            >
              Select a Template
            </button>
            <button
              className="xl:py-2 xl:px-4 py-1 px-2 xl:text-base text-xs bg-brand-color rounded-md text-slate-50"
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
        <div className="relative  h-full w-full flex flex-col py-8 items-center justify-center dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
          <h1>Template Selected: {newCampaign.template.name}</h1>
          <button
            className="bg-red-500 px-4 py-2 text-slate-50 xl:text-base text-sm"
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
      )}
    </>
  );
};
export default ChooseTemplate;
