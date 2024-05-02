import { googleLoginData } from "@/components/utils/types";
// import { FormEvent } from "react";

export const googleLogin = async () => {
  try {
    const result = await fetch(`https://backend.quemailer.com/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return error.response;
  }
};

export const emailCheck = async (email: string) => {
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/check-if-user-email-exists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

