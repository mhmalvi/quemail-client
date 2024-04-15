"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Modal,
  Table,
  Checkbox,
  Pagination,
  DarkThemeToggle,
} from "flowbite-react";
const contacts = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    account: "Premium",
    dateCreated: "2023-01-15",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  // Add more contacts as needed
];
const EmailSubscriptions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const onPageChange = (page: number) => setCurrentPage(page);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openAddSubscriptionModal, setOpenAddSubscriptionModal] =
    useState(false);
  return (
    <div className="relative w-full h-full bg-gray-800/80 rounded-md p-4 flex flex-col gap-8 overflow-hidden">
      {/* <h1 className="text-2xl">Email Subscriptions</h1> */}
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
        <div className="flex gap-8 items-center">
          <button
            className="py-2 px-4 rounded-md bg-brand-color"
            onClick={() => {
              setOpenAddSubscriptionModal(true);
            }}
          >
            Add an email subscription
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between h-5/6 gap-8">
        <div className="overflow-y-scroll h-5/6">
          <Table hoverable striped className="bg-transparent h-5/6">
            <Table.Head className="sticky top-0 py-0 bg-slate-700 !rounded-tl-md">
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                Full name
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                Email
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                Phone
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                Account
              </Table.HeadCell>
              <Table.HeadCell className="sticky top-0 py-2 bg-transparent text-slate-300">
                Date Created
              </Table.HeadCell>
              <Table.HeadCell className="py-0 bg-transparent text-slate-300">
                <div className="flex items-center gap-2">
                  <h1>Action</h1>
                  <DarkThemeToggle className="focus:ring-0 active:outline-none active:ring-0" />
                </div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y overflow-y-scroll">
              {contacts
                .filter((contact) =>
                  contact.fullName
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
                )
                .map((contact) => (
                  <Table.Row
                    key={contact.id}
                    className="dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {contact.fullName}
                    </Table.Cell>
                    <Table.Cell>{contact.email}</Table.Cell>
                    <Table.Cell>{contact.phone}</Table.Cell>
                    <Table.Cell>{contact.account}</Table.Cell>
                    <Table.Cell>{contact.dateCreated}</Table.Cell>
                    <Table.Cell className="w-full flex gap-8">
                      <button className="font-medium text-brand-color border border-brand-color px-4 py-2 rounded-md hover:underline ">
                        Edit
                      </button>
                      <button className="font-medium text-red-400 border border-red-400 px-4 py-2 rounded-md hover:underline">
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
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
        show={openAddSubscriptionModal}
        onClose={() => setOpenAddSubscriptionModal(false)}
      >
        <Modal.Header>Import Contacts</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 text-center">
            <h3 className="m-0 p-0 text-lg font-normal text-gray-500 dark:text-gray-400">
              Have existing contacts in a file?
            </h3>
            <h3 className="m-0 p-0 text-lg font-normal text-gray-500 dark:text-gray-400">
              Import a CSV file of your contacts for quick import.
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-brand-color rounded-md"
                onClick={() => setOpenModal(false)}
              >
                Import from file
              </button>
              <button
                className="px-4 py-2 border border-brand-color text-gray-800 dark:text-slate-300 rounded-md"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default EmailSubscriptions;
