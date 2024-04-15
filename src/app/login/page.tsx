"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="relative h-screen w-full flex items-center justify-center p-8">
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
          <div className="flex flex-col w-full">
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
          <div className="flex items-center justify-end">
            <h1
              onClick={() => {
                setOpenModal(true);
              }}
              className="cursor-pointer"
            >
              Forgot Password ?{" "}
            </h1>
          </div>
          <button className="rounded-md w-full px-4 py-2 bg-brand-color">
            Log In
          </button>
        </form>
        <h1>
          Don&apos;t have an account?{" "}
          <span className="text-brand-color">
            <Link href="/sign-up">Sign Up</Link>
          </span>
        </h1>
      </div>
      {openModal && (
        <div className="absolute h-full w-full rounded-md flex items-center justify-center">
          <div
            className="absolute h-full w-full bg-gray-800/50"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <form className="absolute lg:h-1/5 lg:w-1/3 w-10/12 bg-gray-800 rounded-md border border-brand-color p-8 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label>Enter your Email</label>
              <div
                onClick={() => {
                  setOpenModal(false);
                }}
                className="cursor-pointer"
              >
                <div
                  className={`relative flex flex-col items-center justify-center gap-2 z-20`}
                >
                  <div
                    className={`h-1 w-4 ease-in duration-200 right-0 absolute rotate-45
               bg-slate-300 z-30`}
                  ></div>

                  <div
                    className={`h-1 w-4 ease-in duration-200 right-0 absolute -rotate-45 bg-slate-300`}
                  ></div>
                </div>
              </div>
            </div>
            <input
              type="email"
              className="bg-transparent rounded-md focus:ring-none outline-none border border-brand-color px-4 py-2"
            />
            <button className="bg-brand-color px-4 py-2 rounded-md">
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
