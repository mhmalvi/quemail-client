"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DarkThemeToggle, Dropdown } from "flowbite-react";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { sideBarStore } from "@/store/store";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";

const Topnav = () => {
  const closeSidebar = sideBarStore((state: any) => state.closeSidebar);

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
          className="cursor-pointer hover:text-brand-color"
          onClick={closeSidebar}
        >
          {part}
        </h1>
      </Link>
      {index !== capitalizedParts.length - 1 && <MdArrowRight />}
    </React.Fragment>
  ));
  return (
    <div className="w-full h-16 bg-gray-800/80 rounded-md flex items-center justify-between gap-8 p-4 z-60">
      <div className="text-slate-300 flex items-center gap-4">
        {displayString}
      </div>
      <div className="flex items-center gap-4">
        <div>
          <DarkThemeToggle className="focus:ring-0 focus:outline-none active:outline-none active:ring-0 ease-in duration-100 text-brand-color hover:bg-gray-800 dark:hover:bg-gray-800 dark:text-yellow-500" />
        </div>
        <div className="p-2">
          <BsQuestionDiamondFill size={20} />
        </div>
        <div className="p-2">
          <MdNotifications size={20} />
        </div>
        <Dropdown
          label="Dropdown button"
          placement="bottom-start"
          renderTrigger={() => (
            <div className="h-10 w-10 rounded-full bg-yellow-500 cursor-pointer"></div>
          )}
          className="bg-background-color border-none"
        >
          <Dropdown.Header>
            <span className="block text-sm text-slate-300">Bonnie Green</span>
            <span className="block truncate text-sm text-slate-300 font-medium">
              bonnie@flowbite.com
            </span>
          </Dropdown.Header>
          <Link href="/home/profile/my-profile">
            <Dropdown.Item className="text-slate-300 hover:text-slate-700">
              My Profile
            </Dropdown.Item>
          </Link>
          <Link href="/home/profile/users">
            <Dropdown.Item className="text-slate-300 hover:text-slate-700">
              Users
            </Dropdown.Item>
          </Link>
          <Dropdown.Item className="text-slate-300 hover:text-slate-700">
            Account & Billing
          </Dropdown.Item>
          <Dropdown.Item className="text-slate-300 hover:text-slate-700">
            Pricing Plans
          </Dropdown.Item>
          <Dropdown.Item className="text-slate-300 hover:text-slate-700">
            Support
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="text-slate-300 hover:text-slate-700">
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};
export default Topnav;
