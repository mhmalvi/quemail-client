"use client";
import React, { useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import "./template.css";
const TemplateGenerator = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {};
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden rounded-md">
      <div className="flex items-center justify-end gap-4 ">
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Save Template
        </button>
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Export HTML
        </button>
      </div>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};
export default TemplateGenerator;
