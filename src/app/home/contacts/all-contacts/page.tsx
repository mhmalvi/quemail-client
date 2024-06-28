"use client";
import React, { useEffect, useState } from "react";
import { Modal, Dropdown } from "flowbite-react";
import NoContacts from "../../../../components/HomeLayoutUI/NoContacts";
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

const AllContacts = () => {
  const groupContacts = contactStore((state) => state.groupContacts);
  const allContactList = contactStore((state) => state.allContactList);
  const setAllContactList = contactStore((state) => state.setAllContactList);
  const setTotalPages = contactStore((state) => state.setTotalPages);
  const setAllContactPerPage = contactStore(
    (state) => state.setAllContactPerPage
  );
  const allContactPerPage = contactStore((state) => state.allContactPerPage);
  const currentPage = contactStore((state) => state.currentPage);
  const [openModal, setOpenModal] = useState({
    show: "",
  });
  const [openAddContactModal, setOpenAddContactModal] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const height = document.getElementById("tableHeight")?.clientHeight;
      
      height !== undefined && setAllContactPerPage(height/80);
      const revisedHeight = Math.floor(allContactPerPage);
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

  return (
    <>
      {Images.Edit && allContactList !== null && allContactList.length > 0 ? (
        <div id="tableHeight" className={COL_CONTAINER_STYLES}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <Groups />
              <h1 className="flex gap-2 m-0 px-4 py-2 xl:text-base text-sm border-l border-brand-color text-dark-black dark:text-slate-300">
                Showing:
                {groupContacts !== null ? (
                  <span className="text-brand-color">
                    {groupContacts[0].json.group}
                  </span>
                ) : (
                  <span className="text-brand-color">All Contacts</span>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* <button className={BIG_BUTTON_STYLES} disabled>
                Add to Campaign
              </button> */}
              <Dropdown
                label=""
                placement="bottom"
                renderTrigger={() => (
                  <h1 className={`${BIG_BUTTON_STYLES} cursor-pointer`}>Add Contacts +</h1>
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
                  Import Contacts
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

          <Modal
            dismissible
            show={openAddContactModal}
            onClose={() => setOpenAddContactModal(false)}
          >
            <Modal.Header className="dark:bg-dark-glass bg-violet-50 dark:text-slate-300 text-dark-black">
              Add a Contact
            </Modal.Header>
            <Modal.Body className="dark:bg-dark-black bg-violet-50 rounded-md">
              <h1 className="text-brand-color bg-slate-300 px-4 py-2 rounded-md">
                This feature is under development
              </h1>
            </Modal.Body>
          </Modal>
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
    </>
  );
};

export default AllContacts;
