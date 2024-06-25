"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Images from "../utils/images";
import { Modal, Popover, Spinner } from "flowbite-react";
import {
  addMailInfo,
  destroyMail,
  fetchAddedMail,
  updateMailInfo,
} from "@/app/api/campaign";
import { successNotification, warningNotification } from "../utils/utility";

// Define the type for mailAdded
interface MailAdded {
  google?: {
    email: string;
    app_password: string;
    id: number;
  };
}

const HomeCard = () => {
  const [emailInfo, setEmailInfo] = useState({
    email: null,
    appPassword: null,
    provider: null,
    id: null,
    loading: false,
  });

  const handleAddMail = async (
    email: string | null,
    appPassword: string | null,
    provider: string | null
  ) => {
    if (emailInfo.provider === "Google") {
      try {
        const res = await addMailInfo(email, appPassword, provider);
        if (res.status === 201) {
          setEmailInfo((prev) => ({
            ...prev,
            loading: false,
          }));
          successNotification(res.message);
          window.location.reload();
        } else if (res.status === 422) {
          warningNotification(res.message);
        } else if (res.status === 500) {
          warningNotification(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleUpdateMail = async (
    email: string | null,
    appPassword: string | null,
    id: number | null
  ) => {
    if (emailInfo.provider === "Google") {
      try {
        const res = await updateMailInfo(email, appPassword, id);
        if (res.status === 201) {
          setEmailInfo((prev) => ({
            ...prev,
            loading: false,
          }));
          successNotification(res.message);
          window.location.reload();
        } else if (res.status === 422) {
          warningNotification(res.message);
        } else if (res.status === 500) {
          warningNotification(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [mailAdded, setMailAdded] = useState<MailAdded | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchAddedMail();
      if (res?.status === 200) {
        setMailAdded(res.emails);
      } else if (res?.status === 422) {
        warningNotification(res.message);
      } else if (res?.status === 404) {
        warningNotification(res.message);
      } else {
        warningNotification("Something went wrong");
      }
    })();
  }, []);

  const onRemove = async () => {
    try {
      const res = await destroyMail(emailInfo.id);

      if (res.status === 201) {
        successNotification(res.message);
        window.location.reload();
      } else {
        warningNotification("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [openDeletePopover, setOpenDeletePopover] = useState(false);
  return (
    <div className="h-full relative dark:bg-dark-glass shadow-md bg-[#ffffffbf] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Connect your email address
      </h1>
      <p className="xl:text-base text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        Use your email to send more targeted emails
      </p>
      <div className="bg-[url('/SVG/Home/homeCardBg.svg')] dark:bg-transparent bg-violet-50 w-full h-1/2 border dark:border-dark-black/30 shadow-xl shadow-inner rounded-md flex items-center justify-center gap-16">
        <div
          className="relative bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out"
          onClick={() => {
            setEmailInfo((prev: any) => ({
              ...prev,
              provider: "Google",
              email: mailAdded?.google?.email || null,
              appPassword: mailAdded?.google?.app_password || null,
              id: mailAdded?.google?.id || null,
            }));
          }}
        >
          <Image src={Images.Google} alt="Google" className="h-full" />
          {mailAdded?.google === null ? (
            ""
          ) : (
            <div className=" absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 flex items-center justify-center m-0 rounded-full">
              ✔
            </div>
          )}
        </div>
        <div className=" bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out">
          <Image src={Images.Yahoo} alt="Yahoo" className="h-full" />
        </div>
        <div className=" bg-white xl:h-20 h-16 xl:p-4 p-2 border dark:border-dark-black/60 hover:dark:border-brand-color hover:border-brand-color xl:w-20 w-16 rounded-md shadow-md cursor-pointer hover:scale-95 duration-100 ease-in-out">
          <Image src={Images.Outlook} alt="Outlook" className="h-full" />
        </div>
      </div>
      <p className="xl:text-sm text-xs m-0 p-0 dark:text-slate-300 text-light-black ">
        Please connect your email account to enable the sending of emails
        through the specified system.
      </p>
      <Modal
        show={emailInfo.provider === "Google"}
        dismissible
        onClose={() => {
          setEmailInfo(() => ({
            email: null,
            appPassword: null,
            provider: null,
            id: null,
            loading: false,
          }));
        }}
      >
        <Modal.Header className=" dark:text-slate-300 text-dark-black">
          <div className="flex items-center gap-4">
            <h1>Connect store</h1>
            <Popover
              aria-labelledby="default-popover"
              open={openDeletePopover}
              onOpenChange={() => {
                setOpenDeletePopover(true);
              }}
              content={
                <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                  <div className="border-b border-gray-200 px-3 py-2">
                    <h3
                      id="default-popover"
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      Are you sure you want to delete?
                    </h3>
                  </div>
                  <div className="px-4 py-2 flex items-center justify-between">
                    <button
                      onClick={onRemove}
                      className="px-4 py-2 bg-red-500 rounded-md text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setOpenDeletePopover(false);
                      }}
                      className="px-4 py-2 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              }
            >
              <button
                className="px-2 py-1 border border-red-500 rounded-md text-sm disabled:opacity-30"
                disabled={mailAdded?.google === null}
              >
                Remove
              </button>
            </Popover>
          </div>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <div className="flex flex-col justify-center">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Add email
            </label>
            <input
              onChange={(e) => {
                setEmailInfo((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              value={emailInfo.email ?? ""}
              className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent dark:text-slate-300 text-dark-black rounded-md border dark:border-light-black focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="xl:text-base text-sm dark:text-slate-300 text-dark-black">
              Add App Password
            </label>
            <input
              onChange={(e) => {
                setEmailInfo((prev: any) => ({
                  ...prev,
                  appPassword: e.target.value,
                }));
              }}
              value={emailInfo.appPassword ?? ""}
              className="xl:px-4 px-2 xl:py-2 py-1 bg-transparent dark:text-slate-300 text-dark-black rounded-md border dark:border-light-black focus:ring-0 focus:outline-none active:outline-none active:ring-0"
            />
          </div>
          <div className="flex items-center gap-4 justify-end">
            <button
              className="xl:px-4 px-2 xl:py-2 py-1 bg-brand-color text-slate-50 rounded-md disabled:opacity-20"
              onClick={() => {
                mailAdded?.google !== null
                  ? handleUpdateMail(
                      emailInfo.email,
                      emailInfo.appPassword,
                      emailInfo?.id
                    )
                  : handleAddMail(
                      emailInfo.email,
                      emailInfo.appPassword,
                      emailInfo.provider
                    );
                setEmailInfo((prev) => ({
                  ...prev,
                  loading: true,
                }));
              }}
              disabled={
                emailInfo.email === null || emailInfo.appPassword === null
              }
            >
              {emailInfo.loading ? (
                <Spinner
                  color="purple"
                  aria-label="Purple spinner example"
                  size="xl"
                />
              ) : mailAdded?.google !== null ? (
                "Update"
              ) : (
                "Save"
              )}
            </button>

            <button
              className="xl:px-4 px-2 xl:py-2 py-1 bg-red-500 text-slate-50 rounded-md"
              onClick={() => {
                setEmailInfo(() => ({
                  email: null,
                  appPassword: null,
                  provider: null,
                  id: null,
                  loading: false,
                }));
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default HomeCard;
