"use client";
import { Checkbox, Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { contactStore } from "@/store/store";

// Define the types for the props
interface GroupTableProps {
  setSelectedGroups: React.Dispatch<React.SetStateAction<string[]>>; // Function to set selected groups
  selectedGroups: string[]; // Array of selected group names
}

const GroupTable: React.FC<GroupTableProps> = ({
  setSelectedGroups,
  selectedGroups,
}) => {
  const [selectAllGroups, setSelectAllGroups] = useState(false);

  const groupContacts = contactStore((state) => state.groupContacts);
  const allGroupList = contactStore((state) => state.allGroupList);

  const setCurrentPage = contactStore((state) => state.setCurrentPage);
  const setCurrentGroupPage = contactStore(
    (state) => state.setCurrentGroupPage
  );
  const currentPage = contactStore((state) => state.currentPage);
  const onGroupPageChange = (page: number) => setCurrentGroupPage(page);

  const totalPages = contactStore((state) => state.totalPages);
  const groupTotalPages = contactStore((state) => state.groupTotalPages);
  const onPageChange = (page: number) => setCurrentPage(page);

  // Handle individual group selection
  const handleSelectGroup = (groupName: string) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(groupName)
        ? prevSelected.filter((name) => name !== groupName)
        : [...prevSelected, groupName]
    );
  };

  // Handle Select All checkbox
  const handleSelectAllGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAllGroups(isChecked);

    if (isChecked) {
      const allGroupNames = groupContacts
        ? groupContacts.map((item) => item.json.group)
        : allGroupList?.map((group) => group.group) || [];
      setSelectedGroups(
        allGroupNames.filter((group): group is string => group !== null)
      );
    } else {
      setSelectedGroups([]);
    }
  };

  // Update selectAllGroups when individual checkboxes change
  useEffect(() => {
    const allGroupNames = groupContacts
      ? groupContacts.map((item) => item.json.group)
      : allGroupList?.map((group) => group.group) || [];

    // If all individual checkboxes are checked, selectAllGroups should be true
    setSelectAllGroups(
      selectedGroups.length === allGroupNames.length && allGroupNames.length > 0
    );
  }, [selectedGroups, groupContacts, allGroupList]);

  return (
    <>
      <div className="flex flex-col gap-4 h-5/6 overflow-auto">
        <Table hoverable striped id="tableHeight">
          <Table.Head className="w-full ">
            <Table.HeadCell className="w-1/5 sticky text-center">
              <Checkbox
                id="selectGroups"
                checked={selectAllGroups}
                onChange={handleSelectAllGroups}
              />
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center">
              Batch No
            </Table.HeadCell>
            <Table.HeadCell className="w-1/5 sticky text-center">
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
                    <Table.Cell className="w-1/5 text-center">
                      <Checkbox
                        id="selectGroup"
                        checked={selectedGroups.includes(items.json.group)}
                        onChange={() => handleSelectGroup(items.json.group)}
                      />
                    </Table.Cell>
                    <Table.Cell className="w-1/5 text-center">
                      {items.json.group}
                    </Table.Cell>
                    <Table.Cell className="w-1/5 text-center">
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
                      <Table.Cell className="w-1/5 text-center">
                        <Checkbox
                          id="selectGroup"
                          checked={selectedGroups.includes(group.group)}
                          onChange={() => handleSelectGroup(group.group)}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-1/5 text-center">
                        {group?.group}
                      </Table.Cell>
                      <Table.Cell className="w-1/5 text-center">
                        {group?.group}
                      </Table.Cell>
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
