"use client";
import { useState, useEffect } from "react";
import { fetchCampaignItems } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown, Tabs, Tooltip } from "flowbite-react";
import {
  CampaignItemListType,
  CampaignListType,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";
interface CampaignProps {
  campaignName: string;
  senderName: string;
  senderEmail: string;
  count: number;
}
interface CampaignDetailsInterface {
  campaignDetails: CampaignProps | null;
}
const CampaignItems = ({ campaignDetails }: CampaignDetailsInterface) => {
  const [showTemplateData, setShowTemplateData] = useState<string | null>(null);
  const [itemIdClicked, setItemIdClicked] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const adjustScale = () => {
    const screenWidth = window.innerWidth;
    const newScale = screenWidth / 1200; // Example scaling factor
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

  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
      page: currentPage,
      per_page: 8,
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
  }, [clickedCampaignId, currentPage, setCampaignItemList]);

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
            <div className="flex items-center gap-4 w-1/2">
              <button
                onClick={() => {
                  setClickedCampaignId(null);
                }}
                className="h-8 w-8 flex items-center justify-center rounded-md text-dark-black dark:bg-brand-color dark:text-slate-300 bg-violet-50 font-semibold"
              >
                &lt;
              </button>
              <h1 className="w-full text-dark-black dark:text-slate-300">
                Campaign name: {campaignDetails?.campaignName}
              </h1>
            </div>
            <div className="w-1/4 flex flex-col p-2 border rounded-md">
              <h1 className="lg:text-sm text-xs">
                Sender Name: {campaignDetails?.senderName}
              </h1>
              <h1 className="lg:text-sm text-xs">
                Sender Email: {campaignDetails?.senderEmail}
              </h1>
              <h1 className="lg:text-sm text-xs">
                Sender Name: {campaignDetails?.count}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-4 w-1/2">
              <ListGroup className="relative rounded-none flex flex-col gap-0 w-full bg-transparent overflow-auto border-none">
                <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                  <p className="w-1/4 m-0 p-0 text-xs lg:text-sm text-slate-300">
                    Recipient Table
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between p-0 m-0">
                  <p className="w-1/4 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                    Name
                  </p>
                  <p className="w-1/4 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                    Email
                  </p>
                  <p className="w-1/4 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
                    Group
                  </p>
                  <p className="w-1/4 m-0 p-0 text-xs lg:text-sm text-slate-300">
                    Status
                  </p>
                </ListGroup.Item>
                {campaignItemList?.campaigns.map(
                  (item: CampaignItemListType, index: number) => {
                    return (
                      <div key={index}>
                        <ListGroup.Item
                          className="text-base flex items-center justify-center w-full gap-4"
                          onClick={() => {
                            setShowTemplateData(item.templateData);
                            setItemIdClicked(item.id);
                          }}
                          active={itemIdClicked === index}
                        >
                          <div className="w-1/4 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                            <Tooltip
                              content={item.recipientName}
                              className="bg-brand-color flex items-center"
                              placement="bottom"
                            >
                              {item.recipientName}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                            <Tooltip
                              content={item.recipientEmail}
                              className="bg-brand-color"
                              placement="bottom"
                            >
                              {item.recipientEmail}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                            <Tooltip
                              content={item.group}
                              className="bg-brand-color"
                              placement="bottom"
                            >
                              {item.group}
                            </Tooltip>
                          </div>
                          <div className="w-1/4 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                            <Tooltip
                              content={"status"}
                              className="bg-brand-color"
                              placement="bottom"
                            >
                              {item.open !== 0 ? (
                                <p>Seen</p>
                              ) : item.deliver !== 2 && item.deliver !== 0 ? (
                                <p>Sent</p>
                              ) : item.deliver === 2 ? (
                                <p>Failed/Bounced</p>
                              ) : (
                                <p>Sending</p>
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
            <div className="w-1/2">
              <div className="h-full dark:bg-dark-glass bg-violet-50 shadow-md rounded-md p-2 overflow-auto">
                {showTemplateData === null ? (
                  <p className="flex items-center justify-center h-full dark:text-slate-300 text-dark-black">
                    Select Recipients to Load Email
                  </p>
                ) : (
                  <div
                    className=" scale-based-on-the-width bg-[#F7F8F9] w-full h-full rounded-md"
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
