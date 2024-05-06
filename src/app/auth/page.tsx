"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const Authenticate = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const photo = searchParams.get("photo");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Suspense fallback={null}>
        <h1>Welcome to Quemailer</h1>
        <h1>UserName: {userName}</h1>
        <h1>Email: {email}</h1>
        <h1>Id: {id}</h1>
        <h1>Photo: {photo}</h1>
      </Suspense>
    </div>
  );
};
export default Authenticate;
