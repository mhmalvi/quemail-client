import { ListGroup, Pagination, Tooltip } from "flowbite-react";
import { useState } from "react";
import { campaignData } from "@/components/utils/staticData";
import {
    TbProgress,
    TbProgressX,
    TbProgressCheck,
    TbChecks,
  } from "react-icons/tb";



export const CampaignPerformanceList =() =>{

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    return (
        <>
          <div className="flex items-center justify-between text-dark-black dark:text-slate-300 dark:border-slate-300 border-violet-50 ">
            <h1 className="w-full text-dark-black dark:text-slate-300">
              Campaign List
            </h1>
          </div>
          <ListGroup className="relative flex flex-col w-full bg-dark-glass overflow-auto">
            <ListGroup.Item className="sticky top-0 dark:bg-dark-black bg-violet-50 w-full flex items-center justify-between gap-2 p-0 m-0">
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
                Name
              </p>
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
                Phone Number
              </p>
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
                Opened
              </p>
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
                Clicked
              </p>
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm border-r text-dark-black dark:text-slate-300">
                Subscribed
              </p>
              <p className="w-1/5 m-0 p-0 text-xs lg:text-sm text-dark-black dark:text-slate-300">
                Date Added
              </p>
            </ListGroup.Item>
            {campaignData !== null &&
              campaignData.map(
                (item: any, index: number) => {
                  return (
                    <div key={index}>
                      <ListGroup.Item
                        className="text-base flex items-center justify-center w-full gap-2"
                      >
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          <Tooltip
                            content={item.name}
                            className="bg-brand-color"
                            placement="bottom"
                          >
                            {item.name}
                          </Tooltip>
                        </div>
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          {item.phone_number}
                        </div>
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          {item.opened}
                        </div>
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          {item.clicked}
                        </div>
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          {item.subscribed}
                        </div>
                        <div className="w-1/5 m-0 p-0 text-xs lg:text-sm truncate flex items-center justify-center">
                          {item.date_added}
                        </div>
                      </ListGroup.Item>
                    </div>
                  );
                }
              )}
          </ListGroup>
          <div className="w-full flex items-center justify-center">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
              previousLabel="<"
              nextLabel=">"
            />
          </div>
        </>
      );

}