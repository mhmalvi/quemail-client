import { stripeSubscriptionInfo } from "@/app/api/billing";
import { useEffect, useState } from "react";
import { subscriptionDetails } from "@/app/api/billing";
import { Spinner } from "flowbite-react";
import PackageCard from "./packageCard";

const CardPlan = () => {
  const [packageName, setPackageName] = useState<string | null>(null);
  const [createdTime, setCreatedTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [staticEndTime, setStaticEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("");

  const fetchSubscriptionInfo = async () => {
    const res = await stripeSubscriptionInfo();
    const res1 = await subscriptionDetails();
    if (res && res1) {
      console.log("price:", res);
      setPackageName(res.lookup_key);
      const startDate: Date = new Date(res1.current_period_start * 1000);
      setCreatedTime(startDate);
      const endDate: Date = new Date(res1.current_period_end * 1000);
      setEndTime(endDate);
      setStaticEndTime(res1.current_period_end);
    }
  };

  const calculateRemainingTime = (endTime: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingSeconds = endTime - currentTime;

    if (remainingSeconds <= 0) {
      return "Time is up!";
    }

    const days = Math.floor(remainingSeconds / (3600 * 24));
    const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  useEffect(() => {
    if (staticEndTime) {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime(staticEndTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [staticEndTime]);

  return (
    <div className="step-3 summary-element w-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Card Plan
      </h1>
      {packageName && remainingTime && createdTime && endTime ? (
        <div className="flex flex-row w-full h-full gap-4 justify-center items-center">
          <div className="flex w-full h-2/3 rounded justify-center items-center">
            <PackageCard packageName={packageName}></PackageCard>
          </div>
          <div className="flex flex-col w-full h-2/3 justify-between ">
            <div>
              <h1 className="text-base m-0 p-0 text-brand-color font-medium">
                Remaining time:
              </h1>
              <h1 className="text-base m-0 p-0 dark:text-white text-dark-black">
                {remainingTime}
              </h1>
            </div>
            <div>
              <h1 className="text-base m-0 p-0 text-brand-color font-medium">
                Subscription Started:
              </h1>
              <h1 className="text-base m-0 p-0 dark:text-white text-dark-black">
                {createdTime?.toLocaleString()}
              </h1>
            </div>
            <div>
              <h1 className="text-base m-0 p-0 text-brand-color font-medium">
                Subscription End:
              </h1>
              <h1 className="text-base m-0 p-0 dark:text-white text-dark-black">
                {endTime?.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-80 justify-center items-center">
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
