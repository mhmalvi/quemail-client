"use client";
import { useState, useEffect } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown } from "flowbite-react";
import { RxUpdate } from "react-icons/rx";
import {
  CampaignListType,
  CampaignListResponse,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState<number | null>(8);
  const [customCampaignsPerPage, setCustomCampaignsPerPage] = useState<
    number | null
  >(null);
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
      per_page: campaignsPerPage,
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
  }, [campaignsPerPage, currentPage, setCampaignList]);

  const handlePerPage = (e: any) => {
    const value = Number(e.currentTarget.textContent);
    setCampaignsPerPage(value);
  };

  return (
    <>
      <div className="flex items-center justify-between text-dark-black dark:text-slate-300 border-b dark:border-slate-300 border-violet-50 py-4">
        <h1 className="w-full">Campaign List</h1>
        <div className="w-full flex items-center justify-center">
          <Dropdown
            label="Campaigns to show"
            dismissOnClick={true}
            size="sm"
            placement="bottom-end"
            
            renderTrigger={() => (
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm px-4 py-2 bg-brand-color rounded-md cursor-pointer text-white">
                  Campaigns per page - {campaignsPerPage}
                </span>
              </div>
            )}
          >
            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                8
              </div>
            </Dropdown.Item>

            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                10
              </div>
            </Dropdown.Item>

            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                12
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                14
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                16
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                18
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="flex items-center justify-center w-full p-0">
              <div className="w-full h-full p-2" onClick={handlePerPage}>
                20
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <ListGroup className="w-full bg-dark-glass overflow-auto">
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
