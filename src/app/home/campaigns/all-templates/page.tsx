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

      window.location.href =
        window.location.pathname + "?reload=" + new Date().getTime();
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
    <div className="relative w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md flex gap-4 overflow-auto scroll-smooth">
      {templateData && templateData.length > 0 ? (
        <div className="w-full flex flex-col  gap-4 border-brand-color">
          <div className="flex flex-wrap items-center justify-around gap-4 p-4">
            <div className=" hover:translate-y-2 duration-100 ease-in-out border border-violet-200 dark:border-light-glass 2xl:w-64 2xl:h-96 w-48 h-60 rounded-md flex flex-col items-center">
              <div
                onClick={() => setOpenTemplateModal(true)}
                className=" cursor-pointer w-full h-full bg-violet-50 dark:bg-dark-black overflow-hidden h-full flex items-center justify-center rounded-md text-dark-black dark:text-slate-300"
              >
                <p className="p-0 m-0 text-xs 2xl:text-base font-semibold ">
                  Create a new template
                </p>
              </div>
            </div>
            {templateData !== null &&
              templateData.map((item: TemplateType, index: number) => {
                console.log(item);
                return (
                  <div
                    key={index}
                    className=" border border-violet-200 dark:border-light-glass 2xl:w-64 2xl:h-96 w-48 h-60 rounded-md flex flex-col items-center rounded-md overflow-hidden hover:translate-y-2 duration-100"
                  >
                    <div className="relative w-full h-1/2 bg-[#F7F8F9] overflow-hidden flex flex-start border-b border-violet-200 dark:border-light-glass">
                      <div
                        className="2xl:scale-50 scale-[0.38] origin-top-left"
                        dangerouslySetInnerHTML={{
                          __html: `${item.template.html}`,
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between w-full h-1/4 bg-violet-50 dark:bg-dark-black overflow-hidden px-4 border-b border-violet-200 dark:border-light-glass ">
                      <p className="text-xs 2xl:text-base text-dark-black dark:text-slate-300 ">
                        {item.name}
                      </p>
                      <p className="text-xs 2xl:text-base text-dark-black dark:text-slate-300 ">
                        {item.id}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-full h-1/4 bg-violet-50 dark:bg-dark-black overflow-hidden">
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
                            className="hover:text-brand-color dark:hover:text-brand-color cursor-pointer text-dark-black dark:text-slate-300 "
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
                              className="hover:text-red-500 dark:hover:text-red-500 text-dark-black dark:text-slate-300 cursor-pointer"
                            />
                          </Tooltip>
                        </Popover>
                        <Tooltip
                          content={`Use this template now`}
                          className="bg-brand-color text-white"
                        >
                          <TbRocket
                            size={25}
                            onClick={() =>
                              handleTemplateSelection(
                                item.name,
                                item.template.html
                              )
                            }
                            className="hover:text-brand-color dark:hover:text-brand-color cursor-pointer text-dark-black dark:text-slate-300 "
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
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
