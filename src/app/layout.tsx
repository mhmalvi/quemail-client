import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Landing/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Quemailer",
  description: "One stop email marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
