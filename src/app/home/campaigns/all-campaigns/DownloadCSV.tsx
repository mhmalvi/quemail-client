"use client";
import React, { useEffect, useState } from "react";
import { fetchAllItems } from "@/app/api/campaign";
import { showCampaignStore } from "@/store/store";
import { TbDownload } from "react-icons/tb";

interface Recipient {
  bounce: number;
  campaignID: number;
  click: number;
  createdAt: string;
  deliver: number;
  fromEmail: string;
  fromName: string;
  group: string;
  id: number;
  open: number;
  recipientEmail: string;
  recipientName: string;
  schedule: string;
  subject: string;
  subscription_status: number;
}

interface ResponseData {
  recipients: Recipient[];
}

const DownloadCSV: React.FC = () => {
  const [toDownload, setToDownload] = useState<ResponseData | null>(null);
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );

  useEffect(() => {
    if (toDownload && toDownload.recipients) {
      downloadCSV(toDownload.recipients);
    }
  }, [toDownload]);

  const handleDownload = async () => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
    };

    try {
      const res: ResponseData = await fetchAllItems(data);
      setToDownload(res);
    } catch (err) {
      console.log(err);
    }
  };

  const convertToCSV = (objArray: Recipient[], fields: string[]): string => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";

    fields.forEach((field) => {
      row += field + ",";
    });
    row = row.slice(0, -1);
    str += row + "\r\n";

    array.forEach((item: Recipient) => {
      let line = "";
      fields.forEach((field) => {
        if (line !== "") line += ",";
        line += item[field as keyof Recipient];
      });
      str += line + "\r\n";
    });

    return str;
  };

  const downloadCSV = (data: Recipient[]) => {
    const fields = [
      "bounce",
      "campaignID",
      "click",
      "createdAt",
      "deliver",
      "fromEmail",
      "fromName",
      "group",
      "id",
      "open",
      "recipientEmail",
      "recipientName",
      "schedule",
      "subject",
      "subscription_status",
    ];

    const csv = convertToCSV(data, fields);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "recipients.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 border rounded-md xl:px-4 xl:py-2 px-2 py-1 border-violet-200 dark:border-light-black cursor-pointer hover:text-slate-300 hover:bg-dark-black duration-300"
    >
      <TbDownload className="text-brand-color" />
      <p className="text-dark-black dark:text-slate-300 text-xs xl:text-base xl:p-0 p-1">
        CSV
      </p>
    </div>
  );
};

export default DownloadCSV;
