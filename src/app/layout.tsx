import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Quemailer",
  description: "One stop email marketing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-dark-black`}>
        {children}
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          transition={Slide}
        />
      </body>
    </html>
  );
}
