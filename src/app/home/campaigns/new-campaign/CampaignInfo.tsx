"use client";
import { fetchAddedMail } from "@/app/api/campaign";
import { fields } from "@/components/utils/staticData";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { campaignStore } from "@/store/store";
import { Dropdown, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
interface MailAdded {
  google?: {
    email: string;
    app_password: string;
    id: number;
  };
}
const CampaignInfo = () => {
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const [mailAdded, setMailAdded] = useState<MailAdded | null>(null);

  const [subject, setSubject] = useState("");
  const [fromName, setFromName] = useState("");
  const [mail, setMail] = useState<string | null>(null);
  const handleInformation = (
    subject: string,
    fromName: string,
    mail: string | null
  ) => {
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        subject: subject,
        fromName: fromName,
        fromMail: mail,
      },
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubject = e.target.value;
    setSubject(newSubject);
    handleInformation(newSubject, fromName, mail);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFromName(newName);
    handleInformation(subject, newName, mail);
  };

  const handleFromMailChange = (e: string | null) => {
    setMail(e);
    handleInformation(subject, fromName, e);
  };

  useEffect(() => {
    (async () => {
      const res = await fetchAddedMail();
      if (res?.status === 200) {
        setMailAdded(res.emails);
      } else if (res?.status === 422) {
        warningNotification(res.message);
      } else if (res?.status === 404) {
        warningNotification(res.message);
      } else {
        warningNotification("Something went wrong");
      }
    })();
  }, []);

  return (
    <div className="relative w-full  h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
      <div className="flex items-center justify-between">
        <h1 className="xl:text-xl text-brand-color font-semibold">
          Campaign Information
        </h1>
        <Tooltip
          content="Copy from available shortcodes into subject"
          className="bg-light-black"
        >
          <Dropdown
            label="Actions"
            placement="bottom-start"
            renderTrigger={() => (
              <div className="cursor-pointer flex items-center gap-2 bg-brand-color px-2 py-1 rounded-md">
                <h1 className="m-0 p-0 text-sm">Select dynamic headers</h1>
                <Image
                  src={Images.Copy}
                  alt="copy"
                  className="2xl:w-6 w-0 rounded-md dark:fill-text-slate-300 fill-dark-black"
                />
              </div>
            )}
          >
            {fields.map((items: any, index: number) => {
              return (
                <div key={index}>
                  <Dropdown.Item
                    className="dark:text-slate-300 text-light-black hover:text-gray-800"
                    onClick={() => {
                      navigator.clipboard.writeText(`{${items.label}}`);
                      successNotification(
                        `${items.label} copied to clipboard as {${items.label}}`
                      );
                    }}
                  >
                    {items?.label}
                  </Dropdown.Item>
                </div>
              );
            })}
          </Dropdown>
        </Tooltip>
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black text-sm">
          Subject Line
        </label>
        <input
          placeholder="What is the subject?"
          className="text-sm w-full px-4 xl:py-2 py-1 bg-transparent rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black"
          value={
            newCampaign?.campaignInfo !== null &&
            newCampaign?.campaignInfo?.subject
              ? newCampaign?.campaignInfo.subject
              : subject
          }
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
          value={
            newCampaign?.campaignInfo !== null &&
            newCampaign?.campaignInfo?.fromName
              ? newCampaign?.campaignInfo.fromName
              : fromName
          }
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="dark:text-slate-300 text-dark-black text-sm">
          From Mail
        </label>
        {mailAdded?.google ? (
          <Dropdown
            label="Actions"
            placement="bottom-start"
            renderTrigger={() => (
              <div className="disabled:opacity-50 cursor-pointer flex items-center justify-between text-sm w-full px-4 xl:py-2 py-1 bg-transparent duration-200 ease-in-out rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black">
                {mail !== null && newCampaign?.campaignInfo?.fromMail ? (
                  <div className="flex items-center justify-between w-full">
                    <span>
                      {mail !== null &&
                        newCampaign?.campaignInfo?.fromMail &&
                        // ? newCampaign?.campaignInfo.fromMail
                        mail}
                    </span>
                    <span>-</span>
                  </div>
                ) : (
                  <>
                    Select from Mail
                    <span>▼</span>
                  </>
                )}
              </div>
            )}
          >
            {mailAdded && mailAdded.google !== null && (
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-gray-800"
                onClickCapture={(e: any) => {
                  handleFromMailChange(e.target.textContent);
                }}
              >
                {mailAdded.google?.email}
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className="dark:text-slate-300 text-light-black hover:text-gray-800"
              onClick={() => {
                handleFromMailChange(null);
              }}
            >
              Clear
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <h1 className="text-sm dark:text-slate-300 text-dark-black">
            No from email Added
          </h1>
        )}
      </div>
    </div>
  );
};
export default CampaignInfo;
