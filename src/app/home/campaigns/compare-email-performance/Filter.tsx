"use client";

import { fetchCampaignItems } from "@/app/api/campaign";
import {
  CampaignListType,
  FilterProps,
  nameFilterState,
} from "@/components/utils/types";
import { performanceStore, compareCampaignStore } from "@/store/store";
import { Dropdown, Spinner } from "flowbite-react";
import React, { useEffect, useMemo, useRef, useState, UIEvent } from "react";
import { TbFilter } from "react-icons/tb";
import { io } from "socket.io-client";

const Filter: React.FC<FilterProps> = ({ position }) => {
  const [searchValueByName, setSearchValueByName] = useState("");
  const [searchValueById, setSearchValueById] = useState("");
  const nameFilter = performanceStore((state) => state.nameFilter);
  const setNameFilter = performanceStore((state) => state.setNameFilter);
  const leftID = compareCampaignStore((state) => state.clickedCampaignId1);
  const rightID = compareCampaignStore((state) => state.clickedCampaignId2);
  const campaignDetails1 = compareCampaignStore(
    (state) => state.campaignDetails1
  );
  const campaignDetails2 = compareCampaignStore(
    (state) => state.campaignDetails2
  );
  const [leftFilterNameSelected, setLeftFilterNameSelected] =
    useState<String>("");
  const [rightFilterNameSelected, setRightFilterNameSelected] =
    useState<String>("");
  const setCampaignDetails1 = compareCampaignStore(
    (state) => state.setCampaignDetails1
  );
  const setCampaignDetails2 = compareCampaignStore(
    (state) => state.setCampaignDetails2
  );
  const setCompareCampaignId1 = compareCampaignStore(
    (state) => state.setClickedCampaignId1
  );
  const setCompareCampaignId2 = compareCampaignStore(
    (state) => state.setClickedCampaignId2
  );
  const setWinnerCampaign = compareCampaignStore(
    (state) => state.setWinnerCampaign
  );

  const [dataArray, setDataArray] = useState<CampaignListType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useMemo(() => io("https://backend.quemailer.com"), []);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (e: nameFilterState) => {
      if (searchValueByName.length < 1) {
        setCurrentPage(1);
      }
      setNameFilter({
        count: e.count,
        current_page: e.current_page,
        totalPages: e.totalPages,
        paginatedData: e.paginatedData,
      });

      setDataArray((prevDataArray) => {
        if (!prevDataArray) {
          return e.paginatedData;
        }

        const existingIds = new Set(prevDataArray.map((item) => item.id));
        const newItems = e.paginatedData.filter(
          (item) => !existingIds.has(item.id)
        );

        if (newItems.length === 0) {
          return prevDataArray;
        }

        return [...prevDataArray, ...newItems];
      });

      setLoading(false);
    };

    socket.on("campaigns", handleMessage);

    return () => {
      socket.off("campaigns", handleMessage);
      socket.disconnect();
    };
  }, [searchValueByName, setNameFilter, socket]);

  useEffect(() => {
    socket.connect();
    socket.emit("campaigns", {
      name: searchValueByName,
      userID: userID && userID,
      page: currentPage,
      per_page: 8,
    });
  }, [currentPage, searchValueByName, socket, userID]);

  const handleUIEvent = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (
      nameFilter?.totalPages &&
      currentPage < nameFilter?.totalPages &&
      isBottom
    ) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    const handleFilter1 = async () => {
      console.log("inside filter 1");
      const userIDString =
        typeof window !== "undefined" && localStorage.getItem("userID");
      const userID = userIDString ? parseInt(userIDString, 10) : null;

      const data1 = {
        userID: userID,
        campaignID: leftID,
        page: 1,
        per_page: 1,
      };
      try {
        const res = await fetchCampaignItems(data1);
        setCampaignDetails1(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    const handleFilter2 = async () => {
      console.log("inside filter 2");
      const userIDString =
        typeof window !== "undefined" && localStorage.getItem("userID");
      const userID = userIDString ? parseInt(userIDString, 10) : null;

      const data2 = {
        userID: userID,
        campaignID: rightID,
        page: 1,
        per_page: 1,
      };

      try {
        const res = await fetchCampaignItems(data2);
        setCampaignDetails2(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    if (state === 1) {
      handleFilter1();
    } else if (state === 2) {
      handleFilter2();
    }
    return setState(null);
  }, [leftID, rightID, setCampaignDetails1, setCampaignDetails2, state]);

  const handleSearchByNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataArray(null);
    setSearchValueByName(e.target.value);
    setCurrentPage(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleFilterSelect = (id: number, name: String) => {
    if (position === "left") {
      setLeftFilterNameSelected(name);
      setCompareCampaignId1(id);
      setState(1);
    }
    if (position === "right") {
      setRightFilterNameSelected(name);
      setCompareCampaignId2(id);
      setState(2);
    }
  };

  useEffect(() => {
    const compareCampaign = () => {
      var leftPoint = 0;
      var rightPoint = 0;
      if (campaignDetails1 == null || campaignDetails2 == null) {
        return null;
      }
      if (
        campaignDetails1?.open != null &&
        campaignDetails2?.open != null &&
        campaignDetails1.open > campaignDetails2.open
      ) {
        leftPoint += 1;
      }
      if (
        campaignDetails1?.open != null &&
        campaignDetails2?.open != null &&
        campaignDetails1.open < campaignDetails2.open
      ) {
        rightPoint += 1;
      }
      if (
        campaignDetails1?.subscribed != null &&
        campaignDetails2?.subscribed != null &&
        campaignDetails1.subscribed > campaignDetails2.subscribed
      ) {
        leftPoint += 1;
      }
      if (
        campaignDetails1?.subscribed != null &&
        campaignDetails2?.subscribed != null &&
        campaignDetails1.subscribed < campaignDetails2.subscribed
      ) {
        rightPoint += 1;
      }
      if (
        campaignDetails1?.bounce != null &&
        campaignDetails2?.bounce != null &&
        campaignDetails1.bounce < campaignDetails2.bounce
      ) {
        leftPoint += 1;
      }
      if (
        campaignDetails1?.bounce != null &&
        campaignDetails2?.bounce != null &&
        campaignDetails1.bounce > campaignDetails2.bounce
      ) {
        rightPoint += 1;
      }
      if (leftPoint > rightPoint) {
        return "left";
      } else if (leftPoint < rightPoint) {
        return "right";
      } else {
        return "draw";
      }
    };
    setWinnerCampaign(compareCampaign());
  }, [campaignDetails1, campaignDetails2, setWinnerCampaign]);

  const handleSearchByIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValueById(e.target.value);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div>
      <Dropdown
        label="Actions"
        placement="bottom-start"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="cursor-pointer flex items-center justify-between gap-4 bg-violet-50 dark:bg-dark-black border border-violet-200 dark:border-light-glass px-4 py-2 rounded-md z-30">
            <h1 className="m-0 p-0 xl:text-base text-xs dark:text-slate-300 text-dark-black">
              <h1 className="m-0 p-0 xl:text-base text-xs dark:text-slate-300 text-dark-black">
                {position === "left" && leftID
                  ? leftFilterNameSelected
                  : position === "right" && rightID
                  ? rightFilterNameSelected
                  : "Filter Campaigns"}
              </h1>
            </h1>
            <TbFilter className="text-dark-black dark:text-slate-300" />
          </div>
        )}
      >
        <Dropdown.Header className="border border-violet-200 dark:border-light-glass p-2 relative flex gap-2 rounded-t-md">
          <input
            value={searchValueByName}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={handleSearchByNameChange}
            placeholder="search by name"
            className={`${
              searchValueByName.length > 0
                ? "w-full flex justify-between gap-1"
                : searchValueById.length > 0
                ? "hidden"
                : ""
            } rounded-md bg-violet-200 dark:bg-light-black left-0 p-2 focus:outline-none focus:border-none border-none outline-none placeholder:text-sm placeholder:text-dark-black/40 dark:placeholder:text-slate-300/60 text-dark-black dark:text-slate-300`}
          />
          <input
            value={searchValueById}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={handleSearchByIdChange}
            className={`${
              searchValueById.length > 0
                ? "w-full flex justify-between gap-1"
                : searchValueByName.length > 0
                ? "hidden"
                : ""
            } rounded-md bg-violet-200 dark:bg-light-black left-0 p-2 focus:outline-none focus:border-none border-none outline-none placeholder:text-sm placeholder:text-dark-black/40 dark:placeholder:text-slate-300/60 text-dark-black dark:text-slate-300`}
            placeholder="search by id"
          />
        </Dropdown.Header>
        <div className="h-64 w-full overflow-hidden rounded-b-md ">
          <div
            className="h-64 w-full flex flex-col overflow-auto relative"
            onScrollCapture={handleUIEvent}
            ref={scrollContainerRef}
          >
            <div className="w-full flex items-center justify-between px-4 py-2 sticky top-0 bg-white dark:bg-dark-black border-b border-violet-200 dark:border-light-glass">
              <p className="p-0 text-brand-color">Campaign Name</p>
              <p className="p-0 text-brand-color">Id</p>
            </div>
            {dataArray &&
              dataArray.map((items, index) => {
                return (
                  <div key={index} className="m-0 p-0">
                    <Dropdown.Item className="flex py-0">
                      <div
                        onClick={() => {
                          handleFilterSelect(items.id, items.campaignName);
                        }}
                        className="w-full flex items-center justify-between py-2 top-0 border-b border-violet-50 dark:border-light-glass"
                      >
                        <p>{items.campaignName}</p>
                        <p>{items.id}</p>
                      </div>
                    </Dropdown.Item>
                  </div>
                );
              })}
            {loading && (
              <div className="w-full flex items-center justify-center p-4">
                <Spinner
                  color="purple"
                  aria-label="Purple spinner example"
                  size="xl"
                />
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
