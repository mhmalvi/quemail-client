"use client";
import Navbar from "@/components/Landing/Navbar";
import Landing from "./Landing/Landing";
import Footer from "@/components/Landing/Footer";
// import { useEffect } from "react";
import { googleLogin } from "./api/auth";

export default function Home() {
  
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
