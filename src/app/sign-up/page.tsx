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
      <div className="h-2/3 bg-gray-800/60 lg:w-1/4 w-full rounded-md backdrop-blur-2xl border border-brand-color p-8 flex flex-col gap-8 items-center justify-center">
        <Link href="/">
          <Image src={Images.Logo} alt="logo" />
        </Link>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <input
              type="email"
              className="bg-transparent rounded-md focus:outline-none focus:ring-0 outline-none border border-brand-color px-5 py-2"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Password</label>
            <div className="w-full rounded-md flex items-center justify-between border border-brand-color px-2">
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
            <div className="w-full rounded-md flex items-center justify-between border border-brand-color px-2">
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

          <button className="rounded-md w-full px-4 py-2 bg-brand-color">
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
