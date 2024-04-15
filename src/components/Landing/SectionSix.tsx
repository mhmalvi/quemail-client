import React from "react";
import Image from "next/image";
import Images from "../utils/images";

const SectionSix = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-full py-16">
      <div className="flex lg:flex-row flex-col flex-grow items-center w-full gap-8 p-16 rounded-md w-full bg-gradient-to-b from-brand-color to-brand-color-2">
        <div className="lg:w-1/2 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl text-center">
            Create engaging emails 85% faster
          </h1>
          <button className="bg-background-color px-8 py-2 rounded-md">
            Get Started
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="p-0 m-0">
            “ I love the Quemailer email generator. It creates excellent copy
            and gives me ideas that I can edit and add to my email marketing. It
            has increased my open rates on the tested emails. ”
          </h1>
          <h1>- John Doe</h1>
        </div>
      </div>
    </div>
  );
};

export default SectionSix;
