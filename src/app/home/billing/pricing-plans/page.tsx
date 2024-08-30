"use client";

import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect, useState } from "react";
import PlanComponent from "./PlanComponent";
import {
  pricingplan1,
  pricingplan2,
  pricingplan3,
  pricingplan4,
} from "@/components/utils/staticData";
import { billingStore } from "@/store/store";
import { Modal, Spinner } from "flowbite-react";
import CheckoutFormWrapper from "../CheckoutForm";
import {
  cancelSubscription,
  fetchProducts,
  stripeINFO,
  stripeSubscriptionInfo,
} from "@/app/api/billing";
import { Storage } from "@/store/store";
import { warningNotification } from "@/components/utils/utility";

const PricingPlans = () => {
  const checkoutModal = billingStore((state: any) => state.checkoutModal);
  const setCheckoutModal = billingStore((state: any) => state.setCheckoutModal);

  const cancelModal = billingStore((state: any) => state.cancelModal);
  const setCancelModal = billingStore((state: any) => state.setCancelModal);

  const setProducts = billingStore((state: any) => state.setProducts);
  const products = billingStore((state: any) => state.products);
  const priceId = billingStore((state: any) => state.priceId);
  const [customerId, setCustomerID] = useState<string>("");
  const [currentPackage, setCurrentPackage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const res = await fetchProducts();
      const res1 = await stripeINFO();
      const res2 = await stripeSubscriptionInfo();
      if (res && res1 && res2) {
        console.log("pricing plans: ", res);
        setProducts(res);
        setCustomerID(res1.stripeCustomerID);
        setCurrentPackage(res2.nickname);
        setLoading(false);
      }
    })();
  }, [setProducts]);

  const handleCancelSubscription = async () => {
    const res = await cancelSubscription();
    if (res) {
      warningNotification("Subscription canceled!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      warningNotification("Network Error!");
    }
  };

  return (
    <div className={CONTAINER_STYLES}>
      {products
        .slice()
        .reverse()
        .map((items: any, index: number) => {
          const calculatedPrice = items.unit_amount / 100;
          return (
            <div key={index} className="p-0 m-0 relative flex w-full gap-4">
              {!loading ? (
                <PlanComponent
                  heading={items.nickname}
                  price={calculatedPrice.toString()}
                  priceId={items.id}
                  //planType={`Choose ${items.name}`}
                  planType={
                    items.nickname === currentPackage
                      ? "Current Plan"
                      : `Choose ${items.nickname}`
                  }
                  item={
                    items.nickname === "Starter"
                      ? pricingplan1
                      : items.nickname === "Growth"
                      ? pricingplan2
                      : items.nickname === "Professional"
                      ? pricingplan3
                      : pricingplan4
                  }
                />
              ) : (
                <div className="w-full h-screen flex flex-col items-center justify-center">
                  <Spinner
                    color="purple"
                    aria-label="Purple spinner example"
                    size="xl"
                  />
                </div>
              )}
            </div>
          );
        })}
      <Modal
        show={checkoutModal}
        dismissible
        onClose={() => {
          setCheckoutModal(false);
        }}
        size={"3xl"}
      >
        <Modal.Header>
          <h1 className="text-dark-black dark:text-slate-300">Select a card</h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full">
          <CheckoutFormWrapper customerId={customerId} priceId={priceId} />
        </Modal.Body>
      </Modal>

      <Modal
        show={cancelModal}
        dismissible
        onClose={() => {
          setCancelModal(false);
        }}
        size={"3xl"}
      >
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full">
          <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full flex flex-col gap-4">
            <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center gap-4">
              Are you sure you want to cancel subscription?
            </h1>
            <h1 className="text-base m-0 p-0 dark:text-white text-dark-black flex justify-center gap-4">
              <button
                className="w-1/3 h-full border dark:border-light-glass hover:bg-red-500 duration-100 ease-in-out bg-yellow-300 rounded-md   cursor-pointer text-black font-semibold hover:text-slate-300"
                onClick={() => {
                  handleCancelSubscription();
                }}
              >
                Cancel Subscription
              </button>
            </h1>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PricingPlans;
