"use client";
import React, { FormEvent, useState } from "react";
import { verifyOTP, verifyPassword } from "../api/auth";
import { OTPData, credentialLoginStep } from "@/components/utils/types";
import { passwordLoginStore, Storage } from "@/store/store";
import { useRouter } from "next/navigation";
import { Modal, Spinner } from "flowbite-react";
import { warningNotification } from "@/components/utils/utility";
import CompanySelect from "./CompanySelect";

const CredentialsLogin = ({
  setCredentialsData,
  credentialsData,
  setStepTwo,
}: {
  setCredentialsData: React.Dispatch<React.SetStateAction<OTPData>>;
  credentialsData: OTPData;
  setStepTwo: React.Dispatch<React.SetStateAction<credentialLoginStep>>;
}) => {
  const router = useRouter();
  const [buttonClick, setButtonClick] = useState(false);
  const passwordExist = passwordLoginStore((state) => state.passwordExist);
  const [companyList, setCompanyList] = useState<any>(false);
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setButtonClick(true);
    setErrorMessage(null);
    console.log("inside handlePasswordlogins");
    const res = await verifyPassword(
      credentialsData.email,
      credentialsData.password
    );
    const response = await res.json();
    if (response.message === "success") {
      console.log(response);
      Storage.setItem("satok", response.data.token);
      Storage.setItem("email", response.data.email);
      Storage.setItem("userID", response.data.userID);
      setCompanyList(response.company);
      setShowCompanyList(true);
    } else if (response.status === 401) {
      setErrorMessage(response.message);
      setButtonClick(false);
    }
  };

  const handleCredentialSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setButtonClick(true);
    const response = await verifyOTP(credentialsData);
    if (response?.status === 200) {
      Storage.setItem("userName", response.user.userName);
      Storage.setItem("email", response.user.email);
      Storage.setItem("photo", response.user.photo);
      Storage.setItem("token", response.user.token);
      Storage.setItem("userID", Number(response.user.userID));
      Storage.setItem("first_user", Number(response.user.first_user));
      setButtonClick(false);
      setStepTwo({
        item: false,
        loading: false,
      });
      router.push("/home");
    } else if (response?.status === 404) {
      warningNotification(response.message);
      window.location.href =
        window.location.pathname + "?reload=" + new Date().getTime();
    }
  };

  return (
    <div className="w-full">
      {passwordExist ? (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handlePasswordLogin}
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="text-slate-300">Add Password</label>
            <input
              type="password"
              onChange={(e) => {
                setCredentialsData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }));
              }}
              className="bg-transparent text-slate-300 rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
            />
          </div>
          <div className="text-red-500">{errorMessage}</div>
          {buttonClick ? (
            <div className="flex items-center justify-center disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300">
              <Spinner aria-label="Loading" className="fill-black" />
            </div>
          ) : (
            <button
              type="submit"
              disabled={
                credentialsData.email.length === 0 ||
                credentialsData.password.length < 8
              }
              className="disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300"
            >
              Log In
            </button>
          )}
        </form>
      ) : (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleCredentialSubmit}
        >
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
              className="bg-transparent text-slate-300 rounded-md focus:outline-none focus:ring-0 focus:border-brand-color outline-none border border-slate-400 px-5 py-2"
            />
          </div>
          {buttonClick ? (
            <div className="flex items-center justify-center disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300">
              <Spinner aria-label="Loading" className="fill-black" />
            </div>
          ) : (
            <button
              type="submit"
              disabled={
                credentialsData.email.length === 0 ||
                credentialsData.otp.length !== 4
              }
              className="disabled:opacity-20 rounded-md w-full px-4 py-2 bg-gradient-to-r from-brand-color to-button-color-2 text-slate-300"
            >
              Log In
            </button>
          )}
        </form>
      )}
      <Modal
        show={showCompanyList}
        onClose={() => {
          setShowCompanyList(false);
        }}
        size={"3xl"}
      >
        <Modal.Body className="bg-stone-900 rounded-md overflow-y-auto w-full h-full m-0 p-0">
          <CompanySelect
            companyList={companyList}
            setShowCompanyList={setShowCompanyList}
          ></CompanySelect>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CredentialsLogin;
