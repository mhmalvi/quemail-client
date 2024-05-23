"use client";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import SelectTemplate from "./SelectTemplate";
import CreateTemplateModal from "./CreateTemplateModal";

const ChooseTemplate = () => {
  const [chooseTemplate, setChooseTemplate] = useState<string>("")
  return (
    <div className="relative h-full w-full flex flex-col py-8 items-center justify-center dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
      <h1 className="xl:text-base text-sm dark:text-slate-300 text-dark-black w-1/2 text-center">
        If you&apos;re looking to launch a new campaign, you can easily create
        one. But you need to set up a template first.
      </h1>
      <div className="flex gap-4">
        <button className="xl:py-2 xl:px-4 py-1 px-2 bg-brand-color rounded-md text-slate-300 " onClick={()=>{
          setChooseTemplate("select")
        }}>
          Select a Template
        </button>
        <button className="xl:py-2 xl:px-4 py-1 px-2 bg-brand-color rounded-md text-slate-300" onClick={()=>{
          setChooseTemplate("create")
        }}>
          Create a Template
        </button>
      </div>
        <SelectTemplate chooseTemplate={chooseTemplate} setChooseTemplate={setChooseTemplate}/>
        <CreateTemplateModal chooseTemplate={chooseTemplate} setChooseTemplate={setChooseTemplate}/>
    </div>
  );
};
export default ChooseTemplate;