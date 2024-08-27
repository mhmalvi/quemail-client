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
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative flex flex-col lg:gap-4 items-start justify-between w-full h-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2 my-8 z-10">
      <div className="flex items-center w-full sm:justify-start justify-center sm:mb-0 mb-8">
        <h1 className="m-0 p-0 sm:text-4xl text-6xl text-slate-300 ">Que</h1>
        <Image
          src={Images.MainLogo}
          alt="logo"
          className="h-16 sm:w-10 w-20 rounded-md ease-in duration-100"
        />
        <h1 className="m-0 p-0 sm:text-4xl text-6xl text-slate-300 ">ailer</h1>
      </div>
      <div className="w-full">
        <div className="flex sm:flex-row flex-col w-full mb-10">
          <div className="sm:w-1/3 flex flex-col sm:items-start items-center">
            <h1 className="sm:text-base text-2xl lg:mb-0 mb-2 text-slate-300 ">
              Contact Us
            </h1>
            <div className="flex sm:justify-start justify-center sm:w-full my-2">
              <AiOutlinePhone className="scale-x-[-1] w-[20px] h-[20px] sm:mr-4 mr-2" />
              <p className="sm:w-4/5 text-base text-slate-300 ">
                +611300813316
              </p>
            </div>
            <div className="flex sm:justify-start justify-center sm:w-full my-2">
              <AiOutlineMail className="w-[20px] h-[20px] sm:mr-4 mr-2" />
              <p className="sm:w-4/5 text-base text-slate-300 ">
                hello@quadque.tech
              </p>
            </div>
            <div className="flex sm:justify-start justify-center sm:w-full my-2">
              <AiOutlineEnvironment className="w-[20px] h-[20px] sm:mr-4 mr-2" />
              <p className="sm:w-4/5 sm:text-start text-center w-4/5 text-sm text-slate-300 ">
                Level 1, 7 Greenfield Parade Bankstown, NSW 2200, Australia.
              </p>
            </div>
          </div>
          <hr className="lg:hidden" />
          <div className="sm:w-1/3 lg:my-0 my-8 flex flex-col justify-between items-center sm:gap-0 gap-4 ">
            <Link href="/terms-conditions">
              <h1 className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
                Terms & Conditions
              </h1>
            </Link>

            <Link href="/privacy-policy">
              <h1 className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
                Privacy Policy
              </h1>
            </Link>

            <Link href="/pricing">
              <h1 className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
                Pricing
              </h1>
            </Link>

            <Link href="/contact-us">
              <h1 className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
                Contact Us
              </h1>
            </Link>

            <Link href="/about-us">
              <h1 className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
                About Us
              </h1>
            </Link>
          </div>
          <div className="sm:w-1/3 flex flex-col justify-between overflow-hidden">
            {/* <h1 className="text-xl text-brand-color mb-2 ">Newsletter</h1> */}
            {/* <form className="flex justify-between items-center bg-[transparent] p-1 border-[1px] rounded-md sm:mb-0 mb-8 ">
              <input
                type="email"
                className=" pl-4 rounded-md focus:ring-0 w-full border-0 bg-transparent text-white"
                placeholder="Join our newsletter."
              />
              <div className="flex items-center px-4 bg-brand-color rounded-md h-10 cursor-pointer">
                <button type="submit" className="text-slate-300">
                  ➟
                </button>
              </div>
            </form> */}
            <div className="flex flex-col items-center text-center justify-center w-full mb-0 gap-2">
              <h1 className="lg:text-xs text-base font-light text-slate-300 text-center">
                To know more about us
              </h1>

              <div className="flex flex-col justify-center items-center w-full gap-2">
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineFacebook className="lg:text-3xl text-6xl text-slate-300 " />
                  <p>Coming Soon</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineLinkedin className="lg:text-3xl text-6xl text-slate-300 " />
                  <p>Coming Soon</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineYoutube className="lg:text-3xl text-6xl text-slate-300 " />
                  <p>Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-between w-full">
          <h1 className="lg:text-sm text-xs text-center text-slate-300 ">
            ©Copyright 2023 Queleads. All rights reserved. Proudly made in
            Australia.
          </h1>
          <h1 className="lg:text-sm text-xs text-center text-slate-300 ">
            A product of Quadque Technologies Pty Limited
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Footer;
