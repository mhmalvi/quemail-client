"use client";
import { Modal, Spinner, Table, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import AddUser from "./addUser";
import { deleteSubAdmin, fetchSubAdminList } from "@/app/api/admin";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import NoContacts from "../../HomeLayoutUI/NoContacts";
import { BIG_BUTTON_STYLES } from "@/components/styles/button";
import { TbTrash } from "react-icons/tb";

const Users = () => {
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [subAdminList, setSubAdminList] = useState<any>(null);

  useEffect(() => {
    const fetchSubAdmin = async () => {
      const response = await fetchSubAdminList();

      console.log(response);
      if (response.status === 200) {
        setSubAdminList(response.subadmins);
      } else {
        warningNotification("Network problem!");
      }
    };
    fetchSubAdmin();
  }, []);

  const handleDelete = async (subAdmin: number) => {
    const response = await deleteSubAdmin(subAdmin);

    if (response.status === 201) {
      successNotification("Subadmin removed!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    } else {
      warningNotification("Failed to remove subadmin");
    }
  };

  return (
    <>
      {subAdminList ? (
        <div className="relative w-full h-full dark:bg-dark-glass rounded-md p-4 flex flex-col gap-8 overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="w-full h-full overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col gap-4">
                <div className="flex w-full justify-end">
                  <button
                    onClick={() => {
                      setAddUserModal(true);
                    }}
                    className="px-4 py-2 bg-brand-color rounded-md"
                  >
                    Add a new user
                  </button>
                </div>
                <Table hoverable striped>
                  <Table.Head className="w-full">
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Email
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Username
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Date Added
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Updated
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Actions
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {subAdminList &&
                      subAdminList.map((subAdmin: any) => (
                        <Table.Row key={subAdmin.id} className="text-center">
                          <Table.Cell>{subAdmin.email}</Table.Cell>
                          <Table.Cell>{subAdmin.userName}</Table.Cell>
                          <Table.Cell>
                            {new Date(subAdmin.createdAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            {new Date(subAdmin.updatedAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex justify-center">
                              <Tooltip
                                content="delete card"
                                className="bg-brand-color text-center"
                                placement="bottom"
                              >
                                <button
                                  className="border rounded-full border-red-500 hover:text-red-500"
                                  onClick={() => {
                                    handleDelete(subAdmin.id);
                                  }}
                                >
                                  <TbTrash className="m-1 transition-fill duration-200 ease-in-out" />
                                </button>
                              </Tooltip>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              onClick={() => {
                setAddUserModal(true);
              }}
              className="px-4 py-2 bg-brand-color rounded-md"
            >
              Add a new user
            </button>
          </div>
        </div>
      )}

      <Modal
        show={addUserModal}
        dismissible
        onClose={() => {
          setAddUserModal(false);
        }}
        size={"3xl"}
      >
        <Modal.Header>
          <h1 className="text-dark-black dark:text-slate-300">Select a card</h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full">
          <AddUser setOpenAddUserModal={setAddUserModal}></AddUser>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Users;
