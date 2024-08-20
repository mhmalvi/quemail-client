"use client";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { useRouter, useSearchParams } from "next/navigation";

const Pricing = () => {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-background-color ">
      <>
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
            <button
              onClick={handleCreateAccount}
              className="px-4 py-2 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-md"
            >
              Create Account
            </button>
          </div>
          <div className="flex lg:flex-row flex-col flex-grow gap-8 w-full h-full">
            <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
              <h1 className="m-0 py-4 text-3xl text-center w-full  h-full">
                Free
              </h1>
              <div className="p-1 w-full">
                <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="h-full w-full">from</p>
                    <h1 className="h-full w-full text-6xl">$0</h1>
                    <p className="h-full w-full">per month, paid yearly</p>
                    <p className="h-full w-full">1 Users</p>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full border border-brand-color hover:bg-brand-color ease-in duration-200 rounded-md p-2"
                  >
                    Get Started
                  </button>
                  <div className="flex flex-col gap-4">
                    <h1 className="flex gap-2 text-sm">
                      <span className="text-brand-color">✔</span>Email Marketing
                      & Automation
                    </h1>
                    <h1 className="flex gap-2 text-sm">
                      <span className="text-brand-color">✔</span>Email Marketing
                      & Automation
                    </h1>
                    <h1 className="flex gap-2 text-sm">
                      <span className="text-brand-color">✔</span>Email Marketing
                      & Automation
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
              <h1 className="m-0 py-4 text-3xl text-center w-full  h-full">
                Starter
              </h1>
              <div className="p-1 w-full">
                <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="h-full w-full">from</p>
                    <h1 className="h-full w-full text-6xl">$10</h1>
                    <p className="h-full w-full">per month, paid yearly</p>
                    <p className="h-full w-full">1 Users</p>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full border border-brand-color rounded-md hover:bg-brand-color ease-in duration-200 p-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
              <h1 className="m-0 py-4 text-3xl text-center w-full  h-full">
                Growth
              </h1>
              <div className="p-1 w-full">
                <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="h-full w-full">from</p>
                    <h1 className="h-full w-full text-6xl">$25</h1>
                    <p className="h-full w-full">per month, paid yearly</p>
                    <p className="h-full w-full">1 Users</p>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full border border-brand-color hover:bg-brand-color ease-in duration-200 rounded-md p-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
              <h1 className="m-0 py-4 text-3xl text-center w-full  h-full">
                Professional
              </h1>
              <div className="p-1 w-full">
                <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="h-full w-full">from</p>
                    <h1 className="h-full w-full text-6xl">$40</h1>
                    <p className="h-full w-full">per month, paid yearly</p>
                    <p className="h-full w-full">1 Users</p>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full border border-brand-color hover:bg-brand-color ease-in duration-200 rounded-md p-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center bg-light-glass hover:bg-brand-color ease-in duration-200 rounded-md">
              <h1 className="m-0 py-4 text-3xl text-center w-full  h-full">
                Enterprise
              </h1>
              <div className="p-1 w-full">
                <div className="p-4 flex flex-col items-center gap-4 bg-[#282828] rounded-b-md">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="h-full w-full">from</p>
                    <h1 className="h-full w-full text-6xl">$60</h1>
                    <p className="h-full w-full">per month, paid yearly</p>
                    <p className="h-full w-full">1 Users</p>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full border border-brand-color hover:bg-brand-color ease-in duration-200 rounded-md p-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </main>
  );
};

export default Pricing;
