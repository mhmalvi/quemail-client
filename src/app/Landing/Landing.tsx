"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useInView } from "framer-motion";
import SectionOne from "@/components/Landing/SectionOne";
import SectionTwo from "@/components/Landing/SectionTwo";
import SectionThree from "@/components/Landing/SectionThree";
import SectionFour from "@/components/Landing/SectionFour";
import SectionFive from "@/components/Landing/SectionFive";
import SectionSix from "@/components/Landing/SectionSix";
import "../globals.css";
import Images from "@/components/utils/images";
import Image from "next/image";
import { landingStore } from "@/store/store";

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const welcomeVisible = landingStore((state) => state.welcomeVisible);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.1 1", "0.7 1"],
  });

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scrollYProgress,
      }}
    >
      {children}
    </motion.div>
  );
};

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between w-full gap-4 h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-4 z-10">
      <Image
        src={Images.Circle}
        alt="background-props"
        className="fixed -left-40 -top-40 -z-10 opacity-25 animate-float"
      />
      <Image
        src={Images.Lines}
        alt="background-props"
        className="fixed bottom-0 right-0 -z-10 opacity-25 animate-float_x"
      />
      <AnimatedSection>
        <SectionOne />
      </AnimatedSection>
      <AnimatedSection>
        <SectionTwo />
      </AnimatedSection>
      <AnimatedSection>
        <SectionThree />
      </AnimatedSection>
      <AnimatedSection>
        <SectionFour />
      </AnimatedSection>
      <AnimatedSection>
        <SectionFive />
      </AnimatedSection>
      <AnimatedSection>
        <SectionSix />
      </AnimatedSection>
    </div>
  );
};

export default Landing;
