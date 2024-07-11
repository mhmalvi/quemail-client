"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Storage } from "@/store/store";

const Authenticate = () => {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const photo = searchParams.get("photo");
  const token = searchParams.get("token");
  const userID = searchParams.get("userID");
  const customerID = searchParams.get("customerID");

  if (token && userName && email && photo && userID && customerID) {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);
    Storage.setItem("userID", Number(userID));
    router.push("/home");
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
