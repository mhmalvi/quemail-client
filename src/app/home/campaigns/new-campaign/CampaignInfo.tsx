"use client";
import { fetchAddedMail } from "@/app/api/campaign";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { campaignStore } from "@/store/store";
import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
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
  const [name, setName] = useState("");
  const [mail, setMail] = useState<string | null>("");
  const handleInformation = (
    subject: string,
    name: string,
    mail: string | null
  ) => {
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
  const handleItemSelect = (e: string | null) => {
    setMail(e);
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
        {mailAdded?.google ? (
          <Dropdown
            label="Actions"
            placement="bottom-start"
            renderTrigger={() => (
              <div className="disabled:opacity-50 cursor-pointer flex items-center justify-between text-sm w-full px-4 xl:py-2 py-1 bg-transparent duration-200 ease-in-out rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black">
                {mail ? (
                  <span>{mail}</span>
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
                  handleItemSelect(e.target.textContent);
                }}
              >
                {mailAdded.google?.email}
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className="dark:text-slate-300 text-light-black hover:text-gray-800"
              onClick={() => {
                setMail("");
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
