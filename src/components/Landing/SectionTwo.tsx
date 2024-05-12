"use client"
import React from "react";
import Image from "next/image";
import Images from "../utils/images";
import { sectionTwoData } from "../utils/staticData";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-full	">
      <h1 className="m-0 px-0 py-2 lg:text-2xl text-base text-center flex flex-col lg:gap-2 text-slate-300">
        Easier email marketing & automation that
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-color to-brand-color-2 lg:text-3xl text-xl">
          converts contacts into customers
        </span>
      </h1>
      <Image src={Images && Images.SectionTwo} alt="HeroImage" />
      <div className="lg:w-9/12 w-full flex flex-wrap gap-4 justify-between">
        {sectionTwoData.map((items, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 items-center lg:w-5/12 w-full"
            >
              <div className="h-20 w-20 bg-slate-700 animate-pulse"></div>
              <div className="lg:w-9/12 w-10/12 flex flex-col gap-2">
                <h1 className="lg:text-base text-sm lg:w-2/3 w-full text-transparent bg-clip-text bg-gradient-to-r from-brand-color to-brand-color-2">
                  {items.title}
                </h1>
                <p className="text-sm text-slate-300">{items.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionTwo;
