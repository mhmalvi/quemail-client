"use client";
import React from "react";
import Images from "../utils/images";
import Image from "next/image";
import {
  AiOutlineEnvironment,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="relative flex flex-col gap-4 items-start justify-between w-full h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2 my-8">
      <Image
        src={Images.Logo}
        className={`lg:w-52 m-0 p-0
        `}
        alt="Logo"
      />
      <div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:mb-8">
          <div className=" flex flex-col lg:items-start items-center">
            <h1 className="lg:text-base text-2xl lg:mb-0 mb-8">Contact Us</h1>
            <div className="flex lg:justify-start justify-center lg:w-full my-2">
              <AiOutlinePhone className="scale-x-[-1] w-[20px] h-[20px] lg:mr-4 mr-2" />
              <p className="lg:w-4/5 text-base">+611300813316</p>
            </div>
            <div className="flex lg:justify-start justify-center lg:w-full my-2">
              <AiOutlineMail className="w-[20px] h-[20px] lg:mr-4 mr-2" />
              <p className="lg:w-4/5 text-base">hello@quadque.tech</p>
            </div>
            <div className="flex lg:justify-start justify-center lg:w-full my-2">
              <AiOutlineEnvironment className="w-[20px] h-[20px] lg:mr-4 mr-2" />
              <p className="lg:w-4/5 lg:text-start text-center w-4/5 text-sm">
                Level 1, 7 Greenfield Parade Bankstown, NSW 2200, Australia.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center ">
            <h1 className="lg:w-3/5 lg:text-start text-center cursor-pointer h-8 flex justify-center items-center">
              Terms & Conditions
            </h1>
            <h1 className="lg:w-3/5 lg:text-start text-center cursor-pointer h-8 flex justify-center items-center">
              GDPR Policy
            </h1>
            <h1 className="lg:w-3/5 lg:text-start text-center cursor-pointer h-8 flex justify-center items-center">
              Privacy Policy
            </h1>
            <h1 className="lg:w-3/5 lg:text-start text-center cursor-pointer h-8 flex justify-center items-center">
              Refund Policy
            </h1>
            <h1 className="lg:w-3/5 lg:text-start text-center cursor-pointer h-8 flex justify-center items-center">
              About Us
            </h1>
          </div>
          <div className=" flex flex-col justify-between w-full overflow-hidden">
            <h1 className="text-xl text-brand-color mb-2">Newsletter</h1>
            <form className="flex justify-between items-center bg-[transparent] p-1 border-[1px] rounded-md lg:mb-0 mb-8">
              <input
                type="email"
                className="h-[5vh] pl-4 rounded-[12px] focus:ring-0 w-full border-0 bg-[transparent] text-white "
                placeholder="Join our newsletter."
              />
              <div className="flex items-center px-4 bg-brand-color rounded-md h-full">
                <button type="submit">➟</button>
              </div>
            </form>
            <div className="flex flex-col lg:items-end items-center text-center w-full lg:my-2 lg:mb-0 mb-8">
              <h1 className="text-xs font-light	">To know more about us</h1>
              <div className="flex lg:justify-between items-center justify-around lg:w-2/5 lg:h-[5vh] w-1/2">
                <AiOutlineFacebook size={"2em"} />
                <AiOutlineLinkedin size={"2em"} />
                <AiOutlineYoutube size={"2em"} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-between w-full">
          <h1 className="lg:text-sm text-xs text-center">
            ©Copyright 2023 Queleads. All rights reserved. Proudly made in
            Australia.
          </h1>
          <h1 className="lg:text-sm text-xs text-center">
            A product of Quadque Technologies Pty Limited
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Footer;
