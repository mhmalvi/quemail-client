"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Checkbox,
  Pagination,
  Table,
  Modal,
  Dropdown,
  TextInput,
  Label,
  Spinner,
  Popover,
} from "flowbite-react";
import NoContacts from "./NoContacts";
import ImportCSV from "./ImportCSV";
import { contactStore } from "@/store/store";
import { destroyContact, fetchContact, updateContact } from "@/app/api/contact";
import Images from "@/components/utils/images";
import Image from "next/image";
import {
  EditContactData,
  OpenEditContactModal,
} from "@/components/utils/types";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";

const AllContacts = () => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const onPageChange = (page: number) => setCurrentPage(page);
  const [openModal, setOpenModal] = useState({
    show: "",
  });
  const [openAddContactModal, setOpenAddContactModal] =
    useState<boolean>(false);
  const [openEditContactModal, setOpenEditContactModal] =
    useState<OpenEditContactModal>({
      show: false,
      data: null,
    });
  const [editContactData, setEditContactData] = useState<EditContactData>({
    id: null,
    user_id: userID,
    json: {
      name: "",
      email: "",
    },
  });
  const [initialEditContactData, setInitialEditContactData] =
    useState<EditContactData>({
      id: null,
      user_id: userID,
      json: {
        name: "",
        email: "",
      },
    });
  const [openDeletePopover, setOpenDeletePopover] = useState<null | number>(
    null
  );
  const [allContactList, setAllContactList] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const csvData = contactStore((state: any) => state.csvData);
  const hasData = contactStore((state: any) => state.hasData);
  const setHasData = contactStore((state: any) => state.setHasData);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchContact(currentPage);
        if (res.status === 200) {
          setAllContactList(res?.contact);
          setTotalPages(res?.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };
  const handleEditContact = (contact: any) => {
    setEditContactData(contact);
    setInitialEditContactData(contact);
    setOpenEditContactModal({
      show: true,
      data: contact,
    });
  };
  const handleEditContactDataChange = (field: string, value: string) => {
    setEditContactData((prevData) => ({
      ...prevData,
      json: {
        ...prevData.json,
        [field]: value,
      },
    }));
  };

  const onUpdate = async () => {
    const res = await updateContact(editContactData);
    if (res.status === 201) {
      successNotification(res?.message);
      setUpdateLoading(false);
      setOpenEditContactModal({
        show: false,
        data: null,
      });
      window.location.reload();
    } else {
      warningNotification("Something went wrong. Please try again.");
    }
  };

  const hasChanges = useCallback(() => {
    return (
      editContactData.json.name !== initialEditContactData.json.name ||
      editContactData.json.email !== initialEditContactData.json.email
    );
  }, [editContactData, initialEditContactData]);

  const onDelete = async (data: number) => {
    const res = await destroyContact(data);
    if (res.status === 201) {
      successNotification(res.message);
      window.location.reload();
    } else {
      warningNotification("Something went wrong. Please try again.");
    }
  };
  console.log(editContactData);

  return (
    <>
      {Images.Edit && allContactList.length > 1 ? (
        <div className="w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-8 overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center border rounded-md px-4">
              <FiSearch />
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent border-none focus:ring-0"
                value={filterValue}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                className="m-0 px-4 py-2 bg-brand-color rounded-md disabled:opacity-10"
                disabled
              >
                Add to Campaign
              </button>
              <Dropdown
                label=""
                placement="bottom"
                renderTrigger={() => (
                  <h1 className="px-4 py-2 bg-brand-color rounded-md cursor-pointer">
                    Add Contacts +
                  </h1>
                )}
              >
                <Dropdown.Item
                  className="dark:text-slate-300 text-black"
                  onClick={() => {
                    setOpenModal({
                      show: "showButtons",
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
          <div className="flex flex-col gap-4 h-5/6 overflow-y-scroll">
            <Table hoverable striped>
              <Table.Head className="sticky top-0 py-0 !rounded-tl-md">
                <Table.HeadCell className="sticky top-0 py-2">
                  <Checkbox
                    checked={selectAllChecked}
                    onChange={(e) => setSelectAllChecked(e.target.checked)}
                  />
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2">
                  Added by
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2">
                  Group
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2">
                  Date Added
                </Table.HeadCell>
                <Table.HeadCell className="sticky top-0 py-2 text-center w-full">
                  Action
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {allContactList.map((contact: any, index: any) => (
                  <Table.Row
                    key={index}
                    className="dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {contact.json.name}
                    </Table.Cell>
                    <Table.Cell>{contact.json.email}</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>{contact.json.group}</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell className="w-full flex items-center justify-center gap-8">
                      <Image
                        className="cursor-pointer"
                        src={Images.Edit}
                        alt="editContact"
                        onClick={() => {
                          handleEditContact(contact);
                        }}
                      />
                      <Popover
                        aria-labelledby="default-popover"
                        open={openDeletePopover === contact.id}
                        onOpenChange={() => {
                          setOpenDeletePopover(
                            openDeletePopover === contact.id ? null : contact.id
                          );
                        }}
                        content={
                          <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                              <h3
                                id="default-popover"
                                className="font-semibold text-gray-900 dark:text-white"
                              >
                                Are you sure you want to delete?
                              </h3>
                            </div>
                            <div className="px-4 py-2 flex items-center justify-between">
                              <button
                                onClick={() => {
                                  onDelete(contact.id);
                                }}
                                className="px-4 py-2 bg-red-500 rounded-md text-dark-black font-semibold"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDeletePopover(null);
                                }}
                                className="px-4 py-2 border border-brand-color rounded-md text-slate-300 font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        }
                      >
                        <Image
                          src={Images.Delete}
                          alt="deleteContact"
                          className="cursor-pointer"
                        />
                      </Popover>
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
              totalPages={totalPages}
              onPageChange={onPageChange}
              previousLabel="<"
              nextLabel=">"
            />
          </div>
          <Modal
            dismissible
            show={openAddContactModal}
            onClose={() => setOpenAddContactModal(false)}
          >
            <Modal.Header>Add a Contact</Modal.Header>
            <Modal.Body>
              <h1 className="text-brand-color bg-slate-300 px-4 py-2 rounded-md">This feature is under development</h1>
              {/* <div className="flex flex-col gap-4 text-center w-full">
                <form className="m-0 p-0 w-full text-lg flex flex-wrap flex-grow gap-4 items-center font-normal text-gray-500 dark:text-gray-400">
                  <div className="flex-auto flex flex-col">
                    <label className="text-start text-base">First Name</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col">
                    <label className="text-start text-base">Last Name</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col">
                    <label className="text-start text-base">Contact</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col">
                    <label className="text-start text-base">Email</label>
                    <input className="bg-transparent border border-gray-800 dark:border-slate-300 rounded-md focus:outline-none focus:ring-0 outline-none p-2" />
                  </div>
                  <div className="flex-auto flex flex-col">
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
                    className="px-4 py-2 bg-brand-color rounded-md text-slate-300"
                    onClick={() => setOpenAddContactModal(false)}
                  >
                    Add +
                  </button>
                </div>
              </div> */}
            </Modal.Body>
          </Modal>
          <Modal
            show={openEditContactModal.show}
            onClose={() => {
              setOpenEditContactModal({ show: false, data: null });
              setEditContactData((prevData) => ({
                ...prevData,
                id: null,
                json: {
                  name: "",
                  email: "",
                },
              }));
              setInitialEditContactData((prevData) => ({
                ...prevData,
                id: null,
                json: {
                  name: "",
                  email: "",
                },
              }));
            }}
          >
            <Modal.Header>Edit Contact</Modal.Header>
            <Modal.Body>
              <div>
                <Label htmlFor="name" value="Edit name" />
                <TextInput
                  id="name"
                  placeholder="name@company.com"
                  value={editContactData.json.name || ""}
                  onChange={(event) =>
                    handleEditContactDataChange("name", event.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" value="Edit email" />
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={editContactData.json.email || ""}
                  onChange={(event) =>
                    handleEditContactDataChange("email", event.target.value)
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-end mt-6 gap-4">
                <button
                  disabled={!hasChanges()}
                  className="px-4 py-2 bg-brand-color rounded-md disabled:opacity-20"
                  onClick={() => {
                    setUpdateLoading(true);
                    onUpdate();
                  }}
                >
                  {updateLoading ? (
                    <Spinner
                      color="purple"
                      aria-label="Purple spinner example"
                      size="xl"
                    />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  className="px-4 py-2 border border-brand-color rounded-md"
                  onClick={() =>
                    setOpenEditContactModal({ show: false, data: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <div className="relative w-full h-full shadow-md dark:bg-dark-glass backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              className="py-2 px-4 rounded-md dark:text-slate-300 text-dark-black border border-brand-color"
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
