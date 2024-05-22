"use client";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { sideBarStore } from "@/store/store";
import { IoIosArrowForward } from "react-icons/io";
import { Dropdown, DropdownDivider } from "flowbite-react";

import Link from "next/link";

const Sidebar = () => {
  const sidebarToggle = sideBarStore((state: any) => state.sidebarToggle);
  const setOpenSidebar = sideBarStore((state: any) => state.setOpenSidebar);
  return (
    <div
      className={`h-full xl:px-4 px-2  flex flex-col xl:gap-8 gap-4 dark:border-none border-r dark:bg-dark-glass bg-light-glass ease-in duration-100 overflow-hidden  ${
        sidebarToggle ? "xl:w-1/6 w-1/4 " : "xl:w-20 w-16"
      } `}
    >
      <div
        onClick={setOpenSidebar}
        className={`w-full flex justify-center items-center mt-4 rounded-md cursor-pointer bg-dark-black duration-100 ease-in`}
      >
        {sidebarToggle && (
          <h1 className="m-0 p-0 text-3xl text-slate-300 ">Que</h1>
        )}
        <Image
          src={Images.MainLogo}
          alt="logo"
          className={`2xl:h-16 h-12 w-8 rounded-md ease-in duration-100`}
        />
        {sidebarToggle && (
          <h1 className="m-0 p-0 text-3xl text-slate-300 ">ailer</h1>
        )}
      </div>
      <Dropdown
        label="Dropdown button"
        placement="right-start"
        renderTrigger={() => (
          <div className="relative w-full flex items-center gap-8 m-0 p-0 overflow-hidden cursor-pointer text-black dark:text-slate-300 hover:text-brand-color dark:hover:text-brand-color ease-in duration-100">
            <div
              className={`bg-dark-black xl:p-3 px-3 py-2 rounded-md overflow-hidden z-20`}
            >
              <Image
                src={Images.CampaignSidebar}
                alt="Contact_Tab"
                className="w-full"
              />
            </div>
            <div
              className={`absolute flex items-center w-2/3 justify-between gap-8 ${
                sidebarToggle ? "right-0" : "hidden"
              }`}
            >
              <h1 className={`m-0 p-0 z-10 overflow-hidden `}>Campaigns</h1>
              <IoIosArrowForward />
            </div>
          </div>
        )}
      >
        <Link
          href="/home/campaigns/new-campaign"
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            New Campaign
          </Dropdown.Item>
        </Link>
        <Link
          href="/home/campaigns/all-campaigns"
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            All Campaigns
          </Dropdown.Item>
        </Link>
        <DropdownDivider className="bg-light-black" />
        <Link
          href="/home/campaigns/template-generator"
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            Template Generator
          </Dropdown.Item>
        </Link>
        <Link
          href="/home/campaigns/templates"
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            All Templates
          </Dropdown.Item>
        </Link>
        <DropdownDivider className="bg-light-black" />
        <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
          Campaign Performance
        </Dropdown.Item>
      </Dropdown>
      <Dropdown
        className="dark:bg-[#282828] bg-white backdrop-blur-2xl border-none w-1/8 ml-2 "
        label="Dropdown button"
        placement="right-start"
        renderTrigger={() => (
          <div className="relative w-full flex items-center gap-8 m-0 p-0 overflow-hidden cursor-pointer text-black dark:text-slate-300 hover:text-brand-color dark:hover:text-brand-color ease-in duration-100">
            <div
              className={`bg-dark-black xl:p-3 px-3 py-2 rounded-md overflow-hidden z-20`}
            >
              <Image
                src={Images.ContactSidebar}
                alt="Contact_Tab"
                className="w-full"
              />
            </div>
            <div
              className={`absolute flex items-center w-2/3 justify-between gap-8 ${
                sidebarToggle ? "right-0" : "hidden"
              }`}
            >
              <h1 className={`m-0 p-0 z-10 overflow-hidden `}>Contacts</h1>
              <IoIosArrowForward />
            </div>
          </div>
        )}
      >
        <Link
          href="/home/contacts/all-contacts"
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            All Contacts
          </Dropdown.Item>
        </Link>

        <Link href="/home/contacts/email-subscriptions">
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
            Email Subscriptions
          </Dropdown.Item>
        </Link>
      </Dropdown>
      <Dropdown
        className="dark:bg-[#282828] bg-white backdrop-blur-2xl border-none w-1/8 ml-2"
        label="Dropdown button"
        placement="right-start"
        renderTrigger={() => (
          <div className="relative w-full flex items-center gap-8 m-0 p-0 overflow-hidden cursor-pointer text-black dark:text-slate-300 hover:text-brand-color dark:hover:text-brand-color ease-in duration-100">
            <div
              className={`bg-dark-black xl:p-3 px-3 py-2 rounded-md overflow-hidden z-20`}
            >
              <Image
                src={Images.SettingSidebar}
                alt="Contact_Tab"
                className="w-full"
              />
            </div>
            <div
              className={`absolute flex items-center w-2/3 justify-between gap-8 ${
                sidebarToggle ? "right-0" : "hidden"
              }`}
            >
              <h1 className={`m-0 p-0 z-10 overflow-hidden `}>Settings</h1>
              <IoIosArrowForward />
            </div>
          </div>
        )}
      >
        <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
          Account
        </Dropdown.Item>
        <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
          Advanced
        </Dropdown.Item>
        <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
          Security
        </Dropdown.Item>
        <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-gray-800">
          Privacy Policy
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};
export default Sidebar;
