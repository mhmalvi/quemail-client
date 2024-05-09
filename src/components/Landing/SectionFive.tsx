"use client"
import React from "react";
import Image from "next/image";
import Images from "../utils/images";
import { sectionFiveData } from "../utils/staticData";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center lg:h-screen h-full lg:py-0 py-16 z-10	">
      <h1 className="m-0 px-0 py-2 lg:text-2xl text-base text-center flex flex-col lg:gap-2 text-slate-300">
        High-volume email marketing solutions for
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-color to-brand-color-2 lg:text-3xl text-xl">
          marketing and revenue professionals
        </span>
      </h1>
      <p className="p-0 m-0 lg:w-5/12 w-full text-center text-slate-300">
        Quemailer plans offer tailored solutions with premium support for medium
        and large companies looking to maximize their revenue.
      </p>
      <Image src={Images.SectionFive} alt="HeroImage" />
      <div className="grid grid-cols-2 items-center text-center justify-center w-full gap-4">
        {sectionFiveData.map((items, index) => {
          return (
            <div key={index} className="">
              <div>
                <span className="text-green-500">✔</span> {items}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionTwo;
