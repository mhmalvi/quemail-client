"use client";

import { Dropdown } from "flowbite-react";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { TbFilter } from "react-icons/tb";
import { io } from "socket.io-client";

const Filter = () => {
  const [searchValueByName, setSearchValueByName] = useState("");
  const [searchValueById, setSearchValueById] = useState("");

  const socket = io("https://backend.quemailer.com");
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  socket.connect();
  useEffect(() => {
    socket.emit("campaigns", {
      name: searchValueByName,
      userID: userID,
      page: 1,
      per_page: 8,
    });
    const handleMessage = (e: any) => {
      console.log(e);
      //   dispatch(setNotifications(e));
      //   setViewedData((prevData) => ({
      //     ...prevData,
      //     id: e.map((item) => item.id),
      //   }));
    };
    socket.on("campaigns", handleMessage);
    return () => {
      socket.off("campaigns");
      socket.disconnect();
    };
  }, [searchValueByName, socket, userID]);

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
            onChange={(e) => {
              setSearchValueByName(e.target.value);
            }}
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
            onChange={(e) => {
              console.log(e);
              setSearchValueById(e.target.value);
            }}
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
        <div className="h-64 w-full flex flex-col overflow-auto bg-violet-100">
          <Dropdown.Item></Dropdown.Item>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
