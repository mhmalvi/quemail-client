"use client";
import { importContactManually } from "@/app/api/contact";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";

const ManualContact = ({ setOpenAddContactModal }: any) => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  const [addContactData, setAddContactData] = useState<{
    userID: string | false | null;
    name: string | null;
    email: string | null;
    group: string | null;
  }>({
    userID: userID,
    name: null,
    email: null,
    group: null,
  });
  const handleEditContactDataChange = (field: string, value: string) => {
    setAddContactData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(addContactData);
  };
  const [updateLoading, setUpdateLoading] = useState(false);

  const addContactsManually = async () => {
    const res = await importContactManually(addContactData);
    try {
      if (res.status === 201) {
        setUpdateLoading(false);
        successNotification(res.message);
        setOpenAddContactModal(false);
        window.location.reload();
      } else if (res.status === 422) {
        setUpdateLoading(false);
        warningNotification(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Label htmlFor="name" value="Edit name" />
        <TextInput
          id="name"
          placeholder="John Doe"
          value={addContactData.name || ""}
          onChange={(event) => {
            handleEditContactDataChange("name", event.target.value);
            console.log(event);
          }}
          className="bg-tranparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="email" value="Edit email" />
        <TextInput
          id="email"
          placeholder="name@company.com"
          value={addContactData.email || ""}
          onChange={(event) =>
            handleEditContactDataChange("email", event.target.value)
          }
          className="bg-tranparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="group" value="Edit group" />
        <TextInput
          id="group"
          placeholder="Group Name"
          value={addContactData.group || ""}
          onChange={(event) =>
            handleEditContactDataChange("group", event.target.value)
          }
          className="bg-tranparent"
          required
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <button
          className="px-2 py-1 bg-brand-color rounded-md disabled:opacity-20"
          onClick={() => {
            setUpdateLoading(true);
            addContactsManually();
          }}
        >
          {updateLoading ? (
            <Spinner
              color="purple"
              aria-label="Purple spinner example"
              size="xl"
            />
          ) : (
            "Add Contact"
          )}
        </button>
        <button
          className="px-2 py-1 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
          onClick={() => {
            setOpenAddContactModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ManualContact;
