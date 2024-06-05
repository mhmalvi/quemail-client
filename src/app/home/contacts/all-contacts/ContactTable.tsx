"use client";
import Image from "next/image";
import Images from "@/components/utils/images";
import {
  Checkbox,
  Label,
  Modal,
  Pagination,
  Popover,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import React, { useCallback, useState } from "react";
import { contactStore } from "@/store/store";
import {
  EditContactData,
  OpenEditContactModal,
} from "@/components/utils/types";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { destroyContact, updateContact } from "@/app/api/contact";

const ContactTable = () => {
  const groupContacts = contactStore((state) => state.groupContacts);
  const allContactList = contactStore((state) => state.allContactList);
  const setCurrentPage = contactStore((state) => state.setCurrentPage);
  const setCurrentGroupPage = contactStore(
    (state) => state.setCurrentGroupPage
  );
  const currentPage = contactStore((state) => state.currentPage);
  const currentGroupPage = contactStore((state) => state.currentGroupPage);
  const totalPages = contactStore((state) => state.totalPages);
  const groupTotalPages = contactStore((state) => state.groupTotalPages);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const onPageChange = (page: number) => setCurrentPage(page);
  const onGroupPageChange = (page: number) => setCurrentGroupPage(page);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editContactData, setEditContactData] = useState<EditContactData>({
    id: null,
    user_id: userID,
    json: {
      name: "",
      email: "",
      group: "",
    },
  });

  const [openEditContactModal, setOpenEditContactModal] =
    useState<OpenEditContactModal>({
      show: false,
      data: null,
    });

  const [initialEditContactData, setInitialEditContactData] =
    useState<EditContactData>({
      id: null,
      user_id: userID,
      json: {
        name: "",
        email: "",
        group: "",
      },
    });
  const [openDeletePopover, setOpenDeletePopover] = useState<null | number>(
    null
  );
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
      editContactData.json.email !== initialEditContactData.json.email ||
      editContactData.json.group !== initialEditContactData.json.group
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
  return (
    <>
      <div className="flex flex-col gap-4 h-5/6 overflow-auto">
        <Table hoverable striped>
          <Table.Head className="sticky top-0 py-0 !rounded-tl-md">
            <Table.HeadCell className="sticky top-0 py-2">
              <Checkbox
                checked={selectAllChecked}
                onChange={(e) => setSelectAllChecked(e.target.checked)}
              />
            </Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2">Name</Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2">Email</Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2">
              Added by
            </Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2">Group</Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2">
              Date Added
            </Table.HeadCell>
            <Table.HeadCell className="sticky top-0 py-2 text-center w-full">
              Action
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {groupContacts !== null
              ? groupContacts.map((items, index) => (
                  <Table.Row
                    key={index}
                    className="dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {items.json.name}
                    </Table.Cell>
                    <Table.Cell>{items.json.email}</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>{items.json.group}</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell className="w-full flex items-center justify-center gap-8">
                      <Image
                        className="cursor-pointer"
                        src={Images.Edit}
                        alt="editContact"
                        onClick={() => {
                          handleEditContact(items);
                        }}
                      />
                      <Popover
                        aria-labelledby="default-popover"
                        open={openDeletePopover === items.id}
                        onOpenChange={() => {
                          setOpenDeletePopover(
                            openDeletePopover === items.id ? null : items.id
                          );
                        }}
                        content={
                          <div className="w-full text-sm text-gray-500 dark:text-gray-400">
                            <div className="border-b px-3 py-2">
                              <h3
                                id="default-popover"
                                className="font-semibold text-gray-900 dark:text-slate-300"
                              >
                                Are you sure you want to delete?
                              </h3>
                            </div>
                            <div className="px-4 py-2 flex items-center justify-between">
                              <button
                                onClick={() => {
                                  onDelete(items.id);
                                }}
                                className="px-2 py-1 bg-red-500 rounded-md text-white"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDeletePopover(null);
                                }}
                                className="px-2 py-1 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
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
                ))
              : allContactList !== null &&
                allContactList.map((contact: any, index: any) => (
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
                          <div className="w-full text-sm text-gray-500 dark:text-gray-400">
                            <div className="border-b px-3 py-2">
                              <h3
                                id="default-popover"
                                className="font-semibold text-gray-900 dark:text-slate-300"
                              >
                                Are you sure you want to delete?
                              </h3>
                            </div>
                            <div className="px-4 py-2 flex items-center justify-between">
                              <button
                                onClick={() => {
                                  onDelete(contact.id);
                                }}
                                className="px-2 py-1 bg-red-500 rounded-md text-white"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDeletePopover(null);
                                }}
                                className="px-2 py-1 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
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
          totalPages={groupContacts !== null ? groupTotalPages : totalPages}
          onPageChange={onPageChange}
          previousLabel="<"
          nextLabel=">"
        />
      </div>
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
              group: "",
            },
          }));
          setInitialEditContactData((prevData) => ({
            ...prevData,
            id: null,
            json: {
              name: "",
              email: "",
              group: "",
            },
          }));
        }}
      >
        <Modal.Header className="dark:bg-dark-glass bg-violet-50 dark:text-slate-300 text-dark-black">
          Edit Contact
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50">
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
          <div>
            <Label htmlFor="group" value="Edit group" />
            <TextInput
              id="group"
              placeholder="Group Name"
              value={editContactData.json.group || ""}
              onChange={(event) =>
                handleEditContactDataChange("group", event.target.value)
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
              className="px-4 py-2 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
              onClick={() =>
                setOpenEditContactModal({ show: false, data: null })
              }
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactTable;
