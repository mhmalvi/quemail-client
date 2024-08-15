"use client";
import { Modal, Table, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import AddUser from "./addUser";

const Users = () => {
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  return (
    <div className="relative w-full h-full dark:bg-dark-glass rounded-md p-4 flex flex-col gap-8 overflow-hidden">
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
      <div className="flex items-center justify-center">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <Table hoverable striped>
            <Table.Head className="w-full">
              <Table.HeadCell className="w-1/4 sticky text-center">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="w-1/4 sticky text-center">
                Brand
              </Table.HeadCell>
              <Table.HeadCell className="w-1/4 sticky text-center">
                Email
              </Table.HeadCell>
              <Table.HeadCell className="w-1/4 sticky text-center">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

            </Table.Body>
          </Table>
        </div>
        {/* <div className="flex items-center gap-4">
          <button className="px-2 py-1 bg-brand-color rounded-md">Edit</button>
          <button className="px-2 py-1 border border-brand-color rounded-md">
            Cancel Access
          </button>
        </div> */}
      </div>

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
    </div>
  );
};
export default Users;
