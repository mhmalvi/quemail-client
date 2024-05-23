"use client";
import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { fetchTemplate } from "@/app/api/template";
import { contactStore } from "@/store/store";
import { TemplateType } from "@/components/utils/types";

const AllTemplates = () => {
  const templateData = contactStore((state) => state.templateData);
  const setTemplateData = contactStore((state) => state.setTemplateData);

  const [demo, setDemo] = useState<string | null>(null);
  const [zoom, setZoom] = useState<any>(1);
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
      <div
        className={`w-full ${
          demo !== null ? "border-r" : "border-none"
        } border-brand-color`}
      >
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
          demo === null ? "w-0" : "w-4/5"
        } py-8 bg-[#f7f8f9] relative rounded-r-md shadow-md right-0 duration-200 ease-in overflow-auto`}
      >
        <div
          style={{ transform: `scale(${zoom})` }}
          className="bg-white flex items-start justify-start"
        >
          <div
            className={` ${demo !== null ? "contents " : "hidden"}`}
            dangerouslySetInnerHTML={{ __html: demo || "" }}
          />
        </div>
      </div>
      {demo !== null && (
        <button
          className="absolute top-0 right-0 bg-red-500 px-4 rounded-bl-md rounded-tr-md"
          onClick={() => {
            setDemo(null);
            setZoom(1);
          }}
        >
          close
        </button>
      )}
      {demo !== null && (
        <div className="absolute top-8 right-0 flex items-center gap-4 px-4">
          <button
            className="bg-brand-color px-2 rounded-md"
            onClick={() => {
              setZoom(zoom - 0.1);
            }}
          >
            -
          </button>
          <button
            className="bg-brand-color px-2 rounded-md"
            onClick={() => {
              setZoom(zoom + 0.1);
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
export default AllTemplates;
