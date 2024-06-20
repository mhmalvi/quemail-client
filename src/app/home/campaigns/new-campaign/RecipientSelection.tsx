"use client";
import { fetchGroupItems, fetchGroupList } from "@/app/api/contact";
import { ContactType } from "@/components/utils/types";
import { warningNotification } from "@/components/utils/utility";
import { contactStore, campaignStore } from "@/store/store";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";

const RecipientSelection = () => {
  const groupData = contactStore((state) => state.groupData);
  const setGroupData = contactStore((state) => state.setGroupData);
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [clickedGroup, setClickedGroup] = useState<number[]>([]);

  useEffect(() => {
    if (groupData === null) {
      (async () => {
        try {
          const res = await fetchGroupList();
          if (res?.status === 200) {
            setGroupData(res.groups);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [groupData, setGroupData]);

  const handleAddRecipients = async (groupName: string | null) => {
    if (groupName) {
      try {
        const res = await fetchGroupItems(groupName, 1);
        if (res.status === 200) {
          const updateRecipients = res.contacts.map(
            (recipient: ContactType) => ({
              id: recipient.id,
              json: {
                name: recipient.json.name,
                email: recipient.json.email,
                group: recipient.json.group,
              },
            })
          );
          setNewCampaign((prev: any | null) => ({
            ...prev,
            recipient: prev?.recipient
              ? [...prev.recipient, ...updateRecipients]
              : [...updateRecipients],
          }));
          setOpenGroupModal(false);
        } else {
          warningNotification(res.message);
        }
      } catch (error) {
        warningNotification("Failed to add recipients.");
      }
    }
  };

  const handleClearRecipients = () => {
    setNewCampaign((prev: any | null) => ({
      ...prev,
      recipient: null,
    }));
    setClickedGroup([]);
  };

  const handleRemoveRecipient = (recipientId: number) => {
    setNewCampaign((prev: any) => ({
      ...prev,
      recipient:
        prev?.recipient?.filter((r: any) => r.id !== recipientId) || [],
    }));
  };

  const handleModifyRecipient = (
    recipientId: number,
    updatedInfo: Partial<ContactType>
  ) => {
    setNewCampaign((prev: any) => ({
      ...prev,
      recipient:
        prev?.recipient?.map((r: any) =>
          r.id === recipientId ? { ...r, ...updatedInfo } : r
        ) || [],
    }));
  };

  return (
    <div className={"relative w-full h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4"}>
      <div className=" text-brand-color font-semibold flex items-center justify-between">
        <h1 className="m-0 p-0 xl:text-xl text-sm">Recipient Selection</h1>
        {newCampaign?.recipient && (
          <button
            className="font-normal xl:text-sm text-xs dark:text-slate-300 text-dark-black border border-slate-300 px-2 py-1 rounded-md"
            onClick={() => setOpenGroupModal(true)}
          >
            Add More
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        {newCampaign?.recipient ? (
          <>
            <div className="w-full flex items-center justify-between border border-slate-300 xl:p-2 p-1 rounded-md">
              <h1 className="m-0 px-2 py-0 dark:text-slate-300 text-dark-black xl:text-base text-xs">
                {newCampaign.recipient.length} contact/s selected
              </h1>
              <h1
                className="xl:px-4 xl:py-2 px-2 py-1 bg-brand-color text-slate-300 rounded-md cursor-pointer xl:text-base text-xs"
                onClick={() => setViewRecipients(true)}
              >
                View
              </h1>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="w-1/5 xl:px-4 xl:py-2 px-2 py-1 bg-red-500 py-2 text-slate-50 flex items-center justify-center xl:text-base text-xs"
                onClick={handleClearRecipients}
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="m-0 p-0 dark:text-slate-300 text-dark-black xl:text-sm text-xs">
              Who are you sending this campaign to?
            </p>
            <div className="flex items-center justify-between h-full gap-4">
              <button className="flex items-center h-full gap-4 w-full px-4 py-2 xl:text-base text-xs border border-brand-color rounded-md text-slate-50 hover:dark:bg-dark-black hover:bg-white duration-200 ease-in-out">
                <h1 className="m-0 p-0 font-semibold dark:text-slate-300 text-dark-black">
                  Select from all contacts
                </h1>
                <Image
                  src={Images.Notebook}
                  alt="notebook"
                  className="w-1/3 "
                />
              </button>
              <span className="dark:text-slate-300 text-dark-black xl:text-base text-xs">
                or
              </span>
              <button
                className="flex items-center justify-between gap-4 full w-full px-4 py-2 xl:text-base text-xs border border-brand-color rounded-md text-slate-50 disabled:opacity-20 hover:dark:bg-dark-black hover:bg-white duration-200 ease-in-out"
                onClick={() => setOpenGroupModal(true)}
                disabled={!groupData}
              >
                <h1 className="m-0 p-0 font-semibold dark:text-slate-300 text-dark-black">Select from groups</h1>
                <Image src={Images.Groups} alt="group" className="w-1/2 " />
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        dismissible
        show={openGroupModal}
        onClose={() => setOpenGroupModal(false)}
      >
        <Modal.Header className="dark:bg-dark-glass bg-violet-50 dark:text-slate-300 text-dark-black">
          Add recipients from group
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black rounded-b-md bg-violet-50">
          <div className="flex flex-col gap-4 text-center">
            {groupData?.map((items: string, index: number) => (
              <div key={index}>
                <button
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:text-slate-300 text-dark-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
                  disabled={clickedGroup.includes(index)}
                  onClick={() => {
                    handleAddRecipients(items);
                    setClickedGroup((prev) => [...prev, index]);
                  }}
                >
                  {items}
                </button>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RecipientSelection;
