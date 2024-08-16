"use client";
import { useState, useEffect } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { Pagination, Tooltip, Table } from "flowbite-react";
import { showCampaignStore } from "@/store/store";
import NoContacts from "../../HomeLayoutUI/NoContacts";
import { useRouter } from "next/navigation";

const CampaignList = () => {
  const router = useRouter();
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
    const height = document.getElementById("tableHeight")?.clientHeight;

    if (window.innerWidth < 1650) {
      height !== undefined && setCampaignsPerPage(height / 42);
    } else {
      height !== undefined && setCampaignsPerPage(height / 60);
    }

    const revisedHeight =
      campaignsPerPage !== null && Math.floor(campaignsPerPage);

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
  }, [campaignsPerPage, currentPage, setCampaignList]);

  const handleCreateCampaign = () => {
    router.push("/home/campaigns/new-campaign");
  };

  return (
    <>
      {campaignList?.campaigns ? (
        <>
          <div
            className="flex flex-col gap-4 h-5/6 overflow-auto duration-200 ease-in-out"
            id="tableHeight"
          >
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
                      className="w-full dark:border-gray-700 dark:bg-transparent cursor-pointer"
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
      ) : (
        <div className="relative w-full h-full rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              onClick={() => {
                handleCreateCampaign();
              }}
              className="px-4 py-2 bg-brand-color rounded-md"
            >
              Create Campaigns
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default CampaignList;
