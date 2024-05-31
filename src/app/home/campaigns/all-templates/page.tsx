"use client";
import React, { useState, useEffect } from "react";
import { Modal, Popover, Table } from "flowbite-react";
import { fetchTemplate, destroyTemplate } from "@/app/api/template";
import { campaignStore } from "@/store/store";
import { TemplateType } from "@/components/utils/types";
import Image from "next/image";
import Images from "@/components/utils/images";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import dynamic from "next/dynamic";
import NoContacts from "@/components/HomeLayoutUI/NoContacts";

const AllTemplates = () => {
  const Editor = dynamic(() => import("../MainEditor"), {
    ssr: false,
  });
  const templateData = campaignStore((state) => state.templateData);
  const setTemplateData = campaignStore((state) => state.setTemplateData);
  const setSelectedTemplate = campaignStore(
    (state) => state.setSelectedTemplate
  );
  const [openDeletePopover, setOpenDeletePopover] = useState<null | number>(
    null
  );
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchTemplate();
        if (res.status === 200) {
          const updatedTemplateData = res.templates.map(
            (template: TemplateType) => ({
              name: template.name,
              client_id: template.client_id,
              id: template.id,
              template: template.template,
            })
          );
          setTemplateData(updatedTemplateData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setTemplateData]);

  const onDelete = async (data: number | null) => {
    const res = await destroyTemplate(data);
    if (res.status === 201) {
      successNotification(res.message);
      window.location.reload();
    } else {
      warningNotification("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex gap-4 overflow-hidden">
      {templateData && templateData.length > 0 ? (
        <div className="w-full flex flex-col gap-4 border-brand-color duration-200 ease-in">
          <div className="flex items-center justify-end">
            <button
              className="px-4 py-2 bg-brand-color rounded-md"
              onClick={() => setOpenTemplateModal(true)}
            >
              Create a New Template
            </button>
          </div>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell className="text-center w-full">
                Template Name
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-full">Id</Table.HeadCell>
              <Table.HeadCell className={`text-center w-full`}>
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y w-full rounded-l-md left-0 duration-200 ease-in overflow-auto shadow-md">
              {templateData !== null &&
                templateData.map((item: TemplateType, index: number) => (
                  <Table.Row
                    key={index}
                    className="dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell
                      className={`my-auto align-middle h-full w-1/3 text-center`}
                    >
                      <h1 className="m-0 p-0 text-center dark:text-slate-300 text-dark-black my-auto">
                        {item.name}
                      </h1>
                    </Table.Cell>
                    <Table.Cell className={`w-1/3 text-center`}>
                      <h1 className="text-center dark:text-slate-300 text-dark-black my-auto">
                        {item.id}
                      </h1>
                    </Table.Cell>
                    <Table.Cell
                      className={`w-full text-center flex items-center justify-center gap-4 `}
                    >
                      <Image
                        src={Images.Eye}
                        alt="eye"
                        className="cursor-pointer w-16 opacity-50 fill-transparent"
                        onClick={() => {
                          setOpenTemplateModal(true);
                          setSelectedTemplate(item);
                        }}
                      />
                      <Popover
                        aria-labelledby="default-popover"
                        open={openDeletePopover === item.id}
                        onOpenChange={() => {
                          setOpenDeletePopover(
                            openDeletePopover === item.id ? null : item.id
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
                                  onDelete(item.id);
                                }}
                                className="px-4 py-2 bg-red-500 rounded-md text-white"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => {
                                  setOpenDeletePopover(null);
                                }}
                                className="px-4 py-2 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
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
      ) : (
        <div className="relative w-full h-full rounded-md p-4 flex flex-col items-center justify-center gap-8 overflow-hidden">
          <NoContacts />
          <div className="flex gap-8 items-center">
            <button
              className="py-2 px-4 rounded-md bg-brand-color"
              onClick={() => {
                setOpenTemplateModal(true);
              }}
            >
              Create a Template
            </button>
          </div>
        </div>
      )}
      <Modal
        show={openTemplateModal}
        dismissible
        onClose={() => {
          setOpenTemplateModal(false);
          setSelectedTemplate(null);
        }}
        size={"9xl"}
        className="h-screen"
      >
        <Modal.Header className="dark:bg-dark-glass bg-violet-50 text-slate-300 ">
          Edit {templateData && templateData[0].name}
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 h-[calc(100vh-100px)] overflow-y-auto">
          <Editor />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default AllTemplates;
