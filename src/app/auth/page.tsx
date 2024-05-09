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
  const userIDString = searchParams.get("userID");

  const userID = userIDString ? parseInt(userIDString, 10) : null;

  if (token && userName && email && photo && userID) {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);
    Storage.setItem("userID", +userID);
    redirect("/home");
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
