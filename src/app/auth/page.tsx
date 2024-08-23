"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Storage } from "@/store/store";
import { motion } from "framer-motion";

const Authenticate = () => {
  const router = useRouter();
  const [isMoved, setIsMoved] = useState(false);

  // Animations
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const curtainVariants = {
    hidden: { y: 0 },
    moved: {
      y: "-100vh", // Move up to hide the screen
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const photo = searchParams.get("photo");
  const token = searchParams.get("token");
  const userID = searchParams.get("userID");
  const first_user = searchParams.get("first_user");

  if (token && userName && email && photo && userID && first_user) {
    Storage.setItem("userName", userName);
    Storage.setItem("email", email);
    Storage.setItem("photo", photo);
    Storage.setItem("token", token);
    Storage.setItem("userID", Number(userID));
    Storage.setItem("first_user", Number(first_user));
  }

  useEffect(() => {
    if (isMoved) {
      router.push("/home");
    }
  }, [isMoved, router]);

  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center"
      initial="hidden"
      animate={isMoved ? "moved" : "visible"}
      variants={curtainVariants}
      onAnimationComplete={() => setIsMoved(true)}
    >
      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setIsMoved(true)}
      >
        Welcome to Quemailer
      </motion.h1>
    </motion.div>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={null}>
      <Authenticate />
    </Suspense>
  );
};

export default AuthPage;
