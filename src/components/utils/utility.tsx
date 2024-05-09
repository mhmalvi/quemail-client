import { CustomFlowbiteTheme } from "flowbite-react";
import { toast } from "react-toastify";

export const successNotification = (e: string) => toast.success(e);
export const warningNotification = (e: string) => toast.warn(e);
export const errorNotification = (e: string) => toast.error(e);
export const infoNotification = (e: string) => toast.info(e);

export const customTheme: CustomFlowbiteTheme = {
  modal: {
    root: {
      base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      show: {
        on: "flex bg-dark-glass bg-opacity-50 dark:bg-opacity-80 backdrop-blur-md",
        off: "hidden",
      },
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-dark-glass backdrop-blur-2xl",
    },

    header: {
      base: "flex items-start justify-between rounded-t p-4",
    },
  },
  table: {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 dark:bg-transparent",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-transparent",
    },
    body: {
      base: "group/body",
      cell: {
        base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
      },
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400 dark:bg-transparent",
      cell: {
        base: "px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-transparent border-b dark:border-light-black",
      },
    },
    row: {
      base: "group/row",
      hovered: "hover:bg-gray-50 dark:hover:bg-brand-color/20",
      striped:
        "odd:bg-white even:bg-gray-50 odd:dark:bg-transparent even:dark:bg-transparent ",
    },
  },
};
