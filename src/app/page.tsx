import Navbar from "@/components/Landing/Navbar";
import Image from "next/image";
import Landing from "./Landing";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <>
        <Navbar />
        <Landing />
        <Footer />
      </>
    </main>
  );
}
