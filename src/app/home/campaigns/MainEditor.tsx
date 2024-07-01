"use client";
import { campaignStore, themeStore } from "@/store/store";
import React, { useRef, useEffect, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveTemplate, updateTemplate } from "@/app/api/template";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { useRouter } from "next/navigation";
import { Dropdown, Tooltip } from "flowbite-react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { fields } from "@/components/utils/staticData";
import { BIG_BUTTON_STYLES } from "@/components/styles/button";
import { register } from "module";

const MainEditor = () => {
  const router = useRouter();
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  const [saveClicked, setSaveClicked] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const templateData = campaignStore((state) => state.templateData);
  const selectedTemplate = campaignStore((state) => state.selectedTemplate);
  const emailEditorRef = useRef<EditorRef>(null);

  const [data, setData] = useState({
    template: "",
    name: selectedTemplate?.name || null,
    userID: userID,
    id: selectedTemplate?.id,
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
        console.log("design:updated", changes, item, type);
        if (item !== undefined || changes !== undefined || type !== undefined) {
          setDisableButton(false);
        }
      });
    }
    if (emailEditorRef.current) {
      emailEditorRef?.current?.editor?.registerProvider('custom_provider', CustomProviderCallback);
    }
  };
  const toolsConfig = {
    toolbars: {
      left: ['custom_tool'],
      right: ['custom_tool'],
    },
    tools: {
      custom_tool: {
        position: 'left',
        id: 'custom_tool',
        icon: '<svg></svg>', // You can put an SVG icon here
        title: 'Custom Tool',
        options: {
          color: {
            label: 'Color',
            options: ['#ff0000', '#00ff00', '#0000ff']
          }
        }
      }
    },
  };

  useEffect(() => {
    if (saveClicked || updateClicked) {
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
  }, [saveClicked, updateClicked]);

  useEffect(() => {
    saveClicked && data.template
      ? (async () => {
          if (data.template) {
            const res = await saveTemplate(data);
            if (res.status === 201) {
              successNotification(res.message);
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else if (res.status === 409) {
              warningNotification(res.message);
            } else if (res.status === 422) {
              warningNotification(res.message);
            } else {
              warningNotification(res.message);
            }
            setSaveClicked(false);
          }
        })()
      : updateClicked &&
        data.template &&
        (async () => {
          console.log("Inside: ", data);

          const res = await updateTemplate(data);
          if (res.status === 201) {
            successNotification(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (res.status === 409) {
            warningNotification(res.message);
          } else if (res.status === 422) {
            warningNotification(res.message);
          } else {
            warningNotification(res.message);
          }
          setSaveClicked(false);
        })();
  }, [data, data.template, router, saveClicked, updateClicked]);

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
            className="w-1/3 px-4 py-1 xl:text-base text-xs rounded-md bg-transparent text-dark-black border dark:border-light-glass shadow-md dark:text-slate-300 focus:ring-0 focus:outline-none"
          />
          <Tooltip
            content="Copy from available shortcodes into template"
            className="bg-light-black"
          >
            <Dropdown
              label="Actions"
              placement="bottom-start"
              renderTrigger={() => (
                <div className="cursor-pointer flex items-center gap-4 bg-brand-color px-4 py-1 rounded-md ">
                  <h1 className="m-0 p-0 xl:text-base text-xs ">
                    Select dynamic headers
                  </h1>
                  <Image
                    src={Images.Copy}
                    alt="copy"
                    className="xl:w-8 w-5 m-0 p-0 rounded-md fill-dark-black"
                  />
                </div>
              )}
            >
              {fields.map((items: any, index: number) => {
                return (
                  <div key={index}>
                    <Dropdown.Item
                      className="dark:text-slate-300 text-light-black hover:text-gray-800 xl:text-base text-sm"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(`{${items.label.toLowerCase()}}`)
                          .toString();
                        successNotification(
                          `${
                            items.label
                          } copied to clipboard as {${items.label.toLowerCase()}}`
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
            className={BIG_BUTTON_STYLES}
            onClick={() => {
              selectedTemplate !== null
                ? setUpdateClicked(true)
                : setSaveClicked(true);
            }}
            disabled={data.name === "" || disableButton}
          >
            {selectedTemplate !== null ? "Update Template" : "Save Template"}
          </button>
          <button className={BIG_BUTTON_STYLES}>Export HTML</button>
        </div>
      </div>
      <div className="xl:h-[78dvh] h-[70dvh] flex items-center justify-center">
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          onLoad={onLoad}
          minHeight={"100%"}
          editorId="ok"
          options={{
            appearance: {
              theme: "modern_dark",
              panels: {
                tools: {
                  dock: "left",
                  tabs: {},
                },
              },
              
            },
          
          }}
        />
      </div>
    </div>
  );
};
const CustomProviderCallback = (editor: any, options: any) => {
  editor.registerTool({
    name: 'custom_provider',
    displayName: 'Custom Provider',
    icon: '<svg></svg>', // Add SVG icon for the provider
    create: CustomProviderComponent,
  });
};

const CustomProviderComponent: React.FC<{ options: any; save: any }> = ({ options, save }) => {
  const handleAddContent = () => {
    save({
      type: 'custom',
      content: '<div style="color: #ff0000;">Custom Provider Content</div>',
      properties: {
        color: '#ff0000',
      },
    });
  };

  return (
    <div>
      <button onClick={handleAddContent}>Add Custom Content</button>
    </div>
  );
};

export default MainEditor;
