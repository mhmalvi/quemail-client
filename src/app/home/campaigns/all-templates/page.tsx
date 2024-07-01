"use client";
import React, { useState, useEffect } from "react";
import { Modal, Popover, Table, Tooltip } from "flowbite-react";
import { fetchTemplate, destroyTemplate } from "@/app/api/template";
import { campaignStore } from "@/store/store";
import { TemplateType } from "@/components/utils/types";
import Image from "next/image";
import Images from "@/components/utils/images";
import { TbRocket, TbEye, TbTrash } from "react-icons/tb";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import dynamic from "next/dynamic";
import NoContacts from "@/app/home/HomeLayoutUI/NoContacts";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import { BIG_BUTTON_STYLES } from "@/components/styles/button";
import { useRouter } from "next/navigation";

const AllTemplates = () => {
  const Editor = dynamic(() => import("../MainEditor"), {
    ssr: false,
  });
  const router = useRouter();
  const templateData = campaignStore((state) => state.templateData);
  const setTemplateData = campaignStore((state) => state.setTemplateData);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
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
              userID: template.userID,
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
  const handleTemplateSelection = (
    templateName: string | null,
    templateHtml: string | null
  ) => {
    if (templateName && templateHtml) {
      setNewCampaign((prev: any | null) => ({
        ...prev,
        template: {
          name: templateName,
          data: templateHtml,
        },
      }));

      router.push("/home/campaigns/new-campaign");
    }
  };
  return (
    <div className={CONTAINER_STYLES}>
      {templateData && templateData.length > 0 ? (
        <div className="w-full flex flex-col gap-4 border-brand-color">
          <div className="flex items-center justify-end">
            <button
              className={BIG_BUTTON_STYLES}
              onClick={() => setOpenTemplateModal(true)}
            >
              Create a New Template
            </button>
          </div>
          <Table
            hoverable
            striped
            className="w-full rounded-md overflow-hidden"
          >
            <Table.Head>
              <Table.HeadCell className="text-center w-1/3">
                Template Name
              </Table.HeadCell>
              <Table.HeadCell className="w-1/3"></Table.HeadCell>
              <Table.HeadCell className="text-center w-1/3">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y w-full left-0 overflow-auto dark:shadow-brand-color">
              {templateData !== null &&
                templateData.map((item: TemplateType, index: number) => (
                  <Table.Row
                    key={index}
                    className="w-full dark:border-gray-700 overflow-hidden"
                  >
                    <Table.Cell className="w-1/3">
                      <h1 className="m-0 p-0 text-center dark:text-slate-300 text-dark-black my-auto">
                        {item.name}
                      </h1>
                    </Table.Cell>
                    <Table.Cell className="w-1/3 ">
                      {/* <h1 className="dark:text-slate-300 text-dark-black my-auto">
                        {item.id}
                      </h1> */}
                    </Table.Cell>
                    <Table.Cell className="w-1/3">
                      <div className="text-center flex items-center justify-center gap-4 ">
                        <Tooltip
                          content="Preview Template"
                          className="bg-brand-color"
                        >
                          <TbEye
                            size={25}
                            onClick={() => {
                              setOpenTemplateModal(true);
                              setSelectedTemplate(item);
                            }}
                            className="cursor-pointer hover:text-brand-color"
                          />
                        </Tooltip>

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
                          <Tooltip
                            content="Remove Template"
                            className="bg-red-500"
                          >
                            <TbTrash
                              size={25}
                              className="hover:text-red-500 cursor-pointer"
                            />
                          </Tooltip>
                        </Popover>
                        <Tooltip
                          content={`Use template ${item.name} in Campaign`}
                          className="bg-brand-color text-white"
                        >
                          <div
                            className="px-4 py-1 rounded-md border border-brand-color hover:bg-brand-color hover:text-yellow-200 cursor-pointer"
                            onClick={() =>
                              handleTemplateSelection(
                                item.name,
                                item.template.html
                              )
                            }
                          >
                            <TbRocket size={25} />
                          </div>
                        </Tooltip>
                      </div>
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
              className={BIG_BUTTON_STYLES}
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
          Edit {templateData ? templateData[0]?.name : ""}
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 h-[calc(100vh-100px)] overflow-y-auto">
          <Editor />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default AllTemplates;
