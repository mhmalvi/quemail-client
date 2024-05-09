"use client";
import React, { Suspense, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { Storage } from "@/store/store";

const Authenticate = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const photo = searchParams.get("photo");
  const token = searchParams.get("token");
  const userID = searchParams.get("userID");

  if (token && typeof window !== "undefined") {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);
    Storage.setItem("userID", userID);
    setTimeout(() => {
      redirect("/home");
    }, 2000);
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Welcome to Quemailer</h1>
    </div>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={null}>
      <Authenticate />
    </Suspense>
  );
};
export default AuthPage;
