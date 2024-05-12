"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Checkbox, Pagination, Table, Modal } from "flowbite-react";
import NoContacts from "./NoContacts";
import ImportCSV from "./ImportCSV";
import { contactStore } from "@/store/store";
import { fetchContact } from "@/app/api/contact";
import dynamic from "next/dynamic";

const AllContacts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const onPageChange = (page: number) => setCurrentPage(page);
  // const ImportCSV = dynamic(() => import("./ImportCSV"), {
  //   ssr: false,
  // });
  const [allContactList, setAllContactList] = useState<[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchContact();
        if (res.status === 200) {
          setAllContactList(res?.contact);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };
  const [openModal, setOpenModal] = useState({
    show: "",
  });
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const csvData = contactStore((state: any) => state.csvData);
  const hasData = contactStore((state: any) => state.hasData);
  const setHasData = contactStore((state: any) => state.setHasData);

  return (
    <>
      {allContactList.length > 1 ? (
        <div className="relative w-full h-full dark:bg-dark-glass backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-8 overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center border rounded-md px-4 ">
              <FiSearch className="" />
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent border-none focus:ring-0 active:outline-none active:ring-0"
                value={filterValue}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex gap- items-center gap-4">
              <button
                className="py-2 px-4 rounded-md border border-brand-color dark:text-white text-black"
                onClick={() => {
                  setOpenModal({
                    show: "showButtons",
                  });
                }}
              >
                Import
              </button>
              <button
                className="py-2 px-4 rounded-md bg-brand-color dark:text-white text-black"
                onClick={() => {
                  setOpenAddContactModal(true);
                }}
              >
                Add a contact
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between h-5/6 gap-8">
            <div className="h-5/6">
              <Table hoverable striped className="bg-transparent h-5/6">
                <Table.Head className="sticky top-0 py-0 bg-slate-700 !rounded-tl-md">
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent">
                    <Checkbox />
                  </Table.HeadCell>
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                    Name
                  </Table.HeadCell>
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                    Email
                  </Table.HeadCell>
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                    Added by
                  </Table.HeadCell>
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                    Group
                  </Table.HeadCell>
                  <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                    Date Added
                  </Table.HeadCell>
                  <Table.HeadCell className="py-0 bg-transparent text-slate-300">
                    <div className="flex items-center gap-2">
                      <h1>Action</h1>
                    </div>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y overflow-y-scroll">
                  {allContactList.map((contact: any, index: any) => {
                    return (
                      <Table.Row
                        key={index}
                        className="dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {contact.json.name}
                        </Table.Cell>
                        <Table.Cell>{contact.json.email}</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell>{contact.json.group}</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell className="w-full flex gap-8">
                          <button className="font-medium text-brand-color border border-brand-color px-4 py-2 rounded-md hover:underline ">
                            Edit
                          </button>
                          <button className="font-medium text-red-400 border border-red-400 px-4 py-2 rounded-md hover:underline">
                            Delete
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
            <div className=" w-full flex overflow-x-auto sm:justify-center h-1/6">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={onPageChange}
              />
            </div>
          </div>

          <Modal
            dismissible
            show={openAddContactModal}
            onClose={() => setOpenAddContactModal(false)}
          >
            <Modal.Header>Add a Contact</Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4 text-center w-full">
                <form className="m-0 p-0 w-full text-lg flex flex-wrap flex-grow gap-4 items-center font-normal text-gray-500 dark:text-gray-400">
                  <div className="flex-auto flex flex-col ">
                    <label className="text-start text-base">First Name</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col ">
                    <label className="text-start text-base">Last Name</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col ">
                    <label className="text-start text-base">Contact</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col ">
                    <label className="text-start text-base">Email</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col ">
                    <label className="text-start text-base">
                      Select Account
                    </label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                </form>

                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 border border-brand-color text-gray-800 dark:text-slate-300 rounded-md"
                    onClick={() => setOpenAddContactModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-brand-color rounded-mdtext-slate-300"
                    onClick={() => setOpenAddContactModal(false)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className="relative w-full h-full dark:bg-dark-glass  backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              className="py-2 px-4 rounded-md border border-brand-color"
              onClick={() => {
                setOpenModal({
                  show: "showButtons",
                });
              }}
            >
              Import
            </button>
            <button
              className="py-2 px-4 rounded-md bg-brand-color"
              onClick={() => {
                setOpenAddContactModal(true);
              }}
            >
              Add a contact
            </button>
          </div>
        </div>
      )}
      {openModal.show === "showButtons" && (
        <ImportCSV openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};
export default AllContacts;
