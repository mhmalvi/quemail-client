"use client";
import Image from "next/image";
import Images from "@/components/utils/images";
import { Checkbox, Pagination, Table } from "flowbite-react";
import React, { useCallback, useState } from "react";
import { contactStore } from "@/store/store";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { destroyContact, updateContact } from "@/app/api/contact";

const GroupTable = () => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectAllGroups, setSelectAllGroups] = useState(false);

  const groupContacts = contactStore((state) => state.groupContacts);
  const allGroupList = contactStore((state) => state.allGroupList);

  const setCurrentPage = contactStore((state) => state.setCurrentPage);
  const setCurrentGroupPage = contactStore(
    (state) => state.setCurrentGroupPage
  );
  const currentPage = contactStore((state) => state.currentPage);
  const currentGroupPage = contactStore((state) => state.currentGroupPage);
  const onGroupPageChange = (page: number) => setCurrentGroupPage(page);

  const totalPages = contactStore((state) => state.totalPages);
  const groupTotalPages = contactStore((state) => state.groupTotalPages);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const onPageChange = (page: number) => setCurrentPage(page);
  const [updateLoading, setUpdateLoading] = useState(false);

  const onDelete = async (data: number) => {
    const res = await destroyContact(data);
    if (res.status === 201) {
      successNotification(res.message);

      window.location.href =
        window.location.pathname + "?reload=" + new Date().getTime();
    } else {
      warningNotification("Something went wrong. Please try again.");
    }
  };

  const handleSelectAllGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAllGroups(isChecked);

    if (isChecked) {
      const allGroupNames = groupContacts
        ? groupContacts.map((item) => item.json.group)
        : allGroupList?.map((group) => group.group) || []; // Fallback to an empty array
      setSelectedGroups(allGroupNames.filter((group) => group !== null));
    } else {
      setSelectedGroups([]);
    }
  };

  const handleSelectGroup = (groupName: string) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(groupName)
        ? prevSelected.filter((name) => name !== groupName)
        : [...prevSelected, groupName]
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-5/6 overflow-auto">
        <Table hoverable striped id="tableHeight">
          <Table.Head className="w-full ">
            <Table.HeadCell className="w-1/5 sticky">
              <Checkbox
                id="selectGroups"
                checked={selectAllGroups}
                onChange={handleSelectAllGroups}
              />
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky ">
              Group Name
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-right ">
              Date Added
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {groupContacts !== null
              ? groupContacts.map((items: any, index) => (
                  <Table.Row
                    key={index}
                    className="w-full dark:border-gray-700 dark:bg-transparent"
                  >
                    <Table.Cell className="w-1/5">
                      <Checkbox
                        id="selectGroup"
                        checked={selectedGroups.includes(items.json.group)}
                        onChange={() => handleSelectGroup(items.json.group)}
                      />
                    </Table.Cell>
                    <Table.Cell className="w-1/5">
                      {items.json.group}
                    </Table.Cell>
                    <Table.Cell className="w-1/5 text-right">
                      {" "}
                      {items.updatedAt.split("T")[0]}
                    </Table.Cell>
                  </Table.Row>
                ))
              : allGroupList !== null &&
                allGroupList.map((group: any, index: any) => {
                  return (
                    <Table.Row
                      key={index}
                      className="dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="w-1/5">
                        <Checkbox
                          id="selectGroup"
                          checked={selectedGroups.includes(group.group)}
                          onChange={() => handleSelectGroup(group.group)}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-1/5">{group?.group}</Table.Cell>
                      <Table.Cell className="w-1/5 text-right">
                        {group.updatedAt?.split("T")[0]}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
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
    </>
  );
};

export default GroupTable;
