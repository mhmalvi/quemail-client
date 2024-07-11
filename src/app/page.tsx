"use client";
import Navbar from "@/components/Landing/Navbar";
import Landing from "./Landing/Landing";
import Footer from "@/components/Landing/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-dark-black">
        <div className="absolute w-full z-20">
          <Navbar />
        </div>
        <Landing />
        <Footer />
    </main>
  );
}
