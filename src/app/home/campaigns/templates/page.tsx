"use client";
import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { fetchTemplate } from "@/app/api/template";
import { contactStore } from "@/store/store";
import { TemplateType } from "@/components/utils/types";

const Templates = () => {
  const templateData = contactStore((state) => state.templateData);
  const setTemplateData = contactStore((state) => state.setTemplateData);

  const [demo, setDemo] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
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
    })();
  }, [setTemplateData]);
  return (
    <div className="w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex gap-4 overflow-hidden">
      <div className="w-full">
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
            {templateData.map((item: TemplateType, index: number) => (
              <Table.Row
                key={index}
                className="dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell
                  className={`my-auto align-middle h-full ${
                    demo !== null ? "w-1/2" : "w-1/3"
                  } text-center`}
                >
                  <h1 className="m-0 p-0 text-center dark:text-slate-300 text-dark-black my-auto">
                    {item.name}
                  </h1>
                </Table.Cell>
                <Table.Cell
                  className={`${
                    demo !== null ? "w-full" : "w-1/3"
                  } text-center`}
                >
                  <h1 className="text-center dark:text-slate-300 text-dark-black my-auto">
                    {item.id}
                  </h1>
                </Table.Cell>
                <Table.Cell
                  className={`w-full text-center flex items-center justify-center gap-4 `}
                >
                  <button
                    className="px-4 py-2 bg-brand-color rounded-md text-slate-300"
                    onClick={() => {
                      setDemo(item.template);
                    }}
                  >
                    Preview
                  </button>
                  <button className="px-4 py-2 bg-brand-color rounded-md text-slate-300">
                    Use
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div
        className={`${
          demo === null ? "w-0" : "w-2/3 border border-light-glass"
        } relative rounded-r-md shadow-md right-0 duration-200 ease-in`}
      >
        <div
          className={` ${demo !== null ? "contents" : "hidden"}`}
          dangerouslySetInnerHTML={{ __html: `${demo}` }}
        />
        {demo !== null && (
          <button
            className="absolute top-0 right-0 bg-red-500 px-4 rounded-bl-md"
            onClick={() => {
              setDemo(null);
            }}
          >
            close
          </button>
        )}
      </div>
    </div>
  );
};
export default Templates;
