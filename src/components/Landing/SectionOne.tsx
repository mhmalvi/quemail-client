"use client";
import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionOne = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="m-0 px-0 xl:text-4xl text-3xl text-center flex gap-2 text-slate-300 xl:mt-8 mt-16">
        Welcome to,
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 m-0 font-semibold xl:text-5xl text-4xl">
          Quemailer
        </span>
      </h1>
      <p className="p-0 m-0 xl:w-2/3 w-8/12 xl:text-base text-sm text-center text-slate-300">
        At Quemailer, we are committed to empowering businesses to build strong, lasting
        connections with their audience through cutting-edge email marketing solutions. Our
        platform is meticulously designed to cater to the diverse needs of modern marketers, offering
        robust features and exceptional support to ensure your campaigns are both effective and
        impactful.
      </p>
      {/* <Image
        src={Images && Images.HeroImage}
        alt="HeroImage"
        className="xl:w-1/2 lg:w-1/3 md:w-1/2 animate-float"
      /> */}
      <iframe className="xl:w-1/2 h-1/2 lg:w-1/3 md:w-1/2" src="https://lottie.host/embed/24e27546-0c73-4ecb-824e-b9323f281f34/SlFkqQweFU.json"></iframe>
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
