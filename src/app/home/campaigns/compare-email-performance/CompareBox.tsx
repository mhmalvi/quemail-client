"use client"
import React from "react";
import { Tooltip } from "flowbite-react";

const CompareBox = () => {
    return (
        <div className="bg-violet-50 duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full rounded-md flex flex-col items-center justify-center p-4">
            <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center gap-4">
                <div className="h-1/4 w-full overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/4 w-full overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/4 w-full overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
                    <Tooltip
                    content="Hoverd over"
                    className="bg-brand-color"
                    >
                    <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
                        $0
                    </h1>
                    </Tooltip>
                </div>
                <div className="h-1/4 w-full overflow-hidden flex flex-col rounded-md items-center justify-center bg-violet-300">
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