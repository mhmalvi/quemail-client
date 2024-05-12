"use client";
import React, { FormEvent, useState } from "react";
import { verifyOTP } from "../api/auth";
import { OTPData } from "@/components/utils/types";
import { Storage } from "@/store/store";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

const CredentialsLogin = ({
  setCredentialsData,
  credentialsData,
}: {
  setCredentialsData: React.Dispatch<React.SetStateAction<OTPData>>;
  credentialsData: OTPData;
}) => {
  const router = useRouter();
  const [buttonClick, setButtonClick] = useState(false);
  const handleCredentialSubmit = async () => {
    setButtonClick(true);
    const response = await verifyOTP(credentialsData);

    if (response.status === 200) {
      Storage.setItem("userName", response.user.userName);
      Storage.setItem("email", response.user.email);
      Storage.setItem("photo", response.user.photo);
      Storage.setItem("token", response.user.token);
      Storage.setItem("userID", response.user.userID);
      setButtonClick(false);
      router.push("/home");
    }
  };
  return (
    <div className="w-full ">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-slate-300">Add OTP</label>
          <input
            type="text"
            onChange={(e) => {
              setCredentialsData((prevData) => ({
                ...prevData,
                otp: e.target.value,
              }));
            }}
            className="bg-transparent rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
          />
        </div>
        {buttonClick ? (
          <div className="flex items-center justify-center disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300">
            <Spinner aria-label="Loading" className="fill-black" />
          </div>
        ) : (
          <button
            type="button"
            disabled={
              credentialsData.email.length === 0 ||
              credentialsData.otp.length !== 4
            }
            onClick={handleCredentialSubmit}
            className="disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300"
          >
            Log In
          </button>
        )}
      </form>
    </div>
  );
};

export default CredentialsLogin;
