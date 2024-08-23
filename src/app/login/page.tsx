"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { emailCheck, resetPassowrd } from "../api/auth";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import CredentialsLogin from "./CredentialsLogin";
import { OTPData } from "@/components/utils/types";
import { passwordLoginStore } from "@/store/store";

const Login = () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, [router, token]);

  const [credentialsData, setCredentialsData] = useState<OTPData>({
    email: "",
    otp: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const passwordExist = passwordLoginStore((state) => state.passwordExist);
  const setPasswordExist = passwordLoginStore(
    (state) => state.setPasswordExist
  );
  const [stepTwo, setStepTwo] = useState({
    item: false,
    loading: false,
  });

  const handleEmailCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStepTwo((prevData) => ({
      ...prevData,
      loading: true,
    }));
    setPasswordExist(false);

    var response = await emailCheck(credentialsData.email);
    response = await response.json();
    console.log(response);
    if (response.status === true) {
      successNotification("An OTP has been sent to your email");
      setStepTwo({
        item: true,
        loading: false,
      });
    }
    if (response.status === 1) {
      setPasswordExist(true);
      console.log(passwordExist);
      setStepTwo({
        item: true,
        loading: false,
      });
    }
    if (response.status === false) {
      warningNotification("Email not registered.");
      setStepTwo((prevData) => ({
        ...prevData,
        loading: false,
      }));
    }
  };

  const handleResetPassword = async () => {
    var response = await resetPassowrd(credentialsData.email);
    response = await response.json();
    console.log(response);
    if (response.status === 201) {
      successNotification(response.message);
    }
    if (response.status === 535) {
      warningNotification(response.message);
    }
    setLoading(false);
    setOpenModal(false);
  };

  const handleGoogleClick = async () => {
    const googleLoginUrl = "https://backend.quemailer.com/google/login";
    window.open(googleLoginUrl, "_self");
  };

  return (
    <div className="relative h-screen bg-dark-black w-full flex items-center justify-center p-8">
      <div className="bg-light-glass xl:w-1/4 md:w-1/3 w-1/2 rounded-md backdrop-blur-2xl p-8 flex flex-col gap-4 items-center justify-center">
        <Link href="/" className="flex items-center mb-8">
          <h1 className="m-0 p-0 text-5xl text-slate-300 ">Que</h1>

          <Image
            src={Images.MainLogo}
            alt="logo"
            className={`h-16 w-16 rounded-md ease-in duration-100`}
          />

          <h1 className="m-0 p-0 text-5xl text-slate-300 ">ailer</h1>
        </Link>
        {stepTwo.item ? (
          <CredentialsLogin
            setCredentialsData={setCredentialsData}
            credentialsData={credentialsData}
            setStepTwo={setStepTwo}
          />
        ) : (
          <>
            <button
              className="w-full border border-slate-400 rounded-md flex items-center justify-center gap-8 p-2 hover:border-brand-color ease-in duration-100"
              onClick={() => handleGoogleClick()}
            >
              <Image src={Images.Google} alt="GoogleLogo" className="w-1/12" />
              <h1 className="m-0 p-0 text-slate-300">Continue with Google</h1>
            </button>

            <div className="flex w-full items-center justify-center gap-4">
              <div className="w-full h-0.5 bg-slate-400"></div>
              <h1 className="w-full m-0 p-0 text-slate-400 text-center">
                Or login with
              </h1>
              <div className="w-full h-0.5 bg-slate-400"></div>
            </div>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleEmailCheck}
            >
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
                  className="bg-transparent text-slate-300 rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
                />
              </div>
              <div className="flex justify-end text-sm text-slate-300">
                <span
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="hover:text-violet-500 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>
              {stepTwo.loading ? (
                <div className="flex items-center justify-center disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300">
                  <Spinner aria-label="Loading" className="fill-black" />
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={credentialsData.email.length === 0}
                  className="disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300"
                >
                  Next
                </button>
              )}
            </form>
            {/* <h1 className="text-slate-300">
              Don&apos;t have an account?{" "}
              <span className="text-brand-color">
                <Link href="/sign-up">Sign Up</Link>
              </span>
            </h1> */}
          </>
        )}
      </div>
      {openModal && (
        <div className="absolute h-full w-full rounded-md flex items-center justify-center">
          <div
            className="absolute h-full w-full bg-dark-black opacity-70"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>

          <div className="absolute bg-light-glass xl:w-1/4 md:w-1/3 w-1/2 rounded-md backdrop-blur-2xl p-8 flex flex-col gap-4 items-center justify-center">
            <div className="flex w-full h-full items-center justify-center">
              <label>Enter your Email</label>
            </div>
            <input
              type="email"
              onChange={(e) => {
                setCredentialsData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
              className="bg-transparent w-full text-slate-300 rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
            />

            {loading ? (
              <Spinner color="purple" aria-label="Purple spinner example" />
            ) : (
              <button
                onClick={() => {
                  setLoading(true);
                  handleResetPassword();
                }}
                className="bg-gradient-to-r from-brand-color to-button-color-2 px-4 py-2 rounded-md"
              >
                Reset Password
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
