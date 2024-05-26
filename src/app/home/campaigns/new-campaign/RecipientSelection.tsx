"use client";
import { fetchGroupItems, fetchGroupList } from "@/app/api/contact";
import { ContactType, NewCampaignType } from "@/components/utils/types";
import { warningNotification } from "@/components/utils/utility";
import { contactStore, campaignStore } from "@/store/store";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";

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
          } else {
            warningNotification(res.message);
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
        const res = await fetchGroupItems(groupName);
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
    <div className="relative w-1/3 h-full flex flex-col p-4 dark:bg-dark-glass bg-violet-50 rounded-md shadow-md border dark:border-none gap-4">
      <div className="xl:text-xl text-brand-color font-semibold flex items-center justify-between">
        <h1>Recipient Selection</h1>
        {newCampaign?.recipient && (
          <button
            className="font-normal text-sm dark:text-slate-300 text-dark-black border border-slate-300 px-2 py-1 rounded-md"
            onClick={() => setOpenGroupModal(true)}
          >
            Add More
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        {newCampaign?.recipient ? (
          <>
            <div className="w-full flex items-center justify-between border border-slate-300 xl:py-2 xl:px-2 p-2 rounded-md">
              <h1 className="m-0 px-2 py-0 dark:text-slate-300 text-dark-black">
                {newCampaign.recipient.length} contact/s selected
              </h1>
              <h1
                className="px-4 py-1 bg-brand-color text-slate-300 rounded-md cursor-pointer"
                onClick={() => setViewRecipients(true)}
              >
                View
              </h1>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="w-1/4 px-4 py-2 bg-red-500 py-2 text-slate-50 flex items-center justify-center "
                onClick={handleClearRecipients}
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="m-0 p-0 dark:text-slate-300 text-dark-black text-sm">
              Who are you sending this campaign to?
            </p>
            <div className="flex flex-col gap-4">
              <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300">
                Select from all contacts
              </button>
              <button
                className="px-4 py-2 bg-brand-color rounded-md text-slate-300 disabled:opacity-20"
                onClick={() => setOpenGroupModal(true)}
                disabled={!groupData}
              >
                Select from groups
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
