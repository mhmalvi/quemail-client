"use client"
import React, { useEffect } from "react";
import { Tooltip } from "flowbite-react";
import {FilterProps} from "@/components/utils/types";
import { showCampaignStore, compareCampaignStore } from "@/store/store";

const CompareBox: React.FC<FilterProps> = ({ position }) => {
    const leftID = compareCampaignStore((state) => state.clickedCampaignId1);
    const rightID = compareCampaignStore((state) => state.clickedCampaignId2);

    return (
        <div className="bg-violet-50 duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full rounded-md flex flex-col items-center justify-center p-4">
            <div className="h-full m-5 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center gap-4">
                <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/3 w-2/3 overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
            </div>
      </div>
    )
}

export default CompareBox;