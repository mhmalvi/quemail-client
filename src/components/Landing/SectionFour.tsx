import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="m-0 px-0 py-2 lg:text-2xl text-base text-center flex flex-col lg:gap-2 text-slate-300">
        Sync your data and growth with
        <span className="text-brand-color lg:text-3xl text-xl">
          100+ integrations
        </span>
      </h1>
      <p className="p-0 m-0 lg:w-5/12 w-full text-center text-slate-300">
        Easily connect other tools with Quemailer to keep your data up-to-date,
        automate workflows and enhance your customer experience.
      </p>
      <Image src={Images.SectionFour} alt="HeroImage" />
      <button className="px-4 py-2 bg-yellow-500 text-gray-800 rounded-md font-semibold">
        Create Free account
      </button>
      <p className="p-0 m-0 text-sm text-slate-500">
        Try us free  |  No credit card required  |  Cancel anytime
      </p>
    </div>
  );
};

export default SectionTwo;
