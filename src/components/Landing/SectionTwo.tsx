import React from "react";
import Image from "next/image";
import Images from "../utils/images";
import { sectionTwoData } from "../utils/staticData";

const SectionTwo = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-full">
      <h1 className="m-0 px-0 py-2 lg:text-2xl text-base text-center flex flex-col lg:gap-2 text-slate-300">
        Easier email marketing & automation that
        <span className="text-brand-color lg:text-3xl text-xl">
          converts contacts into customers
        </span>
      </h1>
      <Image src={Images.SectionTwo} alt="HeroImage" />
      <div className="w-9/12  flex flex-wrap gap-4 justify-between">
        {sectionTwoData.map((items, index) => {
          return (
            <div key={index} className="flex gap-4 items-center lg:w-5/12">
              <div className="h-20 w-20 bg-slate-700 animate-pulse"></div>
              <div className="w-9/12 flex flex-col gap-2">
                <h1 className="text-base w-2/3 text-brand-color">
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
