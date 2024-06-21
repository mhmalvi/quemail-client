"use client";
import { useState, useEffect } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { ListGroup, Pagination, Dropdown, Tooltip } from "flowbite-react";
import {
  CampaignListType,
} from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState<number | null>(8);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [idClicked, setIdClicked] = useState<number>();

  const campaignList = showCampaignStore((state) => state.campaignList);
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );

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
          setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [campaignsPerPage, currentPage, setCampaignList]);

  const handlePerPage = (e: any) => {
    const value = Number(e.currentTarget.textContent);
    setCampaignsPerPage(value);
    setCurrentPage(1)
  };

  return (
    <>
      <div className="flex items-center justify-between text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
        <h1 className="w-full text-dark-black dark:text-slate-300">
          Campaign List
        </h1>
        <div className="w-full flex items-center justify-end">
          <Dropdown
            label="Campaigns to show"
            dismissOnClick={true}
            size="sm"
            placement="bottom-end"
            renderTrigger={() => (
              <div className="flex items-center justify-center gap-4">
                <span className="2xl:text-sm md:text-xs px-4 py-2 bg-brand-color rounded-md cursor-pointer text-white">
                  Campaigns / page - {campaignsPerPage}
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
      <ListGroup className="relative flex flex-col w-full bg-dark-glass overflow-auto">
        <ListGroup.Item className="sticky top-0 bg-dark-black w-full flex items-center justify-between gap-2 p-0 m-0">
          <p className="w-2/5 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
            Campaign Name
          </p>
          <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-slate-300">
            Count
          </p>
          <p className="w-2/5 m-0 p-0 text-xs lg:text-sm text-slate-300">
            Campaign Name
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
                      setClickedCampaignId(item.id)
                    }}
                    className="text-base flex items-center justify-center w-full gap-2"
                  >
                    <div className="w-2/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                      <Tooltip
                        content={item.campaignName}
                        className="bg-brand-color"
                        placement="bottom"
                      >
                        {item.campaignName}
                      </Tooltip>
                    </div>
                    <p className="w-1/5 m-0 p-0 text-xs lg:text-sm">
                      {item.count}
                    </p>
                    <div className="w-2/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center xl:justify-center justify-start">
                      <Tooltip
                        content={item.fromMail}
                        className="bg-brand-color"
                        placement="bottom"
                      >
                        {item.fromMail}
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
    </>
  );
};
export default CampaignList;
