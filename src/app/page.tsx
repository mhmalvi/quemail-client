"use client";
import Navbar from "@/components/Landing/Navbar";
import Landing from "./Landing/Landing";
import Footer from "@/components/Landing/Footer";
// import { useEffect } from "react";
import { googleLogin } from "./api/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>();
  // const getUser = async () => {
  //   try {
  //     const url = `https://backend.quemailer.com/google/success`;
  //     const { data }: any = await fetch(url, {
  //       method: "GET",
  //     });
  //     setUser(data);
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  //   console.log("ok");
  // });

  console.log(user);
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
