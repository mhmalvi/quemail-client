import { OTPData } from "@/components/utils/types";

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

export const verifyOTP = async (data: OTPData) => {
  try {
    const result = await fetch(`https://backend.quemailer.com/api/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        otp: +data.otp,
      }),
    });
    if (result) {
      const responseData = await result.json();
      return responseData;
    } else {
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const signOut = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  try {
    const result = await fetch(`https://backend.quemailer.com/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: parsedToken,
      },
    });

    if (result) {
      const responseData = await result.json();
      return responseData;
    } else {
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};
