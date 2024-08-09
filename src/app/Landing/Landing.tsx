"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={"hiddens"}
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

const Landing = () => {
  return (
    <div className="relative flex flex-col items-center justify-between w-full gap-4 h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-4 z-10">
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
