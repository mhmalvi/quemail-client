import { stripeInvoiceHistory } from "@/app/api/billing";
import { Spinner, Table, Tooltip, Dropdown } from "flowbite-react";
import { Key, useEffect, useState } from "react";
import { TbCaretLeftRight, TbDownload } from "react-icons/tb";

const CardHistory = () => {
  const [status, setStatus] = useState<string>("paid");
  const [invoicesLoading, setInvoicesLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(5);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await stripeInvoiceHistory(status, limit);
      if (res && res.message === "success") {
        setInvoices(res.invoice.data);
        setInvoicesLoading(false);
      }
    };
    fetchInvoices();
  }, [limit, status]);

  const handleExpanded = () => {
    setIsTransitioning(true);
    setExpanded(!expanded);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleStatus = (status: string) => {
    setStatus(status);
  };

  const handleLimit = (limit: number) => {
    setLimit(limit);
  };

  return (
    <div
      className={`step-4 border dark:border-none border-violet-200 ${
        expanded ? "xl:w-full w-full" : "xl:w-1/4 w-1/3"
      } dark:bg-light-glass bg-white shadow-md backdrop-blur-xl rounded-md p-4 flex flex-col gap-4 ease-in duration-200`}
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center flex-grow">
          History
        </h1>

        {!isTransitioning && (
          <Tooltip
            content={expanded ? "Collapse" : "Expand"}
            className="bg-brand-color text-center"
            placement="bottom"
          >
            <button
              className="border rounded-full border-brand-color dark:border-white"
              onClick={handleExpanded}
            >
              <TbCaretLeftRight className="text-brand-color dark:text-white" />
            </button>
          </Tooltip>
        )}
      </div>
      {!invoicesLoading && !isTransitioning ? (
        <>
          <div className="w-full flex flex-row justify-center items-center gap-4">
            <Dropdown
              label="Groups ▼"
              placement="bottom-start"
              renderTrigger={() => (
                <div className="px-2 py-1 rounded-md border border-brand-color cursor-pointer overflow-hidden">
                  <h1 className="flex items-center justify-center gap-4 duration-100 ease-in text-dark-black dark:text-slate-300 xl:text-base text-sm ">
                    {status === "open"
                      ? "pending"
                      : status === "void"
                      ? "canceled"
                      : status}
                    <span className="text-xs">▼</span>
                  </h1>
                </div>
              )}
              className="dark:bg-dark-black bg-light-glass backdrop-blur-2xl border-none z-40"
            >
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleStatus("paid");
                  setInvoicesLoading(true);
                }}
              >
                Paid
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleStatus("open");
                  setInvoicesLoading(true);
                }}
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleStatus("uncollectible");
                  setInvoicesLoading(true);
                }}
              >
                Uncollectible
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleStatus("draft");
                  setInvoicesLoading(true);
                }}
              >
                Draft
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleStatus("void");
                  setInvoicesLoading(true);
                }}
              >
                Canceled
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              label="Groups ▼"
              placement="bottom-start"
              renderTrigger={() => (
                <div className="px-2 py-1 rounded-md border border-brand-color cursor-pointer overflow-hidden">
                  <h1 className="flex items-center justify-center gap-4 duration-100 ease-in text-dark-black dark:text-slate-300 xl:text-base text-sm ">
                    {limit} <span className="text-xs">▼</span>
                  </h1>
                </div>
              )}
              className="dark:bg-dark-black bg-light-glass backdrop-blur-2xl border-none z-40"
            >
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleLimit(5);
                }}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleLimit(10);
                }}
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:text-slate-300 text-light-black hover:text-slate-700"
                onClick={() => {
                  handleLimit(100);
                }}
              >
                100
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <Table hoverable striped>
              <Table.Head className="w-full">
                {expanded ? (
                  <>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Date
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Amount
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Description
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/4 sticky text-center">
                      Invoice
                    </Table.HeadCell>
                  </>
                ) : (
                  <>
                    <Table.HeadCell className="w-1/2 sticky text-center">
                      Date
                    </Table.HeadCell>
                    <Table.HeadCell className="w-1/2 sticky text-center">
                      Amount
                    </Table.HeadCell>
                  </>
                )}
              </Table.Head>
              <Table.Body className="divide-y">
                {invoices &&
                  invoices.map((items: any, index: Key) => (
                    <Table.Row
                      key={index}
                      className="w-full dark:border-gray-700 dark:bg-transparent cursor-pointer"
                    >
                      {expanded ? (
                        <>
                          <Table.Cell className="w-1/4 text-center">
                            {new Date(items.created * 1000).toLocaleString()}
                          </Table.Cell>
                          <Table.Cell className="w-1/4 text-center">
                            {items.amount_paid / 100}
                          </Table.Cell>
                          <Table.Cell className="w-1/4 text-center">
                            {items.lines.data[0].description}
                          </Table.Cell>
                          <Table.Cell className="w-1/4 text-center">
                            <button
                              className="border rounded-full border-green-500 hover:text-green-500"
                              onClick={() => {
                                window.open(items.hosted_invoice_url);
                              }}
                            >
                              <Tooltip
                                content={"Download"}
                                className="bg-brand-color text-center"
                                placement="bottom"
                              >
                                <TbDownload className="m-1 transition-fill duration-200 ease-in-out" />
                              </Tooltip>
                            </button>
                          </Table.Cell>
                        </>
                      ) : (
                        <>
                          <Table.Cell className="w-1/2 text-center">
                            {new Date(items.created * 1000).toLocaleString()}
                          </Table.Cell>
                          <Table.Cell className="w-1/2 text-center">
                            {items.amount_paid / 100}
                          </Table.Cell>
                        </>
                      )}
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="xl"
          />
        </div>
      )}
    </div>
  );
};

export default CardHistory;
