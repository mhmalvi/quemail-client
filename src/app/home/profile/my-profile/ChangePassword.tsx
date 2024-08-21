"use client";
import { changePassword } from "@/app/api/admin";
import { successNotification } from "@/components/utils/utility";
import { Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";

const ChangePassword = () => {
  const [changeClicked, setChangeClicked] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleChangePassword = async (password: string) => {
    const response = await changePassword(password);
    if (response.status === 201) {
      successNotification("Password updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    setUpdateLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdateLoading(true);
    if (newPassword === retypeNewPassword) {
      handleChangePassword(newPassword);
    }
  };

  return (
    <div className="w-full h-full dark:border-white rounded-md flex flex-col items-center justify-center overflow-hidden">
      {changeClicked ? (
        <Modal
          show={changeClicked}
          onClose={() => {
            setChangeClicked(false);
          }}
        >
          <Modal.Header>Change Password</Modal.Header>
          <Modal.Body className="dark:bg-dark-black bg-violet-50">
            <form
              className="flex flex-col w-full p-4 xl:gap-4 gap-2"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
                  New Password
                </label>
                <input
                  type="password"
                  className="dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
                  Retype New Password
                </label>
                <input
                  type="password"
                  className="dark:text-slate-300 text-dark-black xl:px-4 px-2 xl:py-2 py-1 bg-transparent rounded-md border border-brand-color focus:ring-0 focus:outline-none active:outline-none active:ring-0"
                  value={retypeNewPassword}
                  onChange={(e) => setRetypeNewPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                {updateLoading ? (
                  <Spinner
                    color="purple"
                    aria-label="Purple spinner example"
                    size="xl"
                  />
                ) : (
                  <button
                    type="submit"
                    disabled={newPassword !== retypeNewPassword}
                    className={`xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm rounded-md text-slate-300 ${
                      newPassword === retypeNewPassword
                        ? "bg-brand-color"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setChangeClicked(false);
                  }}
                  className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-red-500 rounded-md text-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : (
        <button
          onClick={() => {
            setChangeClicked(true);
          }}
          className="xl:px-4 xl:py-2 px-2 py-1 xl:text-base text-sm bg-brand-color rounded-md"
        >
          Change Password
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
