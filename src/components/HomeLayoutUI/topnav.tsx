"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { DarkThemeToggle, Dropdown, Modal } from "flowbite-react";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { sideBarStore, themeStore } from "@/store/store";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { Storage } from "../utils/localStore";
import Image from "next/image";
import { signOut } from "@/app/api/auth";

const Topnav = () => {
  const closeSidebar = sideBarStore((state: any) => state.setCloseSidebar);
  const setTheme = themeStore((state: any) => state.setTheme);
  const [openThemeModal, setOpenThemeModal] = useState(false);

  const pathname = usePathname();
  const path: string = pathname;
  const parts: string[] = path.split("/");
  const capitalizedParts: string[] = parts.slice(1).map((part) => {
    const words: string[] = part.split("-");
    const capitalizedWords: string[] = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  });

  const displayString: JSX.Element[] = capitalizedParts.map((part, index) => (
    <React.Fragment key={index}>
      <Link
        href={
          capitalizedParts.length - 1 === index
            ? ""
            : capitalizedParts.length - 2 === index
            ? "./"
            : "../"
        }
      >
        <h1
          className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-800 dark:from-slate-300 dark:to-slate-400 hover:from-brand-color hover:to-brand-color-2 hover:dark:from-brand-color hover:dark:to-brand-color-2 duration-300 ease-in"
          onClick={closeSidebar}
        >
          {part}
        </h1>
      </Link>
      {index !== capitalizedParts.length - 1 && (
        <MdArrowRight className="dark:text-slate-300 text-brand-color" />
      )}
    </React.Fragment>
  ));

  const handleSignOut = async () => {
    const response = await signOut();
    if (response) {
      Storage.removeItem("token");
      Storage.removeItem("userName");
      Storage.removeItem("photo");
      Storage.removeItem("email");
      window.location.reload();
    }
  };

  return (
    <>
      <div className="relative w-full h-16 dark:bg-dark-glass bg-[#ffffffbf] dark:border-none border rounded-md flex items-center justify-between gap-8 p-4 z-40">
        <div className="flex items-center gap-4">{displayString}</div>
        <div className="flex items-center gap-4">
          <div>
            <DarkThemeToggle className="focus:ring-0 focus:outline-none active:outline-none active:ring-0 ease-in duration-100 text-brand-color hover:bg-transparent dark:hover:bg-transparent dark:text-yellow-500" />
          </div>
          <div className="p-2">
            <BsQuestionDiamondFill
              size={20}
              className="dark:text-slate-300 text-dark-black"
            />
          </div>
          <div className="p-2">
            <MdNotifications
              size={20}
              className="dark:text-slate-300 text-dark-black"
            />
          </div>
          <Dropdown
            label="Dropdown button"
            placement="bottom-start"
            renderTrigger={() => (
              <div className="h-10 w-10 rounded-full bg-brand-color cursor-pointer overflow-hidden">
                <Image
                  src={Storage.getItem("photo")}
                  alt="user"
                  width={100}
                  height={100}
                />
              </div>
            )}
            className="dark:bg-dark-glass bg-light-glass backdrop-blur-2xl border-none z-40"
          >
            <Dropdown.Header>
              <span className="block text-sm dark:text-slate-300 text-light-black">
                {Storage.getItem("userName")}
              </span>
              <span className="block truncate text-sm dark:text-slate-300 text-light-black font-medium">
                {Storage.getItem("email")}
              </span>
            </Dropdown.Header>
            <Link href="/home/profile/my-profile">
              <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
                My Profile
              </Dropdown.Item>
            </Link>
            <Link href="/home/profile/users">
              <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
                Users
              </Dropdown.Item>
            </Link>
            <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
              Account & Billing
            </Dropdown.Item>
            <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
              Pricing Plans
            </Dropdown.Item>
            <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
              Support
            </Dropdown.Item>
            {/* <Dropdown.Item
              className="dark:text-slate-300 text-light-black hover:text-slate-700"
              onClick={() => setOpenThemeModal(true)}
            >
              Themes
            </Dropdown.Item> */}
            <Dropdown.Divider className="bg-light-black" />
            <Dropdown.Item
              className="dark:text-slate-300 text-light-black hover:text-slate-700"
              onClick={() => {
                handleSignOut();
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <Modal
        dismissible
        show={openThemeModal}
        onClose={() => setOpenThemeModal(false)}
      >
        <Modal.Header>Import Contacts</Modal.Header>
        <Modal.Body>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div
              className="w-20 h-20 bg-yellow-500 rounded-md"
              onClick={() => setTheme("Dark1")}
            ></div>
            <div
              className="w-20 h-20 bg-yellow-500 rounded-md"
              onClick={() => setTheme("Light1")}
            ></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Topnav;
