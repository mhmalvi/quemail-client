"use client";
import { fetchGroupItems, fetchGroupList } from "@/app/api/contact";
import { ContactType } from "@/components/utils/types";
import { warningNotification } from "@/components/utils/utility";
import { contactStore, campaignStore } from "@/store/store";
import { Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { recipientsByGroup } from "@/app/api/campaign";
import { currentResourcesStatus } from "@/app/api/billing";

const RecipientSelection = ({ tabsRef }: any) => {
  const groupData = contactStore((state) => state.groupData);
  const setGroupData = contactStore((state) => state.setGroupData);
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
  const viewRecipients = campaignStore((state) => state.viewRecipients);
  const setViewRecipients = campaignStore((state) => state.setViewRecipients);
  const clickedGroup = campaignStore((state) => state.clickedGroup);
  const setClickedGroup = campaignStore((state) => state.setClickedGroup);
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const checkEmailStatus = async (emailNumber: number) => {
    console.log("check email number: ", emailNumber);
    const res = await currentResourcesStatus();
    if (
      res &&
      res.message === "success" &&
      res.remainingLimit.remainingMail < emailNumber
    ) {
      setError(true);
      setErrorMessage("Exceeds email limit!");
    } else {
      setError(false);
      setErrorMessage(null);
    }
  };

  const handleAddRecipients = async (groupName: string | null) => {
    if (groupName) {
      try {
        const res = await recipientsByGroup(groupName, 1, 1);
        if (res.status === 200) {
          const groupRes = await recipientsByGroup(groupName, 1, res.total);
          try {
            if (groupRes.status === 200) {
              const updateRecipients = groupRes.contacts.map(
                (recipient: ContactType) => ({
                  id: recipient.id,
                  json: {
                    name: recipient.json.name,
                    email: recipient.json.email,
                    group: recipient.json.group,
                  },
                })
              );
              console.log(
                "check newCampaign recipient : ",
                newCampaign?.recipient?.length
              );
              console.log(
                "check updateRecipients length : ",
                updateRecipients.length
              );

              if (newCampaign?.recipient?.length && updateRecipients.length) {
                const updatedRecipients =
                  newCampaign?.recipient?.length + updateRecipients.length;
                await checkEmailStatus(updatedRecipients);
              } else {
                await checkEmailStatus(updateRecipients.length);
              }

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
          // },1500)
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
    setErrorMessage(null);
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
    <div className="relative w-full flex flex-col items-center justify-center xl:py-16 py-4 px-4 gap-4 h-full">
      <div className="w-1/2 text-brand-color font-semibold flex items-center justify-between">
        <h1 className="m-0 p-0 xl:text-xl text-sm">Recipient Selection</h1>
        {newCampaign?.recipient && (
          <button
            className="font-normal xl:text-sm text-xs bg-red-500 text-white px-2 py-1 rounded-md"
            onClick={handleClearRecipients}
          >
            Clear
          </button>
        )}
      </div>
      <div className="w-1/2 flex flex-col gap-4 overflow-auto">
        {newCampaign?.recipient ? (
          <div className="flex items-center gap-4">
            <div className="w-full flex items-center justify-between border border-light-black dark:border-light-glass xl:p-2 p-1 rounded-md">
              <h1 className="m-0 px-2 py-0 dark:text-slate-300 text-dark-black xl:text-base text-xs">
                {newCampaign.recipient.length} contact/s selected
              </h1>
              <h1
                className="px-4 xl:py-2 py-1 bg-brand-color text-slate-300 rounded-md cursor-pointer xl:text-base text-xs"
                onClick={() => setViewRecipients(true)}
              >
                View
              </h1>
            </div>

            <button
              className="w-1/5 xl:p-4 p-2 border text-dark-black dark:text-slate-300 border-light-black dark:border-light-glass px-2 py-1 rounded-md"
              onClick={() => setOpenGroupModal(true)}
            >
              Add More
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="m-0 p-0 dark:text-slate-300 text-dark-black xl:text-sm text-xs">
              Who are you sending this campaign to?
            </p>
            <div className="flex items-center justify-between h-full gap-4">
              <button className="flex xl:flex-row flex-col items-center h-full gap-4 w-full px-4 py-2 xl:text-base text-xs border border-brand-color rounded-md text-slate-50 hover:dark:bg-dark-black hover:bg-white duration-200 ease-in-out">
                <h1 className="m-0 p-0 font-semibold dark:text-slate-300 text-dark-black">
                  Select from all contacts
                </h1>
                <Image src={Images.Notebook} alt="notebook" className="w-40 " />
              </button>
              <span className="dark:text-slate-300 text-dark-black xl:text-base text-xs">
                or
              </span>
              <button
                className="flex xl:flex-row flex-col items-center justify-between gap-4 full w-full px-4 py-2 xl:text-base text-xs border border-brand-color rounded-md text-slate-50 disabled:opacity-20 hover:dark:bg-dark-black hover:bg-white duration-200 ease-in-out"
                onClick={() => setOpenGroupModal(true)}
                disabled={!groupData}
              >
                <h1 className="m-0 p-0 font-semibold dark:text-slate-300 text-dark-black">
                  Select from groups
                </h1>
                <Image src={Images.Groups} alt="group" className="w-40 " />
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
        <Modal.Header>
          <p className=" dark:text-slate-300 text-dark-black">
            Add recipients from group
          </p>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black rounded-b-md bg-white">
          <div className="flex flex-col gap-4 text-center">
            {groupData?.map((items: string, index: number) => (
              <div key={index}>
                <button
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:text-slate-300 text-dark-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
                  disabled={
                    clickedGroup !== null && clickedGroup.includes(index)
                  }
                  onClick={() => {
                    handleAddRecipients(items);
                    setClickedGroup((prev) =>
                      prev ? [...prev, index] : [index]
                    );
                  }}
                >
                  {items}
                </button>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={viewRecipients}
        onClose={() => setViewRecipients(false)}
        className="flex items-center justify-center w-full"
      >
        <div className="h-[80vh] overflow-hidden relative">
          <Modal.Header>
            <p className=" dark:text-slate-300 text-dark-black">
              Selected Recipients
            </p>
          </Modal.Header>
          <Modal.Body className="h-[80vh] dark:bg-dark-glass bg-violet-50 text-slate-300 relative p-0">
            <Table className="w-full ">
              <Table.Head className="sticky top-0 py-0 !rounded-tl-md w-full">
                <Table.HeadCell className="sticky text-center top-0 py-2">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="sticky text-center top-0 py-2">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="sticky text-center top-0 py-2">
                  Group
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {newCampaign?.recipient !== null &&
                  newCampaign?.recipient.map((item: any, index: number) => (
                    <Table.Row
                      key={index}
                      className="dark:border-gray-700 dark:bg-transparent w-full"
                    >
                      <Table.Cell className="w-1/3 text-center dark:text-slate-300 text-dark-black">
                        {item.json.name}
                      </Table.Cell>
                      <Table.Cell className="w-1/3 text-center dark:text-slate-300 text-dark-black">
                        {item.json.email}
                      </Table.Cell>
                      <Table.Cell className="w-1/3 text-center dark:text-slate-300 text-dark-black">
                        {item.json.group}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Modal.Body>
        </div>
      </Modal>
      <div className="flex items-center justify-center w-full gap-4">
        <div className="flex items-center justify-between w-1/2 gap-4">
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            onClick={() => tabsRef.current.setActiveTab(1)}
          >
            Previous
          </button>
          {error && errorMessage && (
            <p className="text-red-500 font-medium text-sm">{errorMessage}</p>
          )}
          <button
            className="text-sm xl:text-base border border-brand-color text-dark-black dark:text-slate-300 xl:px-8 px-4 xl:py-2 py-1 rounded-md disabled:opacity-20"
            disabled={newCampaign?.recipient === null || error}
            onClick={() => tabsRef.current.setActiveTab(3)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientSelection;
