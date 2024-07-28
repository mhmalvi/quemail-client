"use client";

import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect } from "react";
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
import { fetchPriceId, fetchProducts } from "@/app/api/billing";
import { Storage } from "@/store/store";

const PricingPlans = () => {
  const checkoutModal = billingStore((state: any) => state.checkoutModal);
  const setCheckoutModal = billingStore((state: any) => state.setCheckoutModal);
  const setProducts = billingStore((state: any) => state.setProducts);
  const products = billingStore((state: any) => state.products);
  const priceId = billingStore((state: any) => state.priceId);
  const customerId = Storage.getItem("stripeCustomerID");

  useEffect(() => {
    (async () => {
      const res = await fetchProducts();
      if (res) {
        const pricePromises = res.map((product: { default_price: number }) =>
          fetchPriceId(product.default_price)
        );
        const prices = await Promise.all(pricePromises);

        const productsWithPrices = res.map(
          (product: { default_price: number }, index: number) => ({
            ...product,
            price: prices[index],
          })
        );
        setProducts(productsWithPrices);
      }
    })();
  }, [setProducts]);
  return (
    <div className={CONTAINER_STYLES}>
      {products
        .slice()
        .reverse()
        .map(
          (
            items: {
              name: string;
              price: {
                unit_amount: number;
              };
              default_price: number;
            },
            index: number
          ) => {
            const calculatedPrice = items.price.unit_amount / 100;
            return (
              <div key={index} className="p-0 m-0 relative flex w-full gap-4">
                <PlanComponent
                  heading={items.name}
                  price={calculatedPrice.toString()}
                  priceId={items.default_price}
                  planType={`Choose ${items.name}`}
                  item={
                    items.name === "Starter"
                      ? pricingplan1
                      : items.name === "Growth"
                      ? pricingplan2
                      : items.name === "Professional"
                      ? pricingplan3
                      : pricingplan4
                  }
                />
              </div>
            );
          }
        )}
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
