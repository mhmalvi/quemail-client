import type { Metadata } from "next";
import {
  Montserrat,
  Roboto,
  Inter,
  Open_Sans,
  Nerko_One,
  Poppins,
} from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Quemailer",
  description: "One stop email marketing.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-dark-black`}>
        {children}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          transition={Slide}
          theme="dark"
        />
      </body>
    </html>
  );
}
