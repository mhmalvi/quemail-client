"use client";
import { useState, useEffect } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { ListGroup, Pagination } from "flowbite-react";
import {
  CampaignListType,
  CampaignListResponse,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const campaignList = showCampaignStore((state) => state.campaignList);
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const [idClicked, setIdClicked] = useState<number>();

  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      page: currentPage,
      per_page: 8,
    };
    (async () => {
      try {
        const res = await fetchCampaign(data);
        if (res.status === 200) {
          setCampaignList(res);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentPage, setCampaignList]);

  return (
    <>
      <h1 className="text-dark-black dark:text-slate-300 border-b dark:border-slate-300 border-violet-50 py-4">
        Campaign List
      </h1>
      <ListGroup className="w-full bg-dark-glass ">
        {campaignList?.campaigns !== null &&
          campaignList?.campaigns.map(
            (item: CampaignListType, index: number) => {
              return (
                <div key={index}>
                  <ListGroup.Item
                    active={idClicked === index}
                    onClick={() => {
                      setIdClicked(index);
                    }}
                    className="text-base "
                  >
                    {item.campaignName}
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
          totalPages={3}
          onPageChange={setCurrentPage}
          previousLabel="<"
          nextLabel=">"
        />
      </div>
    </>
  );
};
export default CampaignList;
