import { CustomFlowbiteTheme } from "flowbite-react";
import { toast } from "react-toastify";

export const successNotification = (e: string) => toast.success(e);
export const warningNotification = (e: string) => toast.warn(e);
export const errorNotification = (e: string) => toast.error(e);
export const infoNotification = (e: string) => toast.info(e);

export const customTheme: CustomFlowbiteTheme = {
  modal: {
    root: {
      base: "fixed inset-x-0 top-0 z-50 h-screen w-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      show: {
        on: "flex bg-dark-glass bg-opacity-50 dark:bg-opacity-80 backdrop-blur-md",
        off: "hidden",
      },
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner:
        "relative flex h-full w-full flex-col rounded-lg bg-violet-50 shadow dark:bg-[#171717]",
    },

    header: {
      base: "flex items-start justify-between rounded-t xl:p-4 py-2 px-4",
    },
  },
  table: {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 dark:bg-transparent shadow-sm shadow-brand-color/50",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white dark:bg-transparent",
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
  datepicker: {
    root: {
      base: "relative w-full",
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2 w-full",
        inline: "relative top-0 z-auto",
        inner:
          "inline-block rounded-lg shadow-none dark:bg-transparent bg-transparent w-full",
      },
      header: {
        selectors: {
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-light-glass dark:bg-dark-glass dark:text-slate-300 dark:hover:bg-light-glass",
          },
        },
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-light-glass",
          today:
            "bg-brand-color text-white hover:bg-brand-color/80 dark:bg-brand-color dark:hover:bg-brand-color/80",
        },
      },
    },
    views: {
      days: {
        items: {
          base: "grid w-full grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-violet-50 dark:text-white dark:hover:bg-light-black ",
            selected: "bg-brand-color text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-full grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-violet-50 dark:text-white dark:hover:bg-light-black ",
            selected: "bg-brand-color text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-full grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-violet-50 dark:text-white dark:hover:bg-light-black ",
            selected: "bg-brand-color text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-full grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-violet-50 dark:text-white dark:hover:bg-light-black ",
            selected: "bg-brand-color text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
    },
  },
  popover: {
    base: "absolute z-20 inline-block w-max max-w-[100vw] bg-violet-50 outline-none border border-light-black rounded-lg shadow-sm dark:bg-dark-black",
    content: "z-10 overflow-hidden rounded-[7px] ",
    arrow: {
      base: "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-violet-50 border border-light-black dark:bg-dark-black dark:mix-blend-color",
      placement: "-4px",
    },
  },
};
