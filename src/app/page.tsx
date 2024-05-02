"use client";
import Navbar from "@/components/Landing/Navbar";
import Landing from "./Landing/Landing";
import Footer from "@/components/Landing/Footer";
// import { useEffect } from "react";
import { googleLogin } from "./api/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const res = await googleLogin();
      console.log(res);
    })();
  });
  return (
    <main className="flex min-h-screen flex-col items-center bg-dark-bg">
      <>
        <Navbar />
        <Landing />
        <Footer />
      </>
    </main>
  );
}
