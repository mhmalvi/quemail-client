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

  if (token && typeof window !== "undefined") {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);

    redirect("/home");
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Welcome to Quemailer</h1>
      <h1>UserName: {userName}</h1>
      <h1>Email: {email}</h1>
      <h1>Photo: {photo}</h1>
      <h1>Token: {token}</h1>
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
