"use client";
import { campaignStore } from "@/store/store";
import React, { useState } from "react";

const CampaignInfo = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const handleInformation = (subject: string, name: string, mail: string) => {
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        subject: subject,
        fromName: name,
        fromMail: mail,
      },
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubject = e.target.value;
    setSubject(newSubject);
    handleInformation(newSubject, name, mail);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    handleInformation(subject, newName, mail);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMail = e.target.value;
    setMail(newMail);
    handleInformation(subject, name, newMail);
  };

  return (
    <div className="relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
      <h1 className="xl:text-xl text-brand-color font-semibold">
        Campaign Information
      </h1>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black text-sm">
          Subject Line
        </label>
        <input
          placeholder="What is the subject?"
          className="text-sm w-full px-4 xl:py-2 py-1 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black text-sm">
          From Name
        </label>
        <input
          placeholder="Who is sending?"
          className="text-sm w-full px-4 xl:py-2 py-1 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black text-sm">
          From Mail
        </label>
        <input
          placeholder="From which mail?"
          className="text-sm w-full px-4 xl:py-2 py-1 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
          value={mail}
          onChange={handleMailChange}
        />
      </div>
    </div>
  );
};
export default CampaignInfo;
