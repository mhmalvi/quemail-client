"use client";
import { useState, useEffect } from "react";
import { fetchCampaignItems } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown, Tabs, Tooltip } from "flowbite-react";
import {
  CampaignItemListType,
  CampaignListType,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignItems = () => {
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );
  const campaignItemList = showCampaignStore((state) => state.campaignItemList);
  const setCampaignItemList = showCampaignStore(
    (state) => state.setCampaignItemList
  );

  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
      page: 1,
      per_page: 8,
    };
    (async () => {
      try {
        const res = await fetchCampaignItems(data);
        if (res.status === 200) {
          setCampaignItemList(res);

          //   setCampaignList(res);
          //   setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [clickedCampaignId, setCampaignItemList]);
  return (
    <>
      {campaignItemList?.campaigns !== null && (
        <div className="flex gap-4">
          <div className="w-1/2">
            <Tabs
              aria-label="Tabs with underline"
              className="w-full flex gap-0"
            >
              <Tabs.Item active title="Recipient Info">
                <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                  <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Recipient Name
                    </p>
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Recipient Email
                    </p>
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm text-slate-300">
                      Group
                    </p>
                  </ListGroup.Item>
                  {campaignItemList?.campaigns.map(
                    (item: CampaignItemListType, index: number) => {
                      return (
                        <div key={index}>
                          <ListGroup.Item className="text-base flex items-center justify-center w-full gap-4">
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.recipientName}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.recipientName}
                              </Tooltip>
                            </div>
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.recipientEmail}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.recipientEmail}
                              </Tooltip>
                            </div>
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.group}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.group}
                              </Tooltip>
                            </div>
                          </ListGroup.Item>
                        </div>
                      );
                    }
                  )}
                </ListGroup>
              </Tabs.Item>
            </Tabs>
          </div>
          <div className="w-1/2">
            <Tabs
              aria-label="Tabs with underline"
              className="w-full flex gap-0"
            >
              <Tabs.Item active title="Template Info">
                <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                  <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Subject
                    </p>
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Template Name
                    </p>
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm text-slate-300">
                      Template Data
                    </p>
                  </ListGroup.Item>
                  {campaignItemList?.campaigns.map(
                    (item: CampaignItemListType, index: number) => {
                      return (
                        <div key={index}>
                          <ListGroup.Item className="text-base flex items-center justify-center w-full gap-4">
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.subject}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.subject}
                              </Tooltip>
                            </div>
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.templateName}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.templateName}
                              </Tooltip>
                            </div>
                            <div className="w-1/3 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              {/* <Tooltip
                                content={item.templateData}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.templateData}
                              </Tooltip> */}
                              Popover here
                            </div>
                          </ListGroup.Item>
                        </div>
                      );
                    }
                  )}
                </ListGroup>
              </Tabs.Item>
              <Tabs.Item active title="Sender Info">
                <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                  <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                    <p className="w-1/2 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      From Name
                    </p>
                    <p className="w-1/2 m-0 p-0 text-xs lg:text-sm text-slate-300">
                      From Email
                    </p>
                   
                  </ListGroup.Item>
                  {campaignItemList?.campaigns.map(
                    (item: CampaignItemListType, index: number) => {
                      return (
                        <div key={index}>
                          <ListGroup.Item className="text-base flex items-center justify-center w-full gap-4">
                            <div className="w-1/2 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.fromName}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.fromName}
                              </Tooltip>
                            </div>
                            <div className="w-1/2 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.fromEmail}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.fromEmail}
                              </Tooltip>
                            </div>
                           
                          </ListGroup.Item>
                        </div>
                      );
                    }
                  )}
                </ListGroup>
              </Tabs.Item>
              <Tabs.Item active title="Tracking Info">
                <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                  <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Opened
                    </p>
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                      Bounced
                    </p>
                   
                    <p className="w-1/3 m-0 p-0 text-xs lg:text-sm text-slate-300">
                      Delivered
                    </p>
                   
                  </ListGroup.Item>
                  {campaignItemList?.campaigns.map(
                    (item: CampaignItemListType, index: number) => {
                      return (
                        <div key={index}>
                          <ListGroup.Item className="text-base flex items-center justify-center w-full gap-4">
                            <div className="w-1/2 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.open}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.open}
                              </Tooltip>
                            </div>
                            <div className="w-1/2 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.bounce}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.bounce}
                              </Tooltip>
                            </div>
                            <div className="w-1/2 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                              <Tooltip
                                content={item.deliver}
                                className="bg-brand-color"
                                placement="bottom"
                              >
                                {item.deliver}
                              </Tooltip>
                            </div>
                           
                          </ListGroup.Item>
                        </div>
                      );
                    }
                  )}
                </ListGroup>
              </Tabs.Item>
          
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignItems;
