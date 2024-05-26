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
        "relative flex h-full flex-col rounded-lg bg-violet-50 shadow dark:bg-[#171717]",
    },

    header: {
      base: "flex items-start justify-between rounded-t xl:p-4 py-2 px-4",
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
      base: "group/head text-xs uppercase bg-transparent text-brand-color ",
      cell: {
        base: "px-6 py-3 dark:bg-[#171717] bg-white border-b dark:border-light-black group-first/head:first:rounded-tl-md group-first/head:first:w-8 group-first/head:last:rounded-tr-md w-1/6",
      },
    },
    row: {
      base: "group/row ",
      hovered: "hover:bg-gray-50 dark:hover:bg-dark-black",
      striped:
        "odd:bg-white even:bg-gray-50 odd:dark:bg-transparent even:dark:bg-transparent ",
    },
  },
  pagination: {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-brand-color dark:bg-dark-black dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-brand-color dark:bg-dark-black dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-brand-color dark:bg-dark-black dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-slate-300 hover:bg-cyan-100 hover:text-cyan-700 dark:border-brand-color dark:bg-brand-color bg-dark-black dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  },
  dropdown: {
    floating: {
      item: {
        container: " ",
        base: " flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-slate-300 dark:hover:bg-brand-color dark:focus:bg-brand-color dark:focus:text-white",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        auto: "bg-white text-gray-900 dark:border-none dark:bg-dark-black dark:text-slate-300 backdrop-blur-2xl",
      },
    },
  },
};
