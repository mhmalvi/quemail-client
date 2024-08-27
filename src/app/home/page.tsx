"use client";

import React, { useEffect, useState } from "react";
import HomeCard from "@/app/home/HomeLayoutUI/homeCard";
import CardResources from "./billing/billing-components/CardResources";
import QuickActions from "@/app/home/HomeLayoutUI/quickAction";
import Summary from "./HomeLayoutUI/Summary";
import { useTourStore } from "@/store/store";
import { tourSteps } from "@/components/utils/tourSteps";
import dynamic from "next/dynamic";
import { fetchAccountAcess } from "../api/admin";
import SuperQuickAction from "./HomeLayoutUI/superQuickAction";
import { Spinner } from "flowbite-react";
const Home = () => {
  const Tour = dynamic(() => import("reactour"), {
    ssr: false,
  });
  const isTourGoing = useTourStore((state) => state.isTourGoing);
  const setIsTourGoing = useTourStore((state) => state.setIsTourGoing);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkAccountStatus = async () => {
      const response = await fetchAccountAcess();
      console.log("account status :", response);

      if (response.message === "superadmin") {
        setAccountStatus(response.message);
      } else if (response.message === "customer") {
        setAccountStatus(response.message);
      } else if (response.message === "subadmin") {
        setAccountStatus(response.message);
      }
    };
    checkAccountStatus();
  }, []);

  return (
    <div className="relative w-full h-full rounded-md flex flex-col gap-4 overflow-hidden">
      {!accountStatus ? (
        <div className="dark:bg-dark-glass bg-slate-50 w-full h-screen flex flex-col items-center justify-center">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="xl"
          />
        </div>
      ) : (
        ""
      )}
      {(accountStatus && accountStatus === "customer") ||
      accountStatus === "subadmin" ? (
        <>
          <div className="flex flex-col gap-4 h-full ">
            <div className="h-full w-full flex flex-col flex-grow justify-around gap-4">
              <div className="home-card-element flex h-full gap-4">
                <div className="w-1/2">
                  <HomeCard />
                </div>
                <div className="w-1/2">
                  <CardResources />
                </div>
              </div>
            </div>
            <QuickActions />
          </div>
        </>
      ) : (
        ""
      )}
      {accountStatus && accountStatus === "superadmin" ? (
        <SuperQuickAction />
      ) : (
        ""
      )}
      {typeof window !== undefined && (
        <Tour
          steps={tourSteps}
          isOpen={isTourGoing}
          rounded={5}
          accentColor="#6D53FF"
          onRequestClose={() => setIsTourGoing(false)}
          className="bg-orange-300"
        />
      )}
    </div>
  );
};
export default Home;
