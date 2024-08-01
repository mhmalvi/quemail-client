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
import { Modal } from "flowbite-react";
import CheckoutFormWrapper from "../CheckoutForm";
import {
  fetchProducts,
  stripeINFO,
  stripeSubscriptionInfo,
} from "@/app/api/billing";
import { Storage } from "@/store/store";

const PricingPlans = () => {
  const checkoutModal = billingStore((state: any) => state.checkoutModal);
  const setCheckoutModal = billingStore((state: any) => state.setCheckoutModal);
  const setProducts = billingStore((state: any) => state.setProducts);
  const products = billingStore((state: any) => state.products);
  const priceId = billingStore((state: any) => state.priceId);
  const [customerId, setCustomerID] = useState<string>("");
  const [currentPackage, setCurrentPackage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetchProducts();
      const res1 = await stripeINFO();
      const res2 = await stripeSubscriptionInfo();
      if (res && res1 && res2) {
        setProducts(res);
        setCustomerID(res1.stripeCustomerID);
        setCurrentPackage(res2.lookup_key);
      }
    })();
  }, [setProducts]);
  return (
    <div className={CONTAINER_STYLES}>
      {products
        .slice()
        .reverse()
        .map((items: any, index: number) => {
          const calculatedPrice = items.unit_amount / 100;
          return (
            <div key={index} className="p-0 m-0 relative flex w-full gap-4">
              <PlanComponent
                heading={items.lookup_key}
                price={calculatedPrice.toString()}
                priceId={items.id}
                //planType={`Choose ${items.name}`}
                planType={
                  items.lookup_key === currentPackage
                    ? "Current Plan"
                    : `Choose ${items.lookup_key}`
                }
                item={
                  items.lookup_key === "Starter"
                    ? pricingplan1
                    : items.lookup_key === "Growth"
                    ? pricingplan2
                    : items.lookup_key === "Professional"
                    ? pricingplan3
                    : pricingplan4
                }
              />
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
    </div>
  );
};

export default PricingPlans;
