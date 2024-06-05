import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import {
  fetchContact,
  fetchGroupItems,
  fetchGroupList,
} from "@/app/api/contact";
import { warningNotification } from "@/components/utils/utility";
import { contactStore } from "@/store/store";

const Groups = () => {
  const groupData = contactStore((state) => state.groupData);
  const setGroupData = contactStore((state) => state.setGroupData);
  const groupContacts = contactStore((state) => state.groupContacts);
  const setGroupContacts = contactStore((state) => state.setGroupContacts);
  const [clickedGroupName,setClickedGroupName] = useState<any>(null)
  const currentPage = contactStore((state) => state.currentPage);
  const setGroupTotalPages = contactStore((state) => state.setGroupTotalPages);

  useEffect(() => {
    (async () => {
      const res = await fetchGroupList();
      if (res?.status === 200) {
        setGroupData(res.groups);
      } else if (res?.status === 422) {
        warningNotification(res.message);
      } else if (res?.status === 404) {
        warningNotification(res.message);
      } else {
        setGroupData(null);
      }
    })();
  }, [setGroupData]);

  const handleFetchGroup = useCallback(
    async (groupName: string | null) => {
      if (groupName !== null) {
        const res = await fetchGroupItems(groupName, currentPage);
        if (res.status === 200) {
          setGroupTotalPages(res.totalPages);
          setGroupContacts(res.contacts);
        } else if (res.status === 422) {
          warningNotification(res.message);
        } else if (res.status === 404) {
          warningNotification(res.message);
        }
      } else {
        setGroupContacts(null);
      }
    },
    [currentPage, setGroupContacts, setGroupTotalPages]
  );

  useEffect(() => {
    if (currentPage) {
      handleFetchGroup(clickedGroupName);
    }
  }, [clickedGroupName, currentPage, handleFetchGroup]);

  return (
    <div>
      <Dropdown
        label="Groups ▼"
        placement="bottom-start"
        renderTrigger={() => (
          <div className="px-4 py-1 rounded-md border border-brand-color cursor-pointer overflow-hidden">
            <h1 className="flex items-center justify-center gap-4 duration-100 ease-in text-dark-black dark:text-slate-300 xl:text-base text-sm ">
              Groups <span className="text-xs">▼</span>
            </h1>
          </div>
        )}
        className="dark:bg-dark-black bg-light-glass backdrop-blur-2xl border-none z-40"
      >
        {groupData !== null &&
          groupData.map((item: string, index: number) => (
            <Dropdown.Item
              key={index}
              className={`${
                groupContacts !== null && groupContacts[0].json.group === item
                  ? "bg-brand-color"
                  : "bg-transparent"
              } dark:text-slate-300 text-light-black hover:text-slate-700`}
              onClick={() => {
                handleFetchGroup(item);
                setClickedGroupName(item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        <Dropdown.Item
          className="dark:text-slate-300 text-light-black hover:text-slate-700"
          onClick={() => window.location.reload()}
        >
          Clear
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Groups;
