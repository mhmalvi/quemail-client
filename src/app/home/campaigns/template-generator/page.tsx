"use client";
import React from "react";
import "./template.css";
import dynamic from "next/dynamic";
const TemplateGenerator = () => {
  const Editor = dynamic(() => import("./MainEditor"), {
    ssr: false,
  });
  return (
    <>
      {typeof window !== "undefined" && (
        <div className="h-full flex flex-col gap-4 overflow-hidden rounded-md">
          <div className="flex items-center justify-end gap-4 ">
            <button className="px-4 py-2 bg-brand-color rounded-md">
              Save Template
            </button>
            <button className="px-4 py-2 bg-brand-color rounded-md">
              Export HTML
            </button>
          </div>
          <div className="h-full flex items-center justify-center">
            <Editor />
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateGenerator;
