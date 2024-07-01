"use client";
import { useState, useEffect } from "react";
import { fetchCampaignItems } from "@/app/api/campaign";
import { ListGroup, Pagination, Tooltip } from "flowbite-react";
import {
  TbProgress,
  TbProgressX,
  TbProgressCheck,
  TbChecks,
} from "react-icons/tb";

import {
  CampaignItemListType,
  CampaignListType,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignItems = () => {
  const [showTemplateData, setShowTemplateData] = useState<string | null>(null);
  const [itemIdClicked, setItemIdClicked] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const setAllCampaignItemsPerPage = showCampaignStore(
    (state) => state.setAllCampaignItemsPerPage
  );
  const allCampaignItemsPerPage = showCampaignStore(
    (state) => state.allCampaignItemsPerPage
  );

  const adjustScale = () => {
    const screenWidth = window.innerWidth;
    const newScale = screenWidth / 1200;
    setScale(newScale < 1 ? newScale : 1);
  };
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );
  const campaignItemList = showCampaignStore((state) => state.campaignItemList);
  const setCampaignItemList = showCampaignStore(
    (state) => state.setCampaignItemList
  );
  const campaignDetails = showCampaignStore((state) => state.campaignDetails);

  useEffect(() => {
    const height = document.getElementById("tableHeight")?.clientHeight;

    height !== undefined && setAllCampaignItemsPerPage(height / 80);
    const revisedHeight = Math.floor(allCampaignItemsPerPage);

    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
      page: currentPage,
      per_page: revisedHeight,
    };
    (async () => {
      try {
        const res = await fetchCampaignItems(data);
        if (res.status === 200) {
          setCampaignItemList(res);
          setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [allCampaignItemsPerPage, clickedCampaignId, currentPage, setAllCampaignItemsPerPage, setCampaignItemList]);

  useEffect(() => {
    window.addEventListener("resize", adjustScale);
    adjustScale();
    return () => window.removeEventListener("resize", adjustScale);
  }, []);

  return (
    <>
      {campaignItemList?.campaigns !== null && (
        <>
          <div className="flex items-center justify-between gap-4 text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
            <div className="flex items-center gap-4 lg:w-1/2 w-1/3">
              <button
                onClick={() => {
                  setClickedCampaignId(null);
                }}
                className="h-8 w-8 flex items-center justify-center rounded-md text-dark-black dark:bg-brand-color dark:text-slate-300 bg-violet-50 font-semibold"
              >
                &lt;
              </button>
              <h1 className="text-dark-black dark:text-slate-300 lg:text-sm text-xs">
                Campaign name:{" "}
                <span className="text-green-500 font-semibold">
                  {campaignDetails?.campaignName}
                </span>
              </h1>
            </div>
            <h1 className="lg:text-sm text-xs m-0 px-2">
              Sender Name:{" "}
              <span className="text-green-500 font-semibold">
                {campaignDetails?.senderName}
              </span>
            </h1>
            <h1 className="lg:text-sm text-xs m-0 px-2">
              Sender Email:{" "}
              <span className="text-green-500 font-semibold">
                {campaignDetails?.senderEmail}
              </span>
            </h1>
            <div className="w-1/8 h-full flex flex-col justify-center p-2 border rounded-md">
              <h1 className="lg:text-sm text-xs">
                Total Recipients:{" "}
                <span className="text-green-500 font-semibold">
                  {campaignDetails?.count}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex gap-4 h-full">
            <div className="flex flex-col items-center gap-4 w-1/2 h-5/6">
              <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                <div className="sticky top-0 bg-dark-black w-full flex items-center justify-center py-2 m-0">
                  <p className="w-full m-0 p-0 text-sm text-center text-slate-300">
                    Recipient Table
                  </p>
                </div>
                <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                  <p className="w-1/4 m-0 p-0 text-xs border-r text-slate-300">
                    Name
                  </p>
                  <p className="w-1/4 m-0 p-0 text-xs border-r text-slate-300">
                    Email
                  </p>
                  <p className="w-1/4 m-0 p-0 text-xs border-r text-slate-300">
                    Group
                  </p>
                  <div className="w-1/4 flex items-center justify-center">
                    <Tooltip
                      content={
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="flex gap-1 items-center justify-start">
                            <p className="text-blue-500">
                              <TbChecks />
                            </p>

                            <p className="text-xs">: Seen</p>
                          </div>
                          <div className="flex gap-1 items-center justify-start">
                            <p className="text-green-500">
                              <TbProgressCheck />
                            </p>
                            <p className="text-xs">: Delivered</p>
                          </div>
                          <div className="flex gap-1 items-center justify-start">
                            <p className="text-red-500">
                              <TbProgressX />
                            </p>
                            <p className="text-xs">: Bounced/Failed</p>
                          </div>
                          <div className="flex gap-1 items-center justify-start">
                            <p className="text-orange-300">
                              <TbProgress />
                            </p>
                            <p className="text-xs">: In Progress</p>
                          </div>
                        </div>
                      }
                      className="bg-dark-black"
                      placement="bottom"
                    >
                      <p className="w-full m-0 p-0 text-xs text-slate-300">
                        Status
                      </p>
                    </Tooltip>
                  </div>
                </ListGroup.Item>
                {campaignItemList?.campaigns.map(
                  (item: CampaignItemListType, index: number) => {
                    return (
                      <div key={index}>
                        <ListGroup.Item
                          className="text-base flex items-center justify-center w-full gap-4"
                          onClick={() => {
                            setShowTemplateData(null);
                            setShowTemplateData(item.templateData);
                            setItemIdClicked(item.id);
                          }}
                          active={itemIdClicked === index}
                        >
                          <div className="w-1/4 m-0 p-0 text-xs truncate flex items-center justify-center">
                            <Tooltip
                              content={item.recipientName}
                              className="bg-brand-color flex items-center"
                              placement="bottom"
                            >
                              {item.recipientName}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 text-xs truncate flex items-center justify-center">
                            <Tooltip
                              content={item.recipientEmail}
                              className="bg-brand-color"
                              placement="bottom"
                            >
                              {item.recipientEmail}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 text-xs truncate flex items-center justify-center">
                            <Tooltip
                              content={item.group}
                              className="bg-brand-color"
                              placement="bottom"
                            >
                              {item.group}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 truncate text-xl flex items-center justify-center">
                            <Tooltip
                              content={
                                <div className="flex flex-col items-start justify-start gap-1">
                                  {item.open !== 0 ? (
                                    <div className="flex gap-1 items-center justify-start">
                                      <p className="text-blue-500">
                                        <TbChecks />
                                      </p>

                                      <p className="text-xs">: Seen</p>
                                    </div>
                                  ) : item.deliver !== 2 &&
                                    item.deliver !== 0 ? (
                                    <div className="flex gap-1 items-center justify-start">
                                      <p className="text-green-500">
                                        <TbProgressCheck />
                                      </p>
                                      <p className="text-xs">: Delivered</p>
                                    </div>
                                  ) : item.deliver === 2 ? (
                                    <div className="flex gap-1 items-center justify-start">
                                      <p className="text-red-500">
                                        <TbProgressX />
                                      </p>
                                      <p className="text-xs">
                                        : Bounced/Failed
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex gap-1 items-center justify-start">
                                      <p className="text-orange-300">
                                        <TbProgress />
                                      </p>
                                      <p className="text-xs">: In Progress</p>
                                    </div>
                                  )}
                                </div>
                              }
                              className="bg-dark-black"
                              placement="bottom"
                            >
                              {item.open !== 0 ? (
                                <p className="text-blue-500">
                                  <TbChecks />
                                </p>
                              ) : item.deliver !== 2 && item.deliver !== 0 ? (
                                <p className="text-green-500">
                                  <TbProgressCheck />
                                </p>
                              ) : item.deliver === 2 ? (
                                <p className="text-red-500">
                                  <TbProgressX />
                                </p>
                              ) : (
                                <p className="text-orange-300">
                                  <TbProgress />
                                </p>
                              )}
                            </Tooltip>
                          </div>
                        </ListGroup.Item>
                      </div>
                    );
                  }
                )}
              </ListGroup>
              <div className="w-full flex items-center justify-center">
                <Pagination
                  layout="pagination"
                  currentPage={currentPage}
                  totalPages={totalPage}
                  onPageChange={setCurrentPage}
                  previousLabel="<"
                  nextLabel=">"
                />
              </div>
            </div>
            <div className="w-1/2 h-full overflow-auto">
              <div className="flex items-center justify-center dark:bg-dark-glass bg-violet-50 shadow-md rounded-md p-2 overflow-auto">
                {showTemplateData === null ? (
                  <p className="flex items-center justify-center w-full h-full dark:text-slate-300 text-dark-black">
                    Select Recipients to Load Email
                  </p>
                ) : (
                  <div
                    className="bg-[#F7F8F9] "
                    style={{
                      transform: `scale(${scale})`,
                      transition: "transform 0.2s",
                    }}
                    dangerouslySetInnerHTML={{ __html: `${showTemplateData}` }}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CampaignItems;
