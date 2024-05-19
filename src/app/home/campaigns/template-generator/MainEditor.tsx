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
  // const exportHtml = () => {
  unlayer?.exportHtml((data) => {
    const { design, html } = data;
    console.log("exportHtml", html);
    console.log("design", design);
  });
  // };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      console.log("design", design);
    });
  };
  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={onReady}
      minHeight={"100%"}
      editorId="ok"
      options={{
        appearance: {
          theme: "dark",
        },
      }}
    />
  );
};
export default MainEditor;
