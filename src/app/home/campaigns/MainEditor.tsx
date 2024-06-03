"use client";
import { campaignStore, themeStore } from "@/store/store";
import React, { useRef, useEffect, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveTemplate } from "@/app/api/template";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { useRouter } from "next/navigation";
import { Dropdown, Tooltip } from "flowbite-react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { fields } from "@/components/utils/staticData";

const MainEditor = () => {
  const router = useRouter();
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  const [saveClicked, setSaveClicked] = useState<boolean>(false);
  const themes = themeStore((state: any) => state.theme);
  const templateData = campaignStore((state) => state.templateData);
  const selectedTemplate = campaignStore((state) => state.selectedTemplate);
  const emailEditorRef = useRef<EditorRef>(null);

  const [data, setData] = useState({
    template: "",
    name: selectedTemplate?.name || null,
    user_id: userID,
  });
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
  console.log();
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    const templateDesign = templateData && templateData[0]?.template?.design;
    if (templateDesign) {
      unlayer.loadDesign(selectedTemplate?.template.design as any);
    }
  };
  const onLoad: EmailEditorProps["onLoad"] = () => {
    const unlayer = emailEditorRef.current?.editor;
    if (unlayer) {
      unlayer.addEventListener("design:updated", function (data: any) {
        // Design is updated by the user
        var type = data.type; // body, row, content
        var item = data.item;
        var changes = data.changes;
        console.log("design:updated", type, item, changes);
      });
    }
  };

  useEffect(() => {
    if (saveClicked) {
      const unlayer = emailEditorRef.current?.editor;
      if (unlayer) {
        unlayer.exportHtml((data: any) => {
          setData((prev) => ({
            ...prev,
            template: data,
          }));
          console.log("Exported", data);
        });
      }
    }
  }, [saveClicked]);

  useEffect(() => {
    saveClicked &&
      data.template &&
      (async () => {
        if (data.template) {
          const res = await saveTemplate(data);
          if (res.status === 201) {
            successNotification(res.message);
            window.location.reload();
          } else if (res.status === 409) {
            warningNotification(res.message);
          } else if (res.status === 422) {
            warningNotification(res.message);
          } else {
            warningNotification(res.message);
          }
          setSaveClicked(false);
        }
      })();
  }, [data, data.template, router, saveClicked]);

  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-hidden rounded-md ">
      <div className="flex items-center justify-between w-full pl-2">
        <div className="flex gap-16 items-center w-1/2">
          <input
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            defaultValue={data.name as any}
            placeholder="Enter template name here"
            className="w-1/3 px-4 py-1 rounded-md bg-transparent text-dark-black border dark:border-light-glass shadow-md dark:text-slate-300"
          />
          <Tooltip
            content="Copy from available shortcodes into template"
            className="bg-light-black"
          >
            <Dropdown
              label="Actions"
              placement="bottom-start"
              renderTrigger={() => (
                <div className="cursor-pointer flex items-center gap-4 bg-brand-color px-4 py-1 rounded-md">
                  <h1>Select dynamic headers</h1>
                  <Image
                    src={Images.Copy}
                    alt="copy"
                    className="w-8 rounded-md fill-dark-black"
                  />
                </div>
              )}
            >
              {fields.map((items: any, index: number) => {
                return (
                  <div key={index}>
                    <Dropdown.Item
                      className="dark:text-slate-300 text-light-black hover:text-gray-800"
                      onClick={() => {
                        navigator.clipboard.writeText(`{${items.label}}`);
                        successNotification(
                          `${items.label} copied to clipboard as {${items.label}}`
                        );
                      }}
                    >
                      {items?.label}
                    </Dropdown.Item>
                  </div>
                );
              })}
            </Dropdown>
          </Tooltip>
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
      <div className="xl:h-[78dvh] h-[65dvh] flex items-center justify-center">
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          onLoad={onLoad}
          minHeight={"100%"}
          editorId="ok"
          options={{
            appearance: {
              theme: "modern_dark",
            },
            tools: {},
          }}
        />
      </div>
    </div>
  );
};

export default MainEditor;
