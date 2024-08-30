import { stripeINFO, stripeSubscriptionInfo } from "@/app/api/billing";
import { useEffect, useState } from "react";
import { subscriptionDetails } from "@/app/api/billing";
import { Spinner } from "flowbite-react";
import PackageCard from "./packageCard";

const CardPlan = () => {
  const [packageName, setPackageName] = useState<string | null>(null);
  const [createdTime, setCreatedTime] = useState<Date | string | null>(null);
  const [endTime, setEndTime] = useState<Date | string | null>(null);
  const [packagePrice, setPackagePrice] = useState<number | string | null>(0);
  // const [staticEndTime, setStaticEndTime] = useState<number | null>(null);
  // const [remainingTime, setRemainingTime] = useState<string>("");

  const fetchSubscriptionInfo = async () => {
    const res = await stripeSubscriptionInfo();
    const res1 = await subscriptionDetails();
    console.log("checking: ", res.nickname);
    if (res && res1) {
      console.log(res1.plan.amount);
      setPackagePrice(res1.plan.amount / 100);
      setPackageName(res.nickname);
      const startDate: Date = new Date(res1.current_period_start * 1000);
      setCreatedTime(startDate);
      const endDate: Date = new Date(res1.current_period_end * 1000);
      setEndTime(endDate);
      // setStaticEndTime(res1.current_period_end);
    }
  };

  // const calculateRemainingTime = (endTime: number) => {
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   const remainingSeconds = endTime - currentTime;

  //   if (remainingSeconds <= 0) {
  //     return "Time is up!";
  //   }

  //   const days = Math.floor(remainingSeconds / (3600 * 24));
  //   const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
  //   const minutes = Math.floor((remainingSeconds % 3600) / 60);
  //   const seconds = remainingSeconds % 60;

  //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  // };

  useEffect(() => {
    const checkIfSubscriptionExist = async () => {
      const res = await stripeINFO();
      console.log("information: ", res);
      if (res && res.priceID === "free") {
        setPackagePrice("free");
        setPackageName("free");
        setCreatedTime("N/A");
        setEndTime("N/A");
      } else if (res && res.priceID === "Custom") {
        setPackagePrice("Custom");
        setPackageName("Custom");
        setCreatedTime("N/A");
        setEndTime("N/A");
      } else {
        fetchSubscriptionInfo();
      }
    };
    checkIfSubscriptionExist();
  }, []);

  // useEffect(() => {
  //   if (staticEndTime) {
  //     const interval = setInterval(() => {
  //       setRemainingTime(calculateRemainingTime(staticEndTime));
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [staticEndTime]);
  //check

  return (
    <div className="step-3 summary-element w-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Card Plan
      </h1>
      {packageName && createdTime && endTime ? (
        <div className="flex flex-row w-full h-full gap-4 justify-center items-center">
          <div className="flex w-1/2 h-5/6 rounded justify-center items-center">
            <PackageCard
              packagePrice={packagePrice}
              packageName={packageName}
              createdTime={createdTime}
              endTime={endTime}
            ></PackageCard>
          </div>
          <div className="flex flex-col lg:gap-2 xl:gap-6 w-1/3 h-4/5 justify-center">
            <div className="xl:text-base m-0 p-0 text-brand-color lg:text-sm">
              Cost:{" "}
              <div className="xl:text-base m-0 p-0 dark:text-slate-300 text-dark-black lg:text-sm">
                {packagePrice}
              </div>
            </div>
            <div className="xl:text-base m-0 p-0 text-brand-color lg:text-sm">
              Started:{" "}
              <div className="xl:text-base m-0 p-0 dark:text-slate-300 text-dark-black lg:text-sm">
                {createdTime.toLocaleString()}
              </div>
            </div>
            <div className="xl:text-base m-0 p-0 text-brand-color lg:text-sm">
              End:{" "}
              <div className="xl:text-base m-0 p-0 dark:text-slate-300 text-dark-black lg:text-sm ">
                {endTime.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="xl"
          />
        </div>
      )}
    </div>
  );
};

export default CardPlan;
