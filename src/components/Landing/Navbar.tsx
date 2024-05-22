"use client";
import React, { useState } from "react";
import Images from "../utils/images";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  return (
    <>
      <nav className="fixed flex items-center justify-between w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2 shadow-md shadow-brand-color z-20 bg-dark-black xl:py-0 py-2">
        <Link href="/" className="flex items-center">
          <h1 className="m-0 p-0 xl:text-4xl text-2xl text-slate-300 ">Que</h1>
          <Image
            src={Images.MainLogo}
            alt="logo"
            className={`xl:h-16 xl:w-10 h-8 w-8 rounded-md ease-in duration-100`}
          />
          <h1 className="m-0 p-0 xl:text-4xl text-2xl text-slate-300 ">ailer</h1>
        </Link>
        <ul className="md:flex gap-8 hidden">
          <Link href="/about-us">
            <li className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
              About Us
            </li>
          </Link>
          <Link href="/pricing">
            <li className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
              Pricing
            </li>
          </Link>
          {/* <Link href="/support"> */}
          <li className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
            Support
          </li>
          {/* </Link> */}
          <Link href="/contact-us">
            <li className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
              Contact Us
            </li>
          </Link>
          <Link href="/privacy-policy">
            <li className="xl:text-base text-sm cursor-pointer hover:text-brand-color text-slate-300 ease-in duration-200">
              Privacy Policy
            </li>
          </Link>
        </ul>

        <div className="md:flex hidden gap-8">
          {token ? (
            <>
              <Link href="/home" className="">
                <button className="rounded-md bg-gradient-to-r from-brand-color to-button-color-2 xl:px-4 xl:py-2 px-4 py-2 xl:text-base text-slate-300 w-full text-sm">
                  Start browsing
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-up">
                <button className="rounded-md bg-gradient-to-r from-brand-color to-button-color-2 xl:px-4 xl:py-2 px-4 py-2 xl:text-base text-slate-300 w-full text-sm">
                  Try for free
                </button>
              </Link>
              <Link href="/login">
                <button className="rounded-md border border-brand-color xl:px-4 xl:py-2 px-4 py-2 xl:text-base text-slate-300 w-full text-sm">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
        <div
          className="md:hidden"
          onClick={() => {
            setOpenNavDrawer(!openNavDrawer);
          }}
        >
          <div
            className={`relative flex flex-col items-center justify-center gap-2 z-20`}
          >
            <div
              className={`h-1.5 w-10 ease-in duration-200 ${
                openNavDrawer ? "right-0 absolute rotate-45" : "rotate-0"
              } bg-slate-300 z-30`}
            ></div>
            <div
              className={`h-1.5 w-10 ease-in duration-200 ${
                openNavDrawer ? "hidden" : "flex"
              } bg-slate-300`}
            ></div>
            <div
              className={`h-1.5 w-10 ease-in duration-200 ${
                openNavDrawer ? "right-0 absolute -rotate-45" : "rotate-0"
              } bg-slate-300`}
            ></div>
          </div>
        </div>
      </nav>
      {openNavDrawer && (
        <div className="fixed flex flex-col gap-16 items-center justify-center h-full w-full z-10 bg-black">
          <ul className="flex flex-col gap-8">
            <Link href="/about-us">
              <li className="text-3xl ease-in duration-200">About Us</li>
            </Link>
            <li className="text-3xl ease-in duration-200">Pricing</li>
            <li className="text-3xl">Support</li>
            <Link href="/contact-us">
              <li className="text-3xl">Contact Us</li>
            </Link>
            <Link href="/privacy-policy">
              <li className="text-3xl">Privacy Policy</li>
            </Link>
          </ul>

          <div className="flex flex-col items-center justify-center gap-8 w-full">
            <Link href="/sign-up" className="w-1/2">
              <button className="rounded-md bg-gradient-to-r from-brand-color to-button-color-2 px-4 py-2 w-full text-2xl">
                Try for free
              </button>
            </Link>
            <Link href="/login" className="w-1/2">
              <button className="rounded-md border border-brand-color w-full px-4 py-2 text-2xl">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
