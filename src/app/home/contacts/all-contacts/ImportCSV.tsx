"use client";
import { contactStore } from "@/store/store";
import React, { useState } from "react";
import { useCSVReader } from "react-papaparse";

const ImportCSV = () => {
  const { CSVReader } = useCSVReader();
  const setCsvData = contactStore((state: any) => state.setCsvData);
  const csvData = contactStore((state: any) => state.csvData);
  console.log(csvData);
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        // console.log("---------------------------");
        // console.log(results);
        // console.log("---------------------------");
        results && setCsvData(results);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              {...getRootProps()}
              className="w-1/5 bg-brand-color py-2 rounded-md"
            >
              Browse file
            </button>
            <div className="border border-slate-300 h-11 w-10/12 rounded-md flex items-center p-4">
              {acceptedFile && acceptedFile.name}
            </div>
          </div>
          <ProgressBar className="!bg-brand-color mt-4" />
          <div className="flex w-full items-center justify-end gap-4  ">
            <button
              // {...getRemoveFileProps()}
              className="flex items-center justify-center bg-brand-color px-4 py-2 rounded-md"
            >
              Edit & Save
            </button>
            <button
              {...getRemoveFileProps()}
              className="flex items-center justify-center bg-red-500 px-4 py-2 rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </CSVReader>
  );
};
export default ImportCSV;
