"use client";
import { useEffect, useState } from "react";
import SummaryRate from "./SummaryRate";
import { Dropdown } from "flowbite-react";
import { TbFilter } from "react-icons/tb";
import Filter from "./Filter";

const CampaignPerformance = () => {
  const [Chart, setChart] = useState<any>();
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 overflow-hidden">
      <div className="w-1/5 ">
        <Filter />
      </div>
      <div className="h-1/4">
        <SummaryRate />
      </div>
      {/* <div className="h-1/3">

      {Chart && (
        <div className="row">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
        </div>
      )}
      </div> */}
    </div>
  );
};

export default CampaignPerformance;
