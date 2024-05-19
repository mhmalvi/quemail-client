"use client";
import { themeStore } from "@/store/store";
import React, { useRef, useEffect, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const MainEditor = () => {
  const themes = themeStore((state: any) => state.theme);
  const emailEditorRef = useRef<EditorRef>(null);

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

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    console.log("Editor is ready");
  };
  const [saveClicked, setSaveClicked] = useState<boolean>(false);
  useEffect(() => {
    if (saveClicked) {
      const unlayer = emailEditorRef.current?.editor;
      if (unlayer) {
        unlayer.exportHtml((design: any) => {
          console.log("design", design);
          // Here you can add additional code to handle the saved design,
          // such as sending it to a server or saving it to local storage.
        });
      }
    }
  }, [saveClicked]);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden rounded-md">
      <div className="flex items-center justify-end gap-4 ">
        <button
          className="px-4 py-2 bg-brand-color rounded-md"
          onClick={() => {
            setSaveClicked(!saveClicked);
          }}
        >
          Save Template
        </button>
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Export HTML
        </button>
      </div>
      <div className="h-full flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default MainEditor;
