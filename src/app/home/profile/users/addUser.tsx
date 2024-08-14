"use client";
import { addUser } from "@/app/api/admin";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";

interface AddUserProps {
  setOpenAddUserModal: (open: boolean) => void;
}

interface AddUserData {
  userID: string | null;
  name: string | null;
  email: string | null;
}

const AddUser: React.FC<AddUserProps> = ({ setOpenAddUserModal }) => {
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  const [addUserData, setAddUserData] = useState<AddUserData>({
    userID: userID,
    name: null,
    email: null,
  });

  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditUserDataChange = (
    field: keyof AddUserData,
    value: string
  ) => {
    setAddUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateName = (name: string) =>
    /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/.test(name.trim());
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const addUsersManually = async () => {
    const { name, email } = addUserData;

    if (!name || !validateName(name)) {
      setError("Invalid name. Only letters and spaces are allowed.");
      setUpdateLoading(false);
      return;
    }

    if (!email || !validateEmail(email)) {
      setError("Invalid email format.");
      setUpdateLoading(false);
      return;
    }

    setUpdateLoading(true);

    try {
      const res = await addUser(addUserData.name, addUserData.email);
      if (res.message === "success") {
        successNotification(res.message);
        setOpenAddUserModal(false);

        window.location.href =
          window.location.pathname + "?reload=" + new Date().getTime();
      } else {
        setError(res.message);
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
        <Label htmlFor="name" value="Enter Name" />
        <TextInput
          id="name"
          placeholder="John Doe"
          value={addUserData.name || ""}
          onChange={(event) =>
            handleEditUserDataChange("name", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      <div>
        <Label htmlFor="email" value="Enter Email" />
        <TextInput
          id="email"
          placeholder="name@company.com"
          value={addUserData.email || ""}
          onChange={(event) =>
            handleEditUserDataChange("email", event.target.value)
          }
          className="bg-transparent"
          required
        />
      </div>
      <div className="flex items-center justify-center gap-4 text-red-500">
        {error}
      </div>
      <div className="flex items-center justify-end gap-4">
        <button
          className="px-2 py-1 bg-brand-color rounded-md disabled:opacity-20"
          onClick={() => {
            setUpdateLoading(true);
            addUsersManually();
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
            "Add User"
          )}
        </button>
        <button
          className="px-2 py-1 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
          onClick={() => {
            setOpenAddUserModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUser;
