import { Progress, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  currentResourcesStatus,
  stripeINFO,
  stripeSubscriptionInfo,
} from "@/app/api/billing";
import { currentResources } from "@/components/utils/types";
import { warningNotification } from "@/components/utils/utility";

const CardResources = () => {
  const [currentResources, setCurrentResources] = useState<currentResources>();
  const [totalResources, setTotalResources] = useState<currentResources>();
  const [currentPackage, setCurrentPackage] = useState<string | null>(null);

  useEffect(() => {
    const currentResourcesState = async () => {
      const res = await currentResourcesStatus();
      const res3 = await stripeINFO();

      console.log("res :", res);
      console.log("res3 :", res3);

      if (
        res &&
        res.message === "success" &&
        res3 &&
        res3.message === "success"
      ) {
        setCurrentResources({
          currentCampaigns: res.countPerPackage.campaignCount,
          currentContacts: res.countPerPackage.contactsCount,
          currentEmails: res.countPerPackage.mailCount
            ? res.countPerPackage.mailCount
            : 0,
        });
        setCurrentPackage(res.productDB.productName);
        setTotalResources({
          currentCampaigns: 0,
          currentContacts: res.productDB.contactLimit,
          currentEmails: res.productDB.emailLimit,
        });
      }
    };
    currentResourcesState();
  }, [currentPackage, currentResources?.currentEmails]);

  return (
    <div className="step-3 summary-element w-full h-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      {currentResources?.currentCampaigns != null &&
      currentResources?.currentContacts != null &&
      currentResources?.currentEmails != null ? (
        <>
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
                  {totalResources?.currentContacts} &nbsp; per day
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
                  /{totalResources?.currentEmails} &nbsp; per day
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="xl"
            onClick={() => {
              console.log(
                "current campaign :",
                currentResources?.currentCampaigns
              );
              console.log(
                "currentContacts :",
                currentResources?.currentContacts
              );
              console.log("currentEmails :", currentResources?.currentEmails);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardResources;
