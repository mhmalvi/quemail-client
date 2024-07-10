"use client";
import React, { useEffect, useState } from "react";
import { fetchAllItems } from "@/app/api/campaign";
import { showCampaignStore } from "@/store/store";

export const DownloadAllItems = () => {
  const [toDownload, setToDownload] = useState(null);
  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const clickedCampaignId = showCampaignStore(
      (state) => state.clickedCampaignId
    );

    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
    };

    (async () => {
      try {
        const res = await fetchAllItems(data);
        setToDownload(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  fetchAllItems;
};
