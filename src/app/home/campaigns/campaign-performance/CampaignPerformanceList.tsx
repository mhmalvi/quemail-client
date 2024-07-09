import { Table, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbX, TbCheck, TbUserSearch, TbDownload } from "react-icons/tb";
import { performanceStore, showCampaignStore } from "@/store/store";
import { fetchCampaign } from "@/app/api/campaign";
import { performanceTable } from "@/components/utils/types";

export const CampaignPerformanceList = () => {
  const campaignList = showCampaignStore((state) => state.campaignList);
  const allCampaignItemsPerPage = showCampaignStore(
    (state) => state.allCampaignItemsPerPage
  );
  const setAllCampaignItemsPerPage = showCampaignStore(
    (state) => state.setAllCampaignItemsPerPage
  );
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const leads = performanceStore((state) => state.leads);
  const setLeads = performanceStore((state) => state.setLeads);

  useEffect(() => {
    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;
    const data = {
      userID: userID,
      page: 1,
      per_page: 200,
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
  }, [allCampaignItemsPerPage, setAllCampaignItemsPerPage, setCampaignList]);
  console.log(leads);
  return (
    <>
      <div
        className="flex flex-col gap-4 h-full overflow-hidden"
        id="tableHeight"
      >
        <div className="h-1/6 w-full flex items-center justify-end gap-4">
          <div className="w-1/6 flex justify-center items-center border border-violet-200 dark:border-light-black rounded-md ">
            <input
              className="w-full bg-transparent pl-2 py-2 focus:ring-0 outline-none"
              placeholder="Search users"
            />
          </div>
          <div className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 border-violet-200 dark:border-light-black">
            <TbDownload className="text-brand-color" />
            <p className="text-dark-black dark:text-slate-300">CSV</p>
          </div>
        </div>
        <div className="flex w-full relative 2xl:h-96 xl:h-72 h-60 gap-4">
          <div
            className={`${
              leads.item && leads?.item?.length < 1 ? "w-full" : "w-5/6 "
            } duration-100 ease-in-out overflow-auto`}
          >
            <Table hoverable striped className="w-full relative sticky top-0 ">
              <Table.Head className="w-full ">
                <Table.HeadCell className="w-8 text-center ">
                  Selected
                </Table.HeadCell>
                <Table.HeadCell className="w-1/5 text-center ">
                  Campaign Name
                </Table.HeadCell>
                <Table.HeadCell className="w-1/5 text-center ">
                  Phone
                </Table.HeadCell>
                <Table.HeadCell className="w-1/5 text-center ">
                  Opened
                </Table.HeadCell>
                <Table.HeadCell className="w-1/5 text-center ">
                  Clicked
                </Table.HeadCell>
                <Table.HeadCell className="w-1/5 text-center">
                  Subscribed
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {campaignList?.campaigns !== null &&
                  campaignList?.campaigns.map((items: any, index) => {
                    return (
                      <Table.Row
                        key={index}
                        className="w-full dark:border-gray-700 dark:bg-transparent"
                        onClick={() => {
                          setLeads(index, items);
                        }}
                      >
                        <Table.Cell className="w-8 text-center">
                          <input
                            type="checkbox"
                            className="rounded-md bg-transparent checked:bg-brand-color dark:checked:bg-brand-color outline-none focus:ring-0"
                            checked={leads?.item?.some(
                              (lead) => lead.index === index
                            )}
                          />
                        </Table.Cell>
                        <Table.Cell className="w-full flex items-center justify-center text-gray-900 dark:text-white">
                          <Tooltip
                            content={items.campaignName}
                            className="bg-brand-color text-center"
                            placement="bottom"
                          >
                            {items.campaignName}
                          </Tooltip>
                        </Table.Cell>
                        <Table.Cell className="w-1/5 text-center">
                          +0123456789
                        </Table.Cell>

                        <Table.Cell className="w-1/5">
                          <div className="text-green-500 w-full text-center flex justify-center">
                            <TbCheck />
                          </div>
                        </Table.Cell>
                        <Table.Cell className="w-1/5 text-center">
                          <div className="text-red-500 w-full text-center flex justify-center">
                            <TbX />
                          </div>
                        </Table.Cell>
                        <Table.Cell className="w-1/5 text-center gap-4">
                          <div className="text-red-500 w-full text-center flex justify-center">
                            <TbX />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>

          <div
            className={
              leads.item && leads?.item?.length < 1
                ? "w-0 h-0 hidden"
                : "w-1/6 h-full contents relative dark:bg-dark-black"
            }
          >
            <div className="sticky top-0">ok</div>
          </div>
        </div>
      </div>
    </>
  );
};
