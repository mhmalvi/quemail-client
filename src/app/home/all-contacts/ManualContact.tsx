"use client";
import { currentResourcesStatus } from "@/app/api/billing";
import { importContactManually } from "@/app/api/contact";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";

interface ManualContactProps {
  setOpenAddContactModal: (open: boolean) => void;
}

interface AddContactData {
  userID: string | null;
  name: string | null;
  email: string | null;
  group: string | null;
  company: string | null;
}

const ManualContact: React.FC<ManualContactProps> = ({
  setOpenAddContactModal,
}) => {
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  const [addContactData, setAddContactData] = useState<AddContactData>({
    userID: userID,
    name: null,
    email: null,
    group: null,
    company: null,
  });

  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEditContactDataChange = (
    field: keyof AddContactData,
    value: string
  ) => {
    setAddContactData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateName = (name: string) =>
    /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/.test(name.trim());
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateGroup = (group: string) =>
    /^[a-zA-Z0-9]+(\s?[a-zA-Z0-9]+)*$/.test(group.trim());
  const validateCompany = (company: string) =>
    /^[a-zA-Z0-9]+(\s?[a-zA-Z0-9]+)*$/.test(company.trim());

  const addContactsManually = async () => {
    const res = await currentResourcesStatus();
    if (res && res.message === "success") {
      if (res.remainingLimit.remainingContact === 0) {
        setErrorMessage("Contact limit exceeds!");
        setUpdateLoading(false);
        return;
      }
    }
    const { name, email, group, company } = addContactData;

    if (!name || !validateName(name)) {
      warningNotification("Invalid name. Only letters and spaces are allowed.");
      setUpdateLoading(false);
      return;
    }

    if (!email || !validateEmail(email)) {
      warningNotification("Invalid email format.");
      setUpdateLoading(false);
      return;
    }

    if (!group || !validateGroup(group)) {
      warningNotification(
        "Invalid group name. Only letters, numbers, and spaces are allowed."
      );
      setUpdateLoading(false);
      return;
    }

    if (company && !validateCompany(company)) {
      warningNotification(
        "Invalid company name. Only letters, numbers, and spaces are allowed."
      );
      setUpdateLoading(false);
      return;
    }

    setUpdateLoading(true);

    try {
      const res = await importContactManually(addContactData);
      if (res.status === 201) {
        successNotification(res.message);
        setOpenAddContactModal(false);

        window.location.href =
          window.location.pathname + "?reload=" + new Date().getTime();
      } else if (res.status === 422) {
        warningNotification(res.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Label htmlFor="name" value="Name" />
        <TextInput
          id="name"
          placeholder="John Doe"
          value={addContactData.name || ""}
          onChange={(event) =>
            handleEditContactDataChange("name", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="email" value="Email" />
        <TextInput
          id="email"
          placeholder="name@company.com"
          value={addContactData.email || ""}
          onChange={(event) =>
            handleEditContactDataChange("email", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="company" value="Company" />
        <TextInput
          id="company"
          placeholder="Company Name"
          value={addContactData.company || ""}
          onChange={(event) =>
            handleEditContactDataChange("company", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="group" value="Group" />
        <TextInput
          id="group"
          placeholder="Group Name"
          value={addContactData.group || ""}
          onChange={(event) =>
            handleEditContactDataChange("group", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 font-medium text-sm">{errorMessage}</p>
      )}
      <div className="flex items-center justify-end gap-4">
        <button
          className="px-2 py-1 bg-brand-color rounded-md disabled:opacity-20"
          onClick={() => {
            setUpdateLoading(true);
            addContactsManually();
          }}
          disabled={updateLoading}
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
