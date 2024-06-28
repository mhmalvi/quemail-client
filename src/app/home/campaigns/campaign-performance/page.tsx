"use client";
import { useState } from "react";
import Chart from "react-apexcharts";
const CampaignPerformance = () => {
  // const [state, setState] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91],
  //     },
  //   ],
  // });
  return (
    <div className="w-full h-full flex items-center justify-center gap-4 dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 overflow-hidden">
      This feature is under development
      {/* <div className="row">

          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
      </div> */}
    </div>
  );
};
export default CampaignPerformance;
