"use client";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import {
  ListGroup,
  Pagination,
  Dropdown,
  Tooltip,
  Table,
} from "flowbite-react";
import { CampaignListType } from "@/components/utils/types";
import { showCampaignStore } from "@/store/store";

const CampaignList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState<number | null>(8);
  const [idClicked, setIdClicked] = useState<number>();

  const campaignList = showCampaignStore((state) => state.campaignList);
  const allCampaignItemsPerPage = showCampaignStore(
    (state) => state.allCampaignItemsPerPage
  );
  const setAllCampaignItemsPerPage = showCampaignStore(
    (state) => state.setAllCampaignItemsPerPage
  );
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );
  const setCampaignDetails = showCampaignStore(
    (state) => state.setCampaignDetails
  );

  useEffect(() => {
    const height = document.getElementById("tableHeight")?.clientHeight;

    height !== undefined && setAllCampaignItemsPerPage(height / 80);
    const revisedHeight = Math.floor(allCampaignItemsPerPage);

    const userIDString =
      typeof window !== "undefined" && localStorage.getItem("userID");
    const userID = userIDString ? parseInt(userIDString, 10) : null;

    const data = {
      userID: userID,
      page: currentPage,
      per_page: revisedHeight,
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
  }, [
    allCampaignItemsPerPage,
    campaignsPerPage,
    currentPage,
    setAllCampaignItemsPerPage,
    setCampaignList,
  ]);

  return (
    <>
      <div className="flex flex-col gap-4 h-5/6 overflow-auto" id="tableHeight">
        <Table hoverable striped>
          <Table.Head className="w-full ">
            <Table.HeadCell className="w-1/5 sticky text-center ">
              Campaign Name
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center ">
              Sender Name
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center ">
              Sender Email
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center ">
              No. of recipients
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center">
              Scheduled Date
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {campaignList?.campaigns !== null &&
              campaignList?.campaigns.map((items: any, index) => (
                <Table.Row
                  key={index}
                  className="w-full dark:border-gray-700 dark:bg-transparent"
                  onClick={() => {
                    setIdClicked(index);
                    setClickedCampaignId(items.id);
                    setCampaignDetails({
                      campaignName: items.campaignName,
                      senderName: items.fromName,
                      senderEmail: items.fromMail,
                      count: items.count,
                    });
                  }}
                >
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
                    {items.fromName}
                  </Table.Cell>

                  <Table.Cell className="w-full flex items-center justify-center text-center">
                    <Tooltip
                      content={items.fromMail}
                      className="bg-brand-color"
                      placement="bottom"
                    >
                      {items.fromMail}
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell className="w-1/5 text-center">
                    {items.count}
                  </Table.Cell>
                  <Table.Cell className="w-1/5 text-center gap-4">
                    {items.updatedAt.split("T")[0]}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <div className="w-full flex items-center justify-center rounded-md">
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