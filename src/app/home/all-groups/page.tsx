"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Dropdown } from "flowbite-react";
import NoContacts from "../HomeLayoutUI/NoContacts";
import ImportCSV from "./ImportCSV";
import { contactStore } from "@/store/store";
import { fetchGroups } from "@/app/api/groups";
import Images from "@/components/utils/images";
import Groups from "./Groups";
import GroupTable from "./GroupTable";
import { COL_CONTAINER_STYLES } from "@/components/styles/flex_col_container";
import {
  BIG_BUTTON_STYLES,
  BORDERED_BUTTON_STYLES,
} from "@/components/styles/button";
import ManualContact from "./ManualContact";
import { io } from "socket.io-client";

const AllContacts: React.FC = () => {
  const groupContacts = contactStore((state) => state.groupContacts);
  const allGroupList = contactStore((state) => state.allGroupList);
  const setAllGroupList = contactStore((state) => state.setAllGroupList);
  const setTotalPages = contactStore((state) => state.setTotalPages);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const setAllContactPerPage = contactStore(
    (state) => state.setAllContactPerPage
  );
  const allContactPerPage = contactStore((state) => state.allContactPerPage);
  const currentPage = contactStore((state) => state.currentPage);
  const socket = useMemo(() => io("https://backend.quemailer.com"), []);

  const [searchKeyword, setSearchKeyword] = useState<string>(""); // State to hold search keyword
  const [openModal, setOpenModal] = useState({
    show: "",
  });
  const [openAddContactModal, setOpenAddContactModal] =
    useState<boolean>(false);

  // Fetch contacts initially
  useEffect(() => {
    const height = document.getElementById("tableHeight")?.clientHeight;

    height !== undefined && setAllContactPerPage(height / 80);
    const revisedHeight = Math.floor(allContactPerPage);

    (async () => {
      try {
        const res = await fetchGroups(currentPage, revisedHeight);
        console.log(res?.groups);

        if (res.status === 200) {
          setAllGroupList(res?.groups);
          setTotalPages(res?.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    allContactPerPage,
    currentPage,
    setAllGroupList,
    setAllContactPerPage,
    setTotalPages,
  ]);

  // Handle search functionality via socket
  useEffect(() => {
    // Ensure the socket is connected only once at the start
    if (!socket.connected) {
      socket.connect();
    }

    const handleSearch = () => {
      socket.emit("contacts", {
        keyword: searchKeyword || "", // Use an empty string if searchKeyword is undefined
        userID: userID || "",
        page: currentPage,
        per_page: 8,
      });
    };

    // Trigger the search
    handleSearch();

    // Listen for the server's response
    const handleContacts = (data: any) => {
      // setAllGroupList(data.paginatedData);
      setTotalPages(data.totalPages);
    };

    socket.on("contacts", handleContacts);
    // Cleanup on component unmount or dependencies change
    return () => {
      socket.off("contacts", handleContacts);
      socket.disconnect(); // Optional, if you want to close the socket on unmount
    };
  }, [
    currentPage,
    searchKeyword,
    socket,
    userID,
    setAllGroupList,
    setTotalPages,
  ]);

  return (
    <>
      {Images.Edit && allGroupList && allGroupList !== null ? (
        <div id="tableHeight" className={COL_CONTAINER_STYLES}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              {/* <Groups /> */}
              <h1 className="flex gap-2 m-0 px-4 py-2 xl:text-base text-sm text-dark-black dark:text-slate-300">
                Showing:
                {groupContacts !== null ? (
                  <span className="text-brand-color">
                    {groupContacts[0].json.group}
                  </span>
                ) : (
                  <span className="text-brand-color">All Groups</span>
                )}
              </h1>
              <div className="flex justify-center items-center border border-violet-200 dark:border-light-black rounded-md">
                <input
                  className="w-full bg-transparent p-2 placeholder:text-xs rounded-md text-xs xl:text-base focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-brand-color outline-none"
                  placeholder="Search by Group"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword
                />
              </div>
            </div>
          </div>

          <GroupTable />
        </div>
      ) : (
        <div className="relative w-full h-full rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              className={BORDERED_BUTTON_STYLES}
              onClick={() => {
                setOpenModal({
                  show: "importContacts",
                });
              }}
            >
              Import
            </button>
            <button
              className={BIG_BUTTON_STYLES}
              onClick={() => {
                setOpenAddContactModal(true);
              }}
            >
              Add a contact
            </button>
          </div>
        </div>
      )}
      {openModal.show === "importContacts" && (
        <ImportCSV openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Modal
        dismissible
        show={openAddContactModal}
        onClose={() => setOpenAddContactModal(false)}
      >
        <Modal.Header>Add a Contact</Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 rounded-md">
          <ManualContact setOpenAddContactModal={setOpenAddContactModal} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllContacts;
