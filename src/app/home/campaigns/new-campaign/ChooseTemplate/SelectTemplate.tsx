"use client";
import React, { useEffect } from "react";
import { Modal, Table } from "flowbite-react";
import { fetchTemplate } from "@/app/api/template";
import { TemplateType, NewCampaignType } from "@/components/utils/types";
import { campaignStore } from "@/store/store";

interface SelectTemplateProps {
  chooseTemplate: string;
  setChooseTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({
  chooseTemplate,
  setChooseTemplate,
}) => {
  const templateData = campaignStore((state) => state.templateData);
  const setTemplateData = campaignStore((state) => state.setTemplateData);
  const newCampaign = campaignStore((state) => state.newCampaign);
  const setNewCampaign = campaignStore((state) => state.setNewCampaign);
console.log(newCampaign)
  useEffect(() => {
    const fetchData = async () => {
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
        } else {
          console.error("Failed to fetch templates:", res.message);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    if (!templateData) {
      fetchData();
    }
  }, [setTemplateData, templateData]);

  const handleTemplateSelection = (
    templateName: string | null,
    templateHtml: string | null
  ) => {
    if (templateName && templateHtml) {
      setNewCampaign((prev: any | null) => ({
        ...prev,
        template: {
          name: templateName,
          data: [templateHtml],
        },
      }));
      setChooseTemplate("");
    }
  };
  

  return (
    <Modal
      dismissible
      show={chooseTemplate === "select"}
      onClose={() => setChooseTemplate("")}
    >
      <Modal.Header className="dark:bg-dark-glass bg-violet-50 text-slate-300">
        Select a template from the list below
      </Modal.Header>
      <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300">
        <Table hoverable striped className="w-full !h-20 overflow-y-scroll">
          <Table.Head className="sticky top-0 py-0 !rounded-tl-md w-full">
            <Table.HeadCell className="text-center sticky top-0 py-2">
              Template Name
            </Table.HeadCell>
            <Table.HeadCell className="text-center sticky top-0 py-2">Id</Table.HeadCell>
            <Table.HeadCell className="text-center sticky top-0 py-2">
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y w-full rounded-l-md left-0 duration-200 ease-in overflow-auto shadow-md">
            {templateData &&
              templateData.map((item: TemplateType, index: number) => (
                <Table.Row
                  key={index}
                  className="dark:border-gray-700 dark:bg-gray-800 w-full"
                >
                  <Table.Cell className="my-auto align-middle h-full text-center">
                    <h1 className="m-0 p-0 text-center dark:text-slate-300 text-dark-black my-auto">
                      {item.name}
                    </h1>
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <h1 className="text-center dark:text-slate-300 text-dark-black my-auto">
                      {item.id}
                    </h1>
                  </Table.Cell>
                  <Table.Cell className="w-full text-center flex items-center justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-brand-color rounded-md text-slate-300"
                      onClick={() => handleTemplateSelection(item.name, item.template.html)}
                    >
                      Use
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default SelectTemplate;
