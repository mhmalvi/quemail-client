"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { paymentDue } from "@/store/store";
import { io } from "socket.io-client";

const Home = () => {
  const setHasDue = paymentDue((state) => state.setHasDue);
  const socket = useMemo(() => io("https://backend.quemailer.com"), []);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const Tour = dynamic(() => import("reactour"), {
    ssr: false,
  });
  const isTourGoing = useTourStore((state) => state.isTourGoing);
  const setIsTourGoing = useTourStore((state) => state.setIsTourGoing);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  // Handle search functionality via socket
  useEffect(() => {
    // Ensure the socket is connected only once at the start
    if (!socket.connected) {
      socket.connect();
    }

    const handleSearch = () => {
      socket.emit("due", {
        userID: userID || "",
      });
    };

    // Trigger the search
    handleSearch();

    // Listen for the server's response
    const handleDue = (data: any) => {
      setHasDue(data);
    };

    socket.on("due", handleDue);
    // Cleanup on component unmount or dependencies change
    return () => {
      socket.off("due", handleDue);
      socket.disconnect(); // Optional, if you want to close the socket on unmount
    };
  }, [socket, userID, setHasDue]);

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
