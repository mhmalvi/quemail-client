import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  currentResourcesStatus,
  stripeSubscriptionInfo,
  totalResourcesStatus,
} from "@/app/api/billing";
import { currentResources } from "@/components/utils/types";
import { warningNotification } from "@/components/utils/utility";

const CardResources = () => {
  const [currentResources, setCurrentResources] = useState<currentResources>();
  const [totalResources, setTotalResources] = useState<currentResources>();
  const [progress, setProgress] = useState<number>(50);
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);

  useEffect(() => {
    const currentResourcesState = async () => {
      const res = await currentResourcesStatus();
      const res1 = await totalResourcesStatus();
      const res2 = await stripeSubscriptionInfo();

      console.log("here", res);

      if (
        res &&
        res.message === "success" &&
        res1 &&
        res1.message === "success" &&
        res2
      ) {
        setCurrentResources({
          currentCampaigns: res.campaignCount,
          currentContacts: res.contactsCount,
          currentEmails: res.mailCount ? res.mailCount : 0,
        });
        setCurrentPackage(res2.lookup_key);
        const product = res1.products.find(
          (product: any) => product.productName === currentPackage
        );
        if (product) {
          console.log("here1", currentResources?.currentEmails);
          setTotalResources({
            currentCampaigns: 0,
            currentContacts: product.contactLimit,
            currentEmails: product.emailLimit,
          });
        }
      }
    };
    currentResourcesState();
  }, [currentPackage, currentResources?.currentEmails]);

  return (
    <div className="step-3 summary-element w-full h-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Current / Remaining Resources
      </h1>
      <div className="h-5/6 flex flex-row justify-center items-center">
        <div className="flex flex-col w-full h-2/3 justify-between">
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Campaigns:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              {currentResources?.currentCampaigns}
            </span>
          </div>
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Contacts:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              {currentResources?.currentContacts}/
              {totalResources?.currentContacts}
            </span>
            {currentResources?.currentContacts &&
            totalResources?.currentContacts ? (
              <Progress
                progress={Math.min(
                  (currentResources?.currentContacts /
                    totalResources?.currentContacts) *
                    100,
                  100
                )}
                color="purple"
              ></Progress>
            ) : (
              <Progress progress={0} color="purple"></Progress>
            )}
          </div>
          <div>
            <span className="text-base m-0 p-0 text-brand-color font-medium">
              Total Emails:{" "}
            </span>
            <span className="text-base m-0 p-0 dark:text-white text-dark-black text-center">
              {currentResources?.currentEmails
                ? currentResources?.currentEmails
                : "0"}
              /{totalResources?.currentEmails}
            </span>
            {currentResources?.currentEmails &&
            totalResources?.currentEmails ? (
              <Progress
                progress={Math.min(
                  (currentResources?.currentEmails /
                    totalResources?.currentEmails) *
                    100,
                  100
                )}
                color="purple"
              ></Progress>
            ) : (
              <Progress progress={0} color="purple"></Progress>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResources;
