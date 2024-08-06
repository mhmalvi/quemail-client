"use client";
import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center lg:h-screen h-full lg:py-0 py-16">
      <h1 className="m-0 px-0 xl:text-4xl text-3xl text-center flex gap-2 text-slate-300 xl:mt-8 mt-16">
        Get Started Today
      </h1>
      <p className="p-0 m-0 lg:w-5/12 w-full text-center text-slate-300">
        Experience the Quemailer difference and take your email marketing to new heights. Sign up
        for our no-credit-card-required free trial and explore the full potential of Quemailer. With easy
        cancellation and comprehensive support, there’s no risk in discovering how Quemailer can
        revolutionize your marketing efforts.
      </p>
      <Image src={Images && Images.SectionFour} alt="HeroImage"
        className="xl:w-1/2 lg:w-1/3 md:w-1/2" />
      <button className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold">
        Create Free account ➟
      </button>
      <p className="p-0 m-0 text-sm text-slate-500">
        Try us free  |  No credit card required  |  Cancel anytime
      </p>
    </div>
  );
};

export default SectionTwo;
