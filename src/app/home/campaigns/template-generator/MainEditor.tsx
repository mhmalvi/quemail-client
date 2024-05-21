"use client";
import { themeStore } from "@/store/store";
import React, { useRef, useEffect, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveTemplate } from "@/app/api/template";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { useRouter } from "next/navigation";

const MainEditor = () => {
  const router = useRouter();
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const [data, setData] = useState({
    template: "",
    name: "",
    user_id: userID,
  });
  const [saveClicked, setSaveClicked] = useState<boolean>(false);
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

  useEffect(() => {
    if (saveClicked) {
      const unlayer = emailEditorRef.current?.editor;
      if (unlayer) {
        unlayer.exportHtml((data: any) => {
          setData((prev) => ({
            ...prev,
            template: data.html,
          }));
        });
      }
    }
  }, [saveClicked]);

  useEffect(() => {
    const onSave = async () => {
      if (data.template) {
        const res = await saveTemplate(data);
        if (res.status === 201) {
          successNotification(res.message);
          router.push("/home/campaigns/templates");
        } else if (res.status === 409) {
          warningNotification(res.message);
        } else if (res.status === 422) {
          warningNotification(res.message);
        } else {
          warningNotification(res.message);
        }
        setSaveClicked(false);
      }
    };

    if (saveClicked && data.template) {
      onSave();
    }
  }, [data, data.template, saveClicked]);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden rounded-md ">
      <div className="flex items-center justify-between w-full pl-2">
        <div className="w-1/4">
          <input
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            placeholder="Enter template name here"
            className="w-full px-4 py-1 rounded-md bg-transparent text-dark-black border dark:border-light-glass shadow-md dark:text-slate-300"
          />
        </div>
        <div className="flex items-center justify-end gap-4 ">
          <button
            className="px-4 py-2 bg-brand-color rounded-md disabled:opacity-20"
            onClick={() => {
              setSaveClicked(true);
            }}
            disabled={data.name === ""}
          >
            Save Template
          </button>
          <button className="px-4 py-2 bg-brand-color rounded-md disabled:opacity-20">
            Export HTML
          </button>
        </div>
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
