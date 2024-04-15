"use client";
import React, { useEffect, useState } from "react";
import Images from "../utils/images";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Define the scroll position where you want the menu to become fixed
      const scrollThreshold = 0; // Adjust this value based on your needs
      setIsMenuFixed(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav className="fixed flex items-center justify-between w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2 shadow-md shadow-brand-color z-20 bg-background-color">
        <Image
          src={Images.Logo}
          className={`w-52 m-0 p-0 z-20
        `}
          alt="Logo"
        />
        <ul className="md:flex gap-8 hidden">
          <li className="cursor-pointer hover:text-brand-color ease-in duration-200">
            About Us
          </li>
          <li className="cursor-pointer hover:text-brand-color ease-in duration-200">
            Pricing
          </li>
          <li className="cursor-pointer hover:text-brand-color ease-in duration-200">
            Support
          </li>
          <li className="cursor-pointer hover:text-brand-color ease-in duration-200">
            Contact Us
          </li>
          <li className="cursor-pointer hover:text-brand-color ease-in duration-200">
            Privacy Policy
          </li>
        </ul>
        <div className="md:flex hidden gap-8">
          <Link href="/sign-up">
            <button className="rounded-md bg-brand-color px-4 py-2">
              Try for free
            </button>
          </Link>
          <Link href="/login">
            <button className="rounded-md border border-brand-color px-4 py-2">
              Login
            </button>
          </Link>
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
        <div className="fixed flex flex-col gap-16 items-center justify-center h-full w-full z-10 bg-background-color">
          <ul className="flex flex-col gap-8">
            <li className="text-3xl ease-in duration-200">About Us</li>
            <li className="text-3xl ease-in duration-200">Pricing</li>
            <li className="text-3xl">Support</li>
            <li className="text-3xl">Contact Us</li>
            <li className="text-3xl">Privacy Policy</li>
          </ul>
          <div className="flex flex-col items-center justify-center gap-8 w-full">
            <Link href="/sign-up" className="w-1/2">
              <button className="rounded-md bg-brand-color px-4 py-2 w-full text-2xl">
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
