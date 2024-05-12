"use client";
import { importContact } from "@/app/api/contact";
import { fields } from "@/components/utils/staticData";
import { ImportCSVProps } from "@/components/utils/types";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { contactStore } from "@/store/store";
import React, { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

const ImportCSV: React.FC<ImportCSVProps> = ({ openModal, setOpenModal }) => {
  const setCsvData = contactStore((state: any) => state.setCsvData);
  const csvData = contactStore((state: any) => state.csvData);
  const setHasData = contactStore((state: any) => state.setHasData);
  const hasData = contactStore((state: any) => state.hasData);
  const handleSave = async (e: {}) => {
    const res = await importContact(e);
    if (res?.status === 201 && csvData !== null) {
      successNotification(res?.message);
      window.location.reload();
    } else {
      warningNotification("Something went wrong. Try again.");
    }
  };
  return (
    <ReactSpreadsheetImport
      isOpen={openModal.show === "showButtons"}
      onClose={() => {
        setOpenModal({ show: "" });
        setHasData(false);
      }}
      onSubmit={(e) => {
        console.log(e);
        setCsvData(e.validData);
        handleSave(e.validData);
      }}
      fields={fields}
      customTheme={{
        components: {
          UploadStep: {
            baseStyle: {
              heading: {
                color: "#6D53FF",
              },
            },
          },
          Modal: {
            variants: {
              rsi: {
                header: {
                  borderBottom: "1px solid #6D53FF",
                  // bg:"#0d0d0d"
                },
                body: {
                  bg: "#0d0d0d45",
                  backdropFilter: "blur(10px)",
                },
              },
            },
          },
        },
        colors: {
          background: "#0d0d0d",
          subtitleColor: "#6D53FF",
          textColor: "#ffffff",
          secondaryBackground: "#0d0d0d",
          rsi: {
            50: "#6D53FF",
            100: "#6D53FF",
          },
        },
      }}
    />
  );
};
export default ImportCSV;
