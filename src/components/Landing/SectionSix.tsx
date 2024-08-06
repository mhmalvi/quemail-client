"use client"
import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionSix = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-full py-16	">
      <div className="flex lg:flex-row flex-col flex-grow items-center w-full gap-8 p-16 rounded-md bg-light-glass">
        <div className="lg:w-1/2  flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl text-center text-slate-300">
            Create engaging emails 85% faster
          </h1>
          <button className="bg-gradient-to-r from-brand-color to-brand-color-2 px-8 py-2 rounded-md text-slate-300">
            Get Started
          </button>
        </div>
        <div className="lg:w-2/3 flex flex-col">
          <h1 className="p-0 m-0 text-slate-300">
            Join the growing community of satisfied Quemailer users and see how our platform can
            transform your email marketing strategy. Sign up today and start your journey towards more
            effective, efficient, and impactful email marketing.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SectionSix;
