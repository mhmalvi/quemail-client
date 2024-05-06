"use client";
import React from "react";
import { useCSVReader } from "react-papaparse";

const ImportCSV = () => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        console.log(results);
        console.log("---------------------------");
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div className="flex items-center gap-4">
            <button type="button" {...getRootProps()} className="w-1/5">
              Browse file
            </button>
            <div className="border border-slate-300 h-11 w-10/12 rounded-md flex items-center p-4">
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
          <ProgressBar className="!bg-brand-color mt-4" />
        </>
      )}
    </CSVReader>
  );
};
export default ImportCSV;
