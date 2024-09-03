"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Dropdown } from "flowbite-react";
import NoContacts from "../HomeLayoutUI/NoContacts";
import ImportCSV from "./ImportCSV";
import { contactStore } from "@/store/store";
import { fetchContact } from "@/app/api/contact";
import Images from "@/components/utils/images";
import Groups from "./Groups";
import ContactTable from "./ContactTable";
import { COL_CONTAINER_STYLES } from "@/components/styles/flex_col_container";
import {
  BIG_BUTTON_STYLES,
  BORDERED_BUTTON_STYLES,
} from "@/components/styles/button";
import ManualContact from "./ManualContact";
import { io } from "socket.io-client";

const AllContacts: React.FC = () => {
  const groupContacts = contactStore((state) => state.groupContacts);
  const allContactList = contactStore((state) => state.allContactList);
  const setAllContactList = contactStore((state) => state.setAllContactList);
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
        const res = await fetchContact(currentPage, revisedHeight);
        if (res.status === 200) {
          setAllContactList(res?.contact);
          setTotalPages(res?.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    allContactPerPage,
    currentPage,
    setAllContactList,
    setAllContactPerPage,
    setTotalPages,
  ]);

  // Handle search functionality via socket
  useEffect(() => {
    socket.connect();

    const handleSearch = () => {
      socket.emit("contacts", {
        keyword: searchKeyword, // Sending the search keyword
        userID: userID && userID,
        page: currentPage,
        per_page: 8,
      });
    };

    // Trigger search whenever the search keyword changes
    if (searchKeyword) {
      handleSearch();
    } else {
      // Fetch all contacts when search is cleared
      socket.emit("contacts", {
        keyword: "", // Sending the search keyword
        userID: userID && userID,
        page: currentPage,
        per_page: 8,
      });
    }

    // Listen for search results from the server
    socket.on("contacts", (data) => {
      console.log("emitting :", data);
      setAllContactList(data.paginatedData);
      setTotalPages(data.totalPages);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [
    currentPage,
    searchKeyword,
    socket,
    userID,
    setAllContactList,
    setTotalPages,
    allContactList,
  ]);

  return (
    <>
      {Images.Edit && allContactList && allContactList !== null ? (
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
            <div className="flex items-center gap-4">
              <Dropdown
                label=""
                placement="bottom"
                renderTrigger={() => (
                  <h1 className={`${BIG_BUTTON_STYLES} cursor-pointer`}>
                    + Add Groups
                  </h1>
                )}
              >
                <Dropdown.Item
                  className="dark:text-slate-300 text-black"
                  onClick={() => {
                    setOpenModal({
                      show: "importContacts",
                    });
                  }}
                >
                  Import Groups
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOpenAddContactModal(true);
                  }}
                  className="dark:text-slate-300 text-black"
                >
                  Add manually
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <ContactTable />
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
