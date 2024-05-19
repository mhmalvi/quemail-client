"use client";
import React from "react";
import SectionOne from "@/components/Landing/SectionOne";
import SectionTwo from "@/components/Landing/SectionTwo";
import SectionThree from "@/components/Landing/SectionThree";
import SectionFour from "@/components/Landing/SectionFour";
import SectionFive from "@/components/Landing/SectionFive";
import SectionSix from "@/components/Landing/SectionSix";
import "../globals.css";
import Images from "@/components/utils/images";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="relative flex flex-col items-center justify-between w-full gap-4 h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-4">
      <Image
        src={Images.Circle}
        alt="background-props"
        className="fixed -left-40 -top-40 -z-10 opacity-25"
      />
      <Image
        src={Images.Lines}
        alt="background-props"
        className="fixed bottom-0 right-0 -z-10 opacity-25"
      />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
    </div>
  );
};

export default Landing;
