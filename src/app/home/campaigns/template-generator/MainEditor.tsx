import React, { useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
const MainEditor = () => {
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
    <div className="w-full h-full">
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};
export default MainEditor;
