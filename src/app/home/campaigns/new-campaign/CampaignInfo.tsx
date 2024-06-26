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
const CampaignInfo = ({ tabsRef }: any) => {
  const [mailAdded, setMailAdded] = useState<MailAdded | null>(null);

  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSubject = e.target.value;
    // setSubject(newSubject);
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        ...prev.campaignInfo,
        subject: newSubject,
      },
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        ...prev.campaignInfo,
        fromName: newName,
      },
    }));
  };

  const handleFromMailChange = (e: string | null) => {
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        ...prev.campaignInfo,
        fromMail: e,
      },
    }));
  };

  const handleCampaignName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let campaignUniqueName = e.target.value;
    setNewCampaign((prev: any | null) => ({
      ...prev,
      campaignInfo: {
        ...prev.campaignInfo,
        campaignName: campaignUniqueName,
      },
    }));
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
  console.log(newCampaign);
  return (
    <div className="relative w-full flex flex-col items-center justify-center xl:py-16 py-4 px-4 gap-4 h-full">
      <div className="w-1/2 flex flex-col gap-4 bg-white shadow-md dark:bg-dark-glass rounded-md xl:p-16 p-8">
        <div className="flex flex-col w-full">
          <label className="dark:text-slate-300 text-dark-black text-sm xl:text-base">
            Campaign Name
          </label>
          <input
            placeholder="Add a name of the campaign"
            className="text-sm xl:text-base w-full px-4 xl:py-2 py-1 bg-light-glass rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black focus:ring-0 focus:outline-none"
            value={
              newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo?.campaignName
                ? newCampaign?.campaignInfo.campaignName
                : ""
            }
            onChange={handleCampaignName}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full items-center justify-between">
            <label className="dark:text-slate-300 text-dark-black text-sm xl:text-base">
              Subject Line
            </label>
            <div className="flex items-center justify-between">
              <Tooltip
                content="Copy from available shortcodes into subject"
                className="bg-brand-color xl:text-sm text-xs"
              >
                <Dropdown
                  label="Actions"
                  placement="bottom-start"
                  renderTrigger={() => (
                    <div className="cursor-pointer flex items-center gap-2 bg-dark-black border border-brand-color px-2 py-1 rounded-md">
                      <h1 className="m-0 p-0 xl:text-sm text-xs">
                        Select dynamic headers
                      </h1>
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
                          className="dark:text-slate-300 text-light-black hover:text-gray-800 xl:text-sm text-xs "
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
          </div>
          <textarea
            placeholder="What is the subject?"
            className="text-sm xl:text-base xl:max-h-28 lg:max-h-20 min-h-8 aria-expanded w-full px-4 xl:py-2 py-1 bg-light-glass rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black focus:ring-0 focus:outline-none outline-brand-color"
            value={
              newCampaign?.campaignInfo !== null &&
              newCampaign?.campaignInfo?.subject
                ? newCampaign?.campaignInfo.subject
                : ""
            }
            onChange={handleSubjectChange}
            rows={4}
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <div className="flex flex-col">
            <label className="dark:text-slate-300 text-dark-black text-sm xl:text-base">
              Sender Name
            </label>
            <input
              placeholder="Who is sending?"
              className="text-sm xl:text-base w-full px-4 xl:py-2 py-1 bg-light-glass rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black focus:ring-0 focus:outline-none"
              value={
                newCampaign?.campaignInfo !== null &&
                newCampaign?.campaignInfo?.fromName
                  ? newCampaign?.campaignInfo.fromName
                  : ""
              }
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="dark:text-slate-300 text-dark-black text-sm xl:text-base">
              From Mail
            </label>
            {mailAdded?.google ? (
              <Dropdown
                label="Actions"
                placement="bottom-start"
                renderTrigger={() => (
                  <div className="disabled:opacity-50 cursor-pointer flex items-center justify-between text-sm w-full px-4 xl:py-2 py-1 bg-light-glass duration-200 ease-in-out rounded-md border dark:border-dark-glass shadow-md dark:text-slate-300 text-dark-black">
                    {newCampaign?.campaignInfo?.fromMail !== null &&
                    newCampaign?.campaignInfo?.fromMail ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="dark:text-slate-300 text-dark-black text-sm xl:text-base">
                          {newCampaign?.campaignInfo?.fromMail !== null &&
                            newCampaign?.campaignInfo?.fromMail}
                        </span>
                        <span>-</span>
                      </div>
                    ) : (
                      <h1 className="dark:text-slate-300/75 text-dark-black/75 flex justify-between w-full text-sm xl:text-base">
                        Select from Mail
                        <span>▼</span>
                      </h1>
                    )}
                  </div>
                )}
              >
                {mailAdded && mailAdded.google !== null && (
                  <Dropdown.Item
                    className="dark:text-slate-300 text-light-black hover:text-gray-800 text-sm xl:text-base"
                    onClickCapture={(e: any) => {
                      handleFromMailChange(e.target.textContent);
                    }}
                  >
                    {mailAdded.google?.email}
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  className="dark:text-slate-300 text-light-black hover:text-gray-80 text-sm xl:text-base"
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
        <div className="flex items-center justify-end w-full gap-4 ">
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            disabled={
              newCampaign?.campaignInfo === null ||
              newCampaign?.campaignInfo.subject === null ||
              newCampaign?.campaignInfo.subject === "" ||
              newCampaign?.campaignInfo.fromMail === null ||
              newCampaign?.campaignInfo.fromMail === "" ||
              newCampaign?.campaignInfo.fromName === null ||
              newCampaign?.campaignInfo.fromName === "" ||
              newCampaign?.campaignInfo.campaignName === null ||
              newCampaign?.campaignInfo.campaignName === ""
            }
            onClick={() => tabsRef.current.setActiveTab(1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default CampaignInfo;
