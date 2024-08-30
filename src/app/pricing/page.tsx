"use client";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React from "react";
import { useRouter } from "next/navigation";
import {
  pricingplan1,
  pricingplan2,
  pricingplan3,
  pricingplan4,
} from "@/components/utils/staticData";
import { TbX } from "react-icons/tb";

const plans = [
  { name: "Starter", price: "$2", features: pricingplan1 },
  { name: "Growth", price: "$5", features: pricingplan2 },
  { name: "Professional", price: "$8", features: pricingplan3 },
  { name: "Enterprise", price: "$10", features: pricingplan4 },
];

const Pricing = () => {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/login");
  };

  const PlanCard = ({
    name,
    price,
    features,
  }: {
    name: string;
    price: string;
    features: { ticked: boolean; content: string }[];
  }) => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
      <h1 className="m-0 py-4 text-3xl text-center w-full">{name}</h1>
      <div className="p-1 w-full">
        <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
          <div className="flex flex-col gap-2 text-center">
            <p>from</p>
            <h1 className="text-6xl">{price}</h1>
            <p>per day</p>
            <p>1 User</p>
          </div>
          <button
            onClick={handleCreateAccount}
            className="w-full border border-brand-color hover:bg-brand-color ease-in duration-200 rounded-md p-2"
          >
            Get Started
          </button>
          <div className="flex flex-col gap-2 w-full mt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-2 text-sm text-slate-300 items-center justify-center"
              >
                <span
                  className={
                    feature.ticked ? "text-brand-color" : "text-red-500"
                  }
                >
                  {feature.ticked ? "✔" : <TbX />}
                </span>
                <span className="text-base">{feature.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center bg-background-color">
      <Navbar />
      <div className="flex flex-col gap-8 lg:mt-32 mt-24 w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-normal text-slate-300">Pricing</h1>
            <h1 className="md:flex hidden text-base font-normal text-slate-300">
              Get the best offers of Quemailer throughout the period of your
              subscription package.
            </h1>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col flex-grow gap-8 w-full h-full">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Pricing;
