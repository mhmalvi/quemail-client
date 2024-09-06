"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchCampaign } from "@/app/api/campaign";
import { Pagination, Tooltip, Table, Checkbox } from "flowbite-react"; // Ensure these imports are correct
import { showCampaignStore, contactStore } from "@/store/store"; // Make sure this import is correct
import NoContacts from "../../HomeLayoutUI/NoContacts"; // Ensure this is correctly exported from its module
import { useRouter } from "next/navigation"; // Correct import for Next.js router
import { io } from "socket.io-client";

import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { destroyCampaign } from "@/app/api/campaign";

const CampaignList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState<number | null>(8);
  const [idClicked, setIdClicked] = useState<number>();
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const socket = useMemo(() => io("https://backend.quemailer.com"), []);

  const campaignList = showCampaignStore((state) => state.campaignList);
  const setCampaignList = showCampaignStore((state) => state.setCampaignList);
  const setClickedCampaignId = showCampaignStore(
    (state) => state.setClickedCampaignId
  );
  const setCampaignDetails = showCampaignStore(
    (state) => state.setCampaignDetails
  );

  // Fetch campaign data
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
      name: searchKeyword, // Use debounced keyword here
    };

    (async () => {
      try {
        const res = await fetchCampaign(data);
        if (res.status === 200) {
          console.log(res);

          setCampaignList(res);
          setTotalPage(res.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [campaignsPerPage, currentPage, setCampaignList, searchKeyword]);

  // Handle search functionality via socket
  useEffect(() => {
    // Ensure the socket is connected only once at the start
    if (!socket.connected) {
      socket.connect();
    }

    const handleSearch = () => {
      socket.emit("campaigns", {
        name: searchKeyword || "", // Use an empty string if searchKeyword is undefined
        userID: userID || "",
        page: currentPage,
        per_page: 8,
      });
    };

    // Trigger the search
    handleSearch();

    // Listen for the server's response
    const handleCampaigns = (data: any) => {
      console.log(data);
      
      setCampaignList(data);
      setTotalPage(data.totalPages);
    };

    socket.on("campaigns", handleCampaigns);
    // Cleanup on component unmount or dependencies change
    return () => {
      socket.off("campaigns", handleCampaigns);
      socket.disconnect(); // Optional, if you want to close the socket on unmount
    };
  }, [
    currentPage,
    searchKeyword,
    socket,
    userID,
    setCampaignList,
    setTotalPage,
  ]);

  // Handle create campaign button click
  const handleCreateCampaign = () => {
    router.push("/home/campaigns/new-campaign");
  };

  // Handle select/deselect campaign
  const handleSelectCampaign = (id: number) => {
    setSelectedCampaigns((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((campaignId) => campaignId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle select all campaigns
  const handleSelectAllCampaigns = () => {
    if (selectAll) {
      setSelectedCampaigns([]);
    } else {
      const allCampaignIds =
        campaignList?.paginatedData?.map((campaign: any) => campaign.id) || [];
      setSelectedCampaigns(allCampaignIds);
    }
    setSelectAll(!selectAll);
  };

  // Use useEffect to dynamically update "Select All" checkbox state
  useEffect(() => {
    const allCampaignIds =
      campaignList?.paginatedData?.map((campaign: any) => campaign.id) || [];
    if (
      selectedCampaigns.length === allCampaignIds.length &&
      allCampaignIds.length > 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCampaigns, campaignList]);

  // Function to handle deleting selected groups
  const handleDeleteCampaign = async () => {
    if (selectedCampaigns.length > 0) {
      const res = await destroyCampaign(selectedCampaigns);
      console.log(res);

      if (res.status === 201) {
        successNotification(res.message);

        window.location.href =
          window.location.pathname + "?reload=" + new Date().getTime();
      } else {
        warningNotification("Something went wrong. Please try again.");
      }
    } else {
      console.log("No groups selected for deletion");
    }
  };

  return (
    <>
      {campaignList?.paginatedData ? (
        <>
          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="flex items-center justify-center gap-4">
              <h1 className="flex gap-2 m-0 px-4 py-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                Showing: <span className="text-brand-color">All Campaigns</span>
              </h1>
              <div className="flex justify-center items-center border border-violet-200 dark:border-light-black rounded-md">
                <input
                  className="w-full bg-transparent p-2 placeholder:text-xs rounded-md text-xs xl:text-base focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-brand-color outline-none"
                  placeholder="Search by Campaign Name / Sender Name / Email"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)} // Search keyword updated on keystroke
                />
              </div>
            </div>
            {/* Delete Button */}
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleDeleteCampaign}
            >
              Delete Selected
            </button>
          </div>

          <div
            className="flex flex-col gap-4 h-5/6 overflow-auto duration-200 ease-in-out"
            id="tableHeight"
          >
            <Table hoverable striped>
              <Table.Head className="w-full">
                <Table.HeadCell className="w-1/12 text-center">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllCampaigns}
                  />
                </Table.HeadCell>
                <Table.HeadCell className="w-1/6">Campaign Name</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Sender Name</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Sender Email</Table.HeadCell>
                <Table.HeadCell className="w-1/6">
                  No. of recipients
                </Table.HeadCell>
                <Table.HeadCell className="w-1/6">Created At</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Scheduled At</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {campaignList?.paginatedData !== null &&
                  campaignList?.paginatedData.map((items, index) => (
                    <Table.Row
                      key={index}
                      className="w-full dark:border-gray-700 dark:bg-transparent"
                    >
                      <Table.Cell className="w-1/12 text-center">
                        <Checkbox
                          checked={selectedCampaigns.includes(items.id)}
                          onChange={() => handleSelectCampaign(items.id)}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-1/6">
                        <Tooltip
                          content={items.campaignName}
                          className="bg-brand-color"
                          placement="bottom"
                        >
                          {items.campaignName}
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell className="w-1/6">
                        {items.fromName}
                      </Table.Cell>
                      <Table.Cell className="w-1/6">
                        <Tooltip
                          content={items.fromMail}
                          className="bg-brand-color"
                          placement="bottom"
                        >
                          {items.fromMail}
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell className="w-1/6">{items.count}</Table.Cell>
                      <Table.Cell className="w-1/6">
                        {items.updatedAt.split("T")[0]}
                      </Table.Cell>
                      <Table.Cell className="w-1/6">
                        {new Date(items.schedule).toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          className="px-4 py-2 bg-brand-color text-white rounded-md flex items-center justify-center gap-2"
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
                          View
                        </button>
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
