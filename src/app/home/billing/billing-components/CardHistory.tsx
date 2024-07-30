import { stripeInvoiceHistory } from "@/app/api/billing";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbCaretLeftRight } from "react-icons/tb";
import { Dropdown } from "flowbite-react";

const CardHistory = () => {
  const [status, setStatus] = useState<string>("Clear");
  const [limit, setLimit] = useState<string>("5");

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await stripeInvoiceHistory(status, limit);
      if (res.message === "success") {
        console.log(res);
      }
    };
    fetchInvoices();
  }, []);

  const handleStatus = (status: string) => {};

  const handleLimit = (limit: string) => {};

  return (
    <div className="step-4 border dark:border-none border-violet-200 xl:w-1/4 w-1/3 dark:bg-light-glass bg-white shadow-md backdrop-blur-xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-row justify-between items-center">
        <h1
          className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center flex-grow"
          onClick={() => {
            // handleButtonClick();
          }}
        >
          History
        </h1>
        <button className=" border rounded-full border-brand-color dark:border-white">
          <TbCaretLeftRight className="text-brand-color dark:text-white" />
        </button>
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <Dropdown
          label="Groups ▼"
          placement="bottom-start"
          renderTrigger={() => (
            <div className="px-4 py-1 rounded-md border border-brand-color cursor-pointer overflow-hidden">
              <h1 className="flex items-center justify-center gap-4 duration-100 ease-in text-dark-black dark:text-slate-300 xl:text-base text-sm ">
                Status <span className="text-xs">▼</span>
              </h1>
            </div>
          )}
          className="dark:bg-dark-black bg-light-glass backdrop-blur-2xl border-none z-40"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            Open
          </Dropdown.Item>
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            Paid
          </Dropdown.Item>
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            Clear
          </Dropdown.Item>
        </Dropdown>
        <Dropdown
          label="Groups ▼"
          placement="bottom-start"
          renderTrigger={() => (
            <div className="px-4 py-1 rounded-md border border-brand-color cursor-pointer overflow-hidden">
              <h1 className="flex items-center justify-center gap-4 duration-100 ease-in text-dark-black dark:text-slate-300 xl:text-base text-sm ">
                Limit <span className="text-xs">▼</span>
              </h1>
            </div>
          )}
          className="dark:bg-dark-black bg-light-glass backdrop-blur-2xl border-none z-40"
        >
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            5
          </Dropdown.Item>
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            10
          </Dropdown.Item>
          <Dropdown.Item className="dark:text-slate-300 text-light-black hover:text-slate-700">
            100
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="w-full h-full">
        <Table hoverable striped>
          <Table.Head className="w-full">
            <Table.HeadCell className="w-1/2 sticky text-center">
              Date
            </Table.HeadCell>
            <Table.HeadCell className="w-1/2 sticky text-center">
              Amount
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y"></Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default CardHistory;
