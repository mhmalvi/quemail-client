"use client";
import React, { useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="h-screen w-full flex items-center justify-center p-8">
      <div className="h-2/3 bg-light-glass lg:w-1/4 w-full rounded-md backdrop-blur-2xl p-8 flex flex-col gap-8 items-center justify-center">
        <Link href="/" className="flex items-center">
          <h1 className="m-0 p-0 text-5xl text-slate-300 ">Que</h1>
          <Image
            src={Images.MainLogo}
            alt="logo"
            className={`h-16 w-16 rounded-md ease-in duration-100`}
          />
          <h1 className="m-0 p-0 text-5xl text-slate-300 ">ailer</h1>
        </Link>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <input
              type="email"
              className="bg-transparent rounded-md focus:outline-none focus:ring-0 outline-none border border-slate-400 px-5 py-2"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Password</label>
            <div className="w-full rounded-md flex items-center justify-between border border-slate-400 px-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent rounded-md focus:outline-none focus:ring-0 outline-none border-none"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Confirm Password</label>
            <div className="w-full rounded-md flex items-center justify-between border border-slate-400 px-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent rounded-md focus:outline-none focus:ring-0 outline-none border-none"
              />
              {showConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                />
              )}
            </div>
          </div>

          <button className="rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2">
            Sign Up
          </button>
        </form>
        <h1>
          Already have an account?{" "}
          <span className="text-brand-color">
            <Link href="/login">Log In</Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default SignUp;
