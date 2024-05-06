"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { emailCheck } from "../api/auth";
import { Spinner } from "flowbite-react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/toast";
import CredentialsLogin from "./CredentialsLogin";
import { OTPData } from "@/components/utils/types";

const Login = () => {
  const notify = () => toast("Wow so easy!");
  const [credentialsData, setCredentialsData] = useState<OTPData>({
    email: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stepTwo, setStepTwo] = useState({
    item: false,
    loading: false,
  });

  const handleEmailCheck = async () => {
    setStepTwo((prevData) => ({
      ...prevData,
      loading: true,
    }));

    const response = await emailCheck(credentialsData.email);

    if (response.status === 404) {
      warningNotification(response.statusText);
      setStepTwo((prevData) => ({
        ...prevData,
        loading: false,
      }));
    } else {
      setStepTwo({
        item: true,
        loading: false,
      });
      successNotification(response.statusText);
    }
  };

  const handleGoogleClick = async () => {
    const googleLoginUrl = "https://backend.quemailer.com/google/login";
    window.open(googleLoginUrl, "_self");
  };

  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) {
    redirect("/home");
  }

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-8">
      <div className="bg-light-glass lg:w-1/4 w-full rounded-md backdrop-blur-2xl p-8 flex flex-col gap-4 items-center justify-center">
        <Link href="/">
          <Image src={Images.Logo} alt="logo" />
        </Link>
        {stepTwo.item ? (
          <CredentialsLogin
            setCredentialsData={setCredentialsData}
            credentialsData={credentialsData}
          />
        ) : (
          <>
            <button
              className="w-full border border-slate-400 rounded-md flex items-center justify-center gap-8 p-2 hover:border-brand-color ease-in duration-100"
              onClick={() => handleGoogleClick()}
            >
              <Image src={Images.Google} alt="GoogleLogo" className="w-1/12" />
              <h1 className="m-0 p-0 text-slate-300">Login with Google</h1>
            </button>

            <div className="flex w-full items-center justify-center gap-4">
              <div className="w-full h-0.5 bg-slate-400"></div>
              <h1 className="m-0 p-0 text-slate-400">or</h1>
              <div className="w-full h-0.5 bg-slate-400"></div>
            </div>
            <form className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-slate-300">Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setCredentialsData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }));
                  }}
                  className="bg-transparent rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
                />
              </div>
              {stepTwo.loading ? (
                <div className="flex items-center justify-center disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300">
                  <Spinner aria-label="Loading" className="fill-black" />
                </div>
              ) : (
                <button
                  type="button"
                  disabled={credentialsData.email.length === 0}
                  onClick={handleEmailCheck}
                  className="disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300"
                >
                  Next
                </button>
              )}
            </form>
            <h1 className="text-slate-300">
              Don&apos;t have an account?{" "}
              <span className="text-brand-color">
                <Link href="/sign-up">Sign Up</Link>
              </span>
            </h1>
          </>
        )}
      </div>
      {openModal && (
        <div className="absolute h-full w-full rounded-md flex items-center justify-center">
          <div
            className="absolute h-full w-full bg-gray-800/50"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <form className="absolute lg:h-1/5 lg:w-1/3 w-10/12 bg-gray-800 rounded-md border border-slate-400 p-8 flex flex-col gap-2">
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
              className="bg-transparent rounded-md focus:ring-none outline-none border border-slate-400 px-4 py-2"
            />
            <button className="bg-gradient-to-r from-brand-color to-button-color-2 px-4 py-2 rounded-md">
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
