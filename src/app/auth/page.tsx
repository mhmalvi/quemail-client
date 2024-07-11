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
  const subscription = searchParams.get("subscription");
  const stripeCustomerID = searchParams.get("stripeCustomerID");
  const first_user = searchParams.get("first_user");

  if (
    token &&
    userName &&
    email &&
    photo &&
    userID &&
    first_user &&
    stripeCustomerID &&
    subscription
  ) {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);
    Storage.setItem("userID", Number(userID));
    Storage.setItem("subscription", subscription);
    Storage.setItem("stripeCustomerID", stripeCustomerID);
    Storage.setItem("first_user", Number(first_user));
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
