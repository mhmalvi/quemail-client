"use client";

import { getAllCardList } from "@/app/api/billing";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect, useState } from "react";
import CardDetails from "./billing-components/CardDetails";
import CardHistory from "./billing-components/CardHistory";
import CardPlan from "./billing-components/CardPlan";
import CardResources from "./billing-components/CardResources";

const Billing = () => {

  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-4 h-full w-full">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="h-1/2 w-full flex flex-row  gap-4">
            <div className="flex w-full gap-4">
              <CardPlan />
            </div>
            <div className="flex w-full gap-4">
              <CardDetails />
            </div>
          </div>
          <div className="flex h-full gap-4">
            <CardResources />
          </div>
        </div>
        <CardHistory />
      </div>
    </div>
  );
};

export default Billing;
