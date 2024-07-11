"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DarkThemeToggle, Dropdown, Modal, Tooltip } from "flowbite-react";
import { MdArrowRight } from "react-icons/md";
import Link from "next/link";
import { sideBarStore, themeStore, useTourStore } from "@/store/store";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { Storage } from "@/store/store";
import Image from "next/image";
import { signOut } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import Images from "../../../components/utils/images";
import MyProfile from "../profile/my-profile/page";

const Topnav = () => {
  const closeSidebar = sideBarStore((state: any) => state.setCloseSidebar);
  const setTheme = themeStore((state: any) => state.setTheme);
  const [openThemeModal, setOpenThemeModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTourGoing = useTourStore((state) => state.isTourGoing);
  const setIsTourGoing = useTourStore((state) => state.setIsTourGoing);

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
  const [logoutConfirm, setLogoutConfirm] = useState<boolean>(false);

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
          className="cursor-pointer dark:text-slate-300 text-gray-800 hover:text-brand-color dark:hover:text-brand-color font-normal duration-100 ease-in"
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
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await signOut();
    if (response) {
      setLogoutConfirm(true);
    }
  };
  const photo = Storage.getItem("photo");

  useEffect(() => {
    if (logoutConfirm) {
      Storage.removeItem("token");
      Storage.removeItem("userName");
      Storage.removeItem("photo");
      Storage.removeItem("email");
      Storage.removeItem("userID");
      router.push("/");
    }
  }, [logoutConfirm, router]);

  return (
    <>
      <div className="border dark:border-none border-violet-200 relative w-full 2xl:!h-16 !h-12 shadow-md  dark:bg-light-glass bg-[#ffffffbf] rounded-md flex items-center justify-between gap-8 p-4 z-40">
        <div className="flex items-center gap-4">{displayString}</div>
        <div className="flex items-center gap-4">
          <div>
            <DarkThemeToggle className="focus:ring-0 focus:outline-none active:outline-none active:ring-0 ease-in duration-100 text-brand-color hover:bg-transparent dark:hover:bg-transparent dark:text-yellow-500" />
          </div>
          <Tooltip
            content="Start quemailer tour!"
            className="bg-brand-color xl:text-sm text-xs"
          >
            <div className="p-2">
              <BsQuestionDiamondFill
                size={20}
                className="step-10 dark:text-slate-300 text-dark-black transition-fill duration-200 ease-in-out hover:fill-brand-color cursor-pointer"
                onClick={() => {
                  setIsTourGoing(!isTourGoing);
                }}
              />
            </div>
          </Tooltip>
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
              <div className="step-9 h-10 w-10 rounded-full bg-brand-color cursor-pointer overflow-hidden">
                <Image
                  src={
                    photo !== "" && photo !== null ? photo : Images.User_Icon
                  }
                  alt="user"
                  width={100}
                  height={100}
                />
              </div>
            )}
            className="dark:bg-dark-black border border-violet-200 dark:border-light-glass bg-violet-50"
          >
            <Dropdown.Header>
              <span className="block text-sm dark:text-slate-300 text-light-black">
                {Storage.getItem("userName")}
              </span>
              <span className="block truncate text-sm dark:text-slate-300 text-light-black font-medium">
                {Storage.getItem("email")}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="dark:text-slate-300 text-light-black hover:text-slate-700"
            >
              My Profile
            </Dropdown.Item>
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
      <Modal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Modal.Header>Account Details</Modal.Header>
        <Modal.Body>
          <MyProfile />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Topnav;
