"use client";
import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionOne = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-screen z-10	">
      <h1 className="m-0 px-0 py-2 lg:text-4xl text-3xl text-center flex flex-col gap-2 text-slate-300 lg:mt-8">
        Reach your leads with
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 py-1 font-semibold lg:text-5xl text-4xl">
          Email Marketing
        </span>
      </h1>
      <p className="p-0 m-0 lg:w-4/12 w-8/12 text-center text-slate-300">
        An affordable, easy platform to send emails, grow your list & automate
        communication.
      </p>
      <Image src={Images.HeroImage} alt="HeroImage" />
      <button className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold">
        Create Free account ➟
      </button>
      <p className="p-0 m-0 text-sm text-slate-500">
        Try us free  |  No credit card required  |  Cancel anytime
      </p>
    </div>
  );
};

export default SectionOne;
