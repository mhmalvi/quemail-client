"use client";
import { useState, useEffect } from "react";
import { fetchCampaignItems } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown, Tooltip } from "flowbite-react";
import { CampaignListType } from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignItems = () => {
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );
  console.log(clickedCampaignId);
  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      campaignID:clickedCampaignId,
      page: 1,
      per_page: 8,
    };
    (async () => {
      try {
        const res = await fetchCampaignItems(data);
        if (res.status === 200) {
            console.log(res)
        //   setCampaignList(res);
        //   setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [clickedCampaignId]);
  return <div></div>;
};

export default CampaignItems;
