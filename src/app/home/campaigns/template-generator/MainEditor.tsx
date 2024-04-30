"use client";
import { themeStore } from "@/store/store";
import React, { useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
const MainEditor = () => {
  const themes = themeStore((state: any) => state.theme);
  const emailEditorRef = useRef<EditorRef>(null);
  const unlayer = emailEditorRef.current?.editor;
  const optionsDark = {
    appearance: {
      theme: "dark",
    },
  };
  const optionsLight = {
    appearance: {
      theme: "light",
    },
  };
  const exportHtml = () => {
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {};
  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={onReady}
      minHeight={"100%"}
      editorId="ok"
      options={optionsDark}
    />
  );
};
export default MainEditor;
