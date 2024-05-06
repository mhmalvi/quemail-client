"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Modal,
  Table,
  Checkbox,
  Pagination,
  DarkThemeToggle,
} from "flowbite-react";
import Link from "next/link";
const templateList = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    account: "Premium",
    dateCreated: "2023-01-15",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 3,
    fullName: "Jine Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 4,
    fullName: "Jone Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 5,
    fullName: "June Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 6,
    fullName: "Jyne Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 7,
    fullName: "Jtne Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
  {
    id: 8,
    fullName: "Jine Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    account: "Basic",
    dateCreated: "2023-02-20",
  },
];
const Templates = () => {
  const [filterValue, setFilterValue] = useState("");
  const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
  const [showOptionsOnHover, setShowOptionsOnHover] = useState({
    id: 0,
    show: false,
  });
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  return (
    <>
      {typeof window !== "undefined" && (
        <div className="relative w-full h-full bg-gray-800/80 rounded-md p-4 flex flex-col gap-8 overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <h1>Choose a template</h1>
              <div className="flex items-center border rounded-md px-4 ">
                <FiSearch className="" />
                <input
                  type="text"
                  placeholder="Search Templates"
                  className="bg-transparent border-none focus:ring-0 active:outline-none active:ring-0"
                  value={filterValue}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <Link href={"./template-generator"}>
                <button
                  className="py-2 px-4 rounded-md bg-brand-color"
                  // onClick={() => {
                  //   setOpenCreateTemplate(true);
                  // }}
                >
                  Create Template
                </button>
              </Link>
            </div>
          </div>
          <div className="h-full w-full overflow-y-scroll flex flex-wrap items-center justify-between gap-4 flex-grow">
            {templateList
              .filter((templates) =>
                templates.fullName
                  .toLowerCase()
                  .includes(filterValue.toLowerCase())
              )
              .map((templates) => (
                <div
                  key={templates.id}
                  className="flex flex-col items-center h-1/3 w-1/5 bg-background-color gap-4 rounded-md p-2 ease-in duration-100"
                  onMouseOver={() => {
                    setShowOptionsOnHover({
                      id: templates.id,
                      show: true,
                    });
                  }}
                  onMouseLeave={() => {
                    setShowOptionsOnHover({
                      id: 0,
                      show: false,
                    });
                  }}
                >
                  <div className="animate-pulse bg-gray-800 rounded-t-md h-full w-full flex items-center justify-center ">
                    {showOptionsOnHover.id === templates.id &&
                      showOptionsOnHover.show && (
                        <div className="flex flex-col gap-4">
                          <button className="px-4 py-2 bg-brand-color rounded-md">
                            Apply
                          </button>
                          <button>Preview</button>
                        </div>
                      )}
                  </div>
                  <h1 className="bg-background-color ">{templates.fullName}</h1>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Templates;
