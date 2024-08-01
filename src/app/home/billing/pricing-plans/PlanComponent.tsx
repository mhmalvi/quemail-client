"use client";

import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import { billingStore } from "@/store/store";
import React, { useState } from "react";
import { TbX } from "react-icons/tb";
import { cancelSubscription } from "@/app/api/billing";

interface planProps {
  heading: string;
  price: string;
  planType: string;
  item: {
    ticked: boolean;
    content: string;
  }[];
  priceId: number;
}
const PlanComponent = (props: planProps) => {
  const { heading, price, planType, item, priceId } = props;

  const setCheckoutModal = billingStore((state) => state.setCheckoutModal);
  const setPriceId = billingStore((state) => state.setPriceId);
  const setAmount = billingStore((state) => state.setAmount);

  const handleCancelSubscription = async () => {
    const res = await cancelSubscription();
    console.log("cancel subscription : ", res);
  };

  return (
    <div className="bg-violet-50 hover:bg-violet-200 dark:hover:bg-light-glass duration-100 ease-in-out border border-violet-200 dark:border-light-glass dark:bg-dark-black h-full w-full rounded-md flex flex-col items-center p-4">
      <h1 className="h-1/6 p-0 m-0 text-4xl font-semibold text-dark-black dark:text-slate-300 flex items-center">
        {heading}
      </h1>
      <div className="h-5/6 w-full bg-white dark:bg-light-glass p-4 rounded-md flex flex-col items-center">
        <div className="h-2/6 w-full overflow-hidden flex flex-col items-center justify-center">
          <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
            from
          </p>
          <h1 className="text-dark-black dark:text-slate-300 text-4xl font-semibold">
            ${price}
          </h1>
          <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
            per month, paid yearly
          </p>
          <p className="text-dark-black dark:text-slate-300 xl:text-xl text-sm">
            1 Users
          </p>
        </div>
        <div className="h-1/6 w-full py-4">
          {planType === "Current Plan" ? (
            <button
              onClick={() => {
                handleCancelSubscription();
              }}
              className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-yellow-300 rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-black font-semibold hover:text-slate-300"
            >
              Cancel Subscription
            </button>
          ) : (
            <button
              disabled={planType === "Current Plan"}
              onClick={() => {
                setCheckoutModal(true);
                setPriceId(priceId);
                setAmount(price);
              }}
              className="w-full h-full border disabled:border-voilet-200 disabled:dark:border-light-glass dark:border-light-glass disabled:hover:bg-violet-200 disabled:bg-violet-200 disabled:dark:bg-dark-black/50 hover:bg-dark-black duration-100 ease-in-out bg-brand-color rounded-md disabled:text-dark-black/60  disabled:dark:text-slate-300/60 disabled:cursor-not-allowed cursor-pointer text-slate-300"
            >
              {planType}
            </button>
          )}
        </div>
        <div className="h-3/6 w-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            {item.map((item, index) => {
              return (
                <div key={index}>
                  <h1 className="flex gap-2 text-sm text-dark-black dark:text-slate-300">
                    <span
                      className={
                        item.ticked ? "text-brand-color" : "text-red-500"
                      }
                    >
                      {item.ticked ? "✔" : <TbX />}
                    </span>
                    {item.content}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComponent;
