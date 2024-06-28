"use client";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown, Tooltip } from "flowbite-react";
import { CampaignListType } from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState<number | null>(8);
  const [idClicked, setIdClicked] = useState<number>();

  const campaignList = showCampaignStore((state) => state.campaignList);
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );
  const setCampaignDetails = showCampaignStore(
    (state) => state.setCampaignDetails
  );

  useEffect(() => {
    const calculateCampaignsPerPage = () => {
      const viewportHeight = window.innerHeight;
      const campaignHeight = 62;
      const campaignsCount = Math.ceil(viewportHeight / campaignHeight);
      return campaignsCount;
    };
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const campaignsPerPage = calculateCampaignsPerPage();
    setCampaignsPerPage(campaignsPerPage);
    const data = {
      userID: userID,
      page: currentPage,
      per_page: campaignsPerPage,
    };
    (async () => {
      try {
        const res = await fetchCampaign(data);
        if (res.status === 200) {
          setCampaignList(res);
          setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [campaignsPerPage, currentPage, setCampaignList]);

  return (
    <>
      <div className="flex items-center justify-between text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
        <h1 className="w-full text-dark-black dark:text-slate-300">
          Campaign List
        </h1>
      </div>
      <ListGroup className="relative flex flex-col w-full bg-dark-glass overflow-auto">
        <ListGroup.Item className="sticky top-0 dark:bg-dark-black bg-violet-50 w-full flex items-center justify-between gap-2 p-0 m-0">
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
            Campaign Name
          </p>
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
            Sender Name
          </p>
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
            Sender Email
          </p>
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm text-dark-black dark:text-slate-300">
            No. of recipients
          </p>
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm text-dark-black dark:text-slate-300">
            Scheduled Date
          </p>
        </ListGroup.Item>
        {campaignList?.campaigns !== null &&
          campaignList?.campaigns.map(
            (item: CampaignListType, index: number) => {
              return (
                <div key={index}>
                  <ListGroup.Item
                    active={idClicked === index}
                    onClick={() => {
                      setIdClicked(index);
                      setClickedCampaignId(item.id);
                      setCampaignDetails({
                        campaignName: item.campaignName,
                        senderName: item.fromName,
                        senderEmail: item.fromMail,
                        count: item.count,
                      });
                    }}
                    className="text-base flex items-center justify-center w-full gap-2"
                  >
                    <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                      <Tooltip
                        content={item.campaignName}
                        className="bg-brand-color"
                        placement="bottom"
                      >
                        {item.campaignName}
                      </Tooltip>
                    </div>
                    <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                      {item.fromName}
                    </div>
                    <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                      <Tooltip
                        content={item.fromMail}
                        className="bg-brand-color"
                        placement="bottom"
                      >
                        {item.fromMail}
                      </Tooltip>
                    </div>
                    <p className="w-1/5 m-0 p-0 text-xs lg:text-sm">
                      {item.count}
                    </p>
                    <p className="w-1/5 m-0 p-0 text-xs lg:text-sm">
                      {item.updatedAt.split("T")[0]}
                    </p>
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
    </>
  );
};
export default CampaignList;
