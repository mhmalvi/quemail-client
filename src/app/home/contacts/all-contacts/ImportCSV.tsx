"use client";
import { importContact } from "@/app/api/contact";
import { fields } from "@/components/utils/staticData";
import { ImportCSVProps } from "@/components/utils/types";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { contactStore } from "@/store/store";
import React from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import "@/app/globals.css";

const ImportCSV: React.FC<ImportCSVProps> = ({ openModal, setOpenModal }) => {
  const setCsvData = contactStore((state) => state.setCsvData);
  const setHasData = contactStore((state) => state.setHasData);
  const handleSave = async (e: {}) => {
    const res = await importContact(e);
    if (res?.status === 201) {
      successNotification(res?.message);
      window.location.reload();
    } else {
      warningNotification("Something went wrong. Try again.");
    }
  };
  function removeDuplicateEmails(data: any[]) {
    const emailSet = new Set();
    return data.filter((item) => {
      if (!emailSet.has(item.email)) {
        emailSet.add(item.email);
        return true;
      }
      return false;
    });
  }

  return (
    <ReactSpreadsheetImport
      isOpen={openModal.show === "importContacts"}
      onClose={() => {
        setOpenModal({ show: "" });
        setHasData(false);
      }}
      onSubmit={(e) => {
        const uniqueData = removeDuplicateEmails(e.validData);
        setCsvData(uniqueData);
        handleSave(uniqueData);
      }}
      fields={fields}
      customTheme={{
        components: {
          UploadStep: {
            baseStyle: {
              heading: {
                color: "#ffffff",
              },
              tableWrapper: {
                border: "0px solid #00000000",
                bg: "#00000000",
                "& > :first-of-type": {
                  border: "1px solid #374151",
                },
              },
              dropzoneButton: {
                bg: "#0d0d0d",
              },
            },
          },
          Modal: {
            baseStyle: {
              dialog: {
                width: "75%",
                border: "2px solid #374151",
                // height: "40%",
                bg: "#0d0d0d",
              },
              closeModalButton: {
                backgroundColor: "#e53e3e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
               
                borderRadius:"0 24px 0 0",
                
                "@media (max-width: 1366px)": {
                  right: "14%",
                  top:"8.2%",
                  width: "1%",
                },
                "@media (max-width: 1600px)": {
                  right: "13.8%",
                  top:"6.9%",
                  width: "1%",
                },
                "@media (max-width: 1920px)": {
                  right: "13.5%",
                  top:"5.5%",
                  width: "1%",
                },
              },
            },
            variants: {
              rsi: {
                header: {
                  borderBottom: "1px solid #374151",
                  bg: "#0d0d0d",
                },
                body: {
                  bg: "#ffffff11",
                  backdropFilter: "blur(20px)",
                },
              },
            },
          },
          MatchColumnsStep: {
            baseStyle: {
              userTable: {
                ignoreButton: { bg: "#6d53ff" },
              },
              selectColumn: {
                accordionLabel: {
                  color: "#0d0d0d",
                },
                selectLabel: {
                  color: "#0d0d0d",
                },
              },
            },
          },
        },
        colors: {
          background: "#0d0d0d45",
          subtitleColor: "#ffffff",
          textColor: "#ffffff",
          secondaryBackground: "#ffffff11",
          rsi: {
            50: "#6d53ff",
            100: "#6d53ff",
            500: "#374151",
            600: "#374151",
          },
        },
      }}
    />
  );
};
export default ImportCSV;
