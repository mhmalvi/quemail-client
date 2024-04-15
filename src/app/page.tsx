import Navbar from "@/components/Landing/Navbar";
import Landing from "./Landing";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background-color">
      <>
        <Navbar />
        <Landing />
        <Footer />
      </>
    </main>
  );
}
