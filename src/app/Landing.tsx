"use client";
import React from "react";
import SectionOne from "@/components/Landing/SectionOne";
import SectionTwo from "@/components/Landing/SectionTwo";
import SectionThree from "@/components/Landing/SectionThree";
import SectionFour from "@/components/Landing/SectionFour";
import SectionFive from "@/components/Landing/SectionFive";
import SectionSix from "@/components/Landing/SectionSix";
import "./globals.css";

const Landing = () => {
  return (
    <div className="relative bg-black flex flex-col items-center justify-between w-full h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-4">
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
