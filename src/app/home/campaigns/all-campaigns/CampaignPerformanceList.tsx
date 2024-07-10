"use client";
import { Pagination, Table, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbX, TbCheck, TbDownload } from "react-icons/tb";
import { performanceStore, showCampaignStore } from "@/store/store";
import { fetchCampaignItems } from "@/app/api/campaign";
import { CampaignItemListType } from "@/components/utils/types";
import { DownloadAllItems } from "./DownloadAllItems";

const CampaignPerformanceList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [perPage, setPerPage] = useState(window.innerWidth < 1400 ? 4 : 6);
  const clickedCampaignId = showCampaignStore(
    (state) => state.clickedCampaignId
  );
  const setCampaignItemList = showCampaignStore(
    (state) => state.setCampaignItemList
  );
  const campaignItemList = showCampaignStore((state) => state.campaignItemList);
  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.outerWidth < 1366 ? 6 : 4);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;

    const data = {
      userID: userID,
      campaignID: clickedCampaignId,
      page: currentPage,
      per_page: perPage,
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
  }, [clickedCampaignId, currentPage, perPage, setCampaignItemList]);

  const leads = performanceStore((state) => state.leads);
  const setLeads = performanceStore((state) => state.setLeads);

  return (
    <>
      {campaignItemList?.recipients !== null && (
        <div className="flex flex-col gap-4 h-full">
          <div className="h-1/6 w-full flex items-center justify-end gap-4">
            <div className="w-1/6 flex justify-center items-center border border-violet-200 dark:border-light-black rounded-md">
              <input
                className="w-full bg-transparent p-2 placeholder:text-xs text-xs xl:text-base focus:ring-0 outline-none"
                placeholder="Search users"
              />
            </div>
            <div onClick={DownloadAllItems} className="flex items-center justify-center gap-2 border rounded-md xl:px-4 xl:py-2 px-2 py-1 border-violet-200 dark:border-light-black">
              <TbDownload className="text-brand-color" />
              <p className="text-dark-black dark:text-slate-300 text-xs xl:text-base xl:p-0 p-1">
                CSV
              </p>
            </div>
          </div>
          <div className="flex w-full relative gap-4">
            <div
              className={`${
                leads.item && leads?.item?.length < 1
                  ? "w-full duration-100 ease-in-out flex flex-col gap-4"
                  : "w-5/6 duration-100 ease-in-out flex flex-col gap-4"
              }`}
            >
              <div>
                <Table
                  hoverable
                  striped
                  className="w-full relative sticky top-0"
                >
                  <Table.Head className="w-full">
                    <Table.HeadCell className="w-8 text-center">
                      Selected
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/5 text-center">
                      Recipient Name
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/5 text-center">
                      Email
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/5 text-center">
                      Opened
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/5 text-center">
                      Clicked
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/5 text-center">
                      Subscribed
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {campaignItemList?.recipients.map(
                      (items: CampaignItemListType, index) => (
                        <Table.Row
                          key={index}
                          className="w-full dark:border-gray-700 dark:bg-transparent"
                          onClick={() => setLeads(index, items)}
                        >
                          <Table.Cell className="w-8 text-center">
                            <input
                              type="checkbox"
                              readOnly
                              className="rounded-md bg-transparent checked:bg-brand-color dark:checked:bg-brand-color outline-none focus:ring-0"
                              checked={leads?.item?.some(
                                (lead) => lead.index === index
                              )}
                            />
                          </Table.Cell>
                          <Table.Cell className="w-full flex items-center justify-center text-gray-900 dark:text-white">
                            <Tooltip
                              content={items.recipientName}
                              className="bg-brand-color text-center"
                              placement="bottom"
                            >
                              {items.recipientName}
                            </Tooltip>
                          </Table.Cell>
                          <Table.Cell className="w-1/5 text-center">
                            {items.recipientEmail}
                          </Table.Cell>
                          <Table.Cell className="w-1/5">
                            <div
                              className={`${
                                items.open === 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              } w-full text-center flex justify-center`}
                            >
                              {items.open === 0 ? <TbX /> : <TbCheck />}
                            </div>
                          </Table.Cell>
                          <Table.Cell className="w-1/5 text-center">
                            <div className="text-red-500 w-full text-center flex justify-center">
                              <TbX />
                            </div>
                          </Table.Cell>
                          <Table.Cell className="w-1/5 text-center gap-4">
                            <div
                              className={`${
                                items.subscription_status === 0
                                  ? "text-red-500"
                                  : items.subscription_status === 1
                                  ? "text-green-500"
                                  : "text-orange-300"
                              } w-full text-center flex justify-center`}
                            >
                              {items.subscription_status === 0 ? (
                                <TbX />
                              ) : items.subscription_status === 1 ? (
                                <TbCheck />
                              ) : (
                                <p>N/A</p>
                              )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </Table>
              </div>
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

            <div
              className={
                leads.item && leads?.item?.length < 1
                  ? "w-0 h-0 hidden"
                  : "w-1/6 h-full contents relative dark:bg-dark-black"
              }
            >
              <div className="sticky top-0 h-full w-1/6 flex flex-col items-center justify-center gap-4 rounded-md">
                <button className="border border-violet-200 dark:border-light-glass px-4 py-2 rounded-md w-2/3">
                  Add to group
                </button>
                <button className="border border-violet-200 dark:border-light-glass px-4 py-2 rounded-md w-2/3">
                  Reply
                </button>
                <button className="border border-violet-200 dark:border-light-glass px-4 py-2 rounded-md w-2/3">
                  Action 3
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignPerformanceList;
