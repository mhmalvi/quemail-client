"use client";
import React, { useEffect, useState } from "react";
import Images from "../utils/images";
import Image from "next/image";
import "./nav.css";

const Navbar = () => {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  return (
    <nav className="flex items-center justify-between w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2">
      <Image
        src={Images.Logo}
        className={`w-52 m-0 p-0 
        `}
        alt="Logo"
      />
      <ul className="md:flex gap-8 hidden">
        <li>About Us</li>
        <li>Pricing</li>
        <li>Support</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>
      <div className="md:flex hidden gap-8">
        <button className="rounded-md bg-sky-500 px-4 py-2">
          Try for free
        </button>
        <button className="rounded-md border border-sky-500 px-4 py-2">
          Login
        </button>
      </div>
      <div
        className="md:hidden"
        onClick={() => {
          setOpenNavDrawer(!openNavDrawer);
        }}
      >
        <div
          className={`relative flex flex-col items-center justify-center gap-2 `}
        >
          <div
            className={`h-2 w-10 ease-in duration-200 ${
              openNavDrawer ? "right-0 absolute rotate-45" : "rotate-0"
            } bg-white`}
          ></div>
          <div
            className={`h-2 w-10 ease-in duration-200 ${
              openNavDrawer ? "hidden" : "flex"
            } bg-white`}
          ></div>
          <div
            className={`h-2 w-10 ease-in duration-200 ${
              openNavDrawer ? "right-0 absolute -rotate-45" : "rotate-0"
            } bg-white`}
          ></div>
        </div>
      </div>
      {openNavDrawer && <div></div>}
    </nav>
  );
};

export default Navbar;
