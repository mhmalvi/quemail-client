"use client";

import { CampaignListType, nameFilterState } from "@/components/utils/types";
import { performanceStore } from "@/store/store";
import { Dropdown, Spinner } from "flowbite-react";
import React, {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
  UIEvent,
} from "react";
import { TbFilter } from "react-icons/tb";
import { io } from "socket.io-client";

const Filter = () => {
  const [searchValueByName, setSearchValueByName] = useState("");
  const [searchValueById, setSearchValueById] = useState("");
  const nameFilter = performanceStore((state) => state.nameFilter);
  const setNameFilter = performanceStore((state) => state.setNameFilter);

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

  const handleSearchByNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataArray(null);
    setSearchValueByName(e.target.value);
    setCurrentPage(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

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
          <div className="cursor-pointer flex items-center justify-between gap-4 bg-dark-black border border-light-glass px-4 py-2 rounded-md z-30">
            <h1 className="m-0 p-0 xl:text-base text-xs ">Filter Campaigns</h1>
            <TbFilter />
          </div>
        )}
      >
        <Dropdown.Header className="border border-b-none dark:border-none p-2 relative flex gap-2 rounded-t-md">
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
            } rounded-md bg-dark-black dark:bg-light-black left-0 p-2 focus:outline-none focus:border-none border-none outline-none placeholder:text-sm placeholder:text-slate-300/60 text-slate-300`}
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
            } rounded-md bg-dark-black dark:bg-light-black left-0 p-2 focus:outline-none focus:border-none border-none outline-none placeholder:text-sm placeholder:text-slate-300/60 text-slate-300`}
            placeholder="search by id"
          />
        </Dropdown.Header>
        <div
          className="h-64 w-full flex flex-col overflow-auto relative"
          onScrollCapture={handleUIEvent}
          ref={scrollContainerRef}
        >
          <div className="w-full flex items-center justify-between px-4 py-2 sticky top-0 bg-white dark:bg-dark-black border-b dark:border-light-glass">
            <p className="p-0 text-brand-color">Campaign Name</p>
            <p className="p-0 text-brand-color">Id</p>
          </div>
          {dataArray &&
            dataArray.map((items, index) => {
              return (
                <div key={index}>
                  <Dropdown.Item className="flex">
                    <div className="w-full flex items-center justify-between py-2 top-0 border-b dark:border-light-glass">
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
      </Dropdown>
    </div>
  );
};

export default Filter;
