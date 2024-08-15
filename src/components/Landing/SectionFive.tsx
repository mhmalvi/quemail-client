"use client"
import React from "react";
import Image from "next/image";
import Images from "../utils/images";
import { sectionFiveData } from "../utils/staticData";

const SectionFive = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center lg:h-screen h-full lg:py-0 py-16 ">
      <h1 className="m-0 px-0 py-2 lg:text-2xl text-base text-center flex flex-col lg:gap-2 text-slate-300">
        Additional Resources
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-color to-brand-color-2 lg:text-3xl text-xl">
          for marketing and revenue professionals
        </span>
      </h1>
      <p className="p-0 m-0 lg:w-5/12 w-full text-center text-slate-300">
        Explore our extensive library of resources to help you get the most out of Quemailer. From
        detailed guides and how-tos to case studies and industry insights, we provide the knowledge
        and tools you need to succeed.
      </p>
      <Image src={Images && Images.SectionFive} alt="HeroImage"
        className="xl:w-1/2 lg:w-1/3 md:w-1/2 animate-float" />
      <div className="grid grid-cols-2 items-center text-center justify-center w-full gap-4">
        {sectionFiveData.map((items, index) => {
          return (
            <div key={index} className="">
              <p className="text-slate-300">
                <span className="text-green-500">✔</span> {items}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionFive;
