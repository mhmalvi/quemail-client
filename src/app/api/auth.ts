import { OTPData } from "@/components/utils/types";

export const googleLogin = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return error.response;
  }
};

export const emailCheck = async (email: string) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/check-if-user-email-exists`,
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

export const verifyPassword = async (email: string, password: string) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/pass-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

export const subadminToCompany = async (userID: number) => {
  console.log("useID:", userID);

  const token = typeof window !== "undefined" && localStorage.getItem("satok");
  const parsedToken = token && JSON.parse(token);
  const subAdminID = typeof window !== "undefined" && localStorage.getItem("userID")
  console.log("subAdminID: ", subAdminID)
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subadminToCompany`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: parsedToken
        },
        body: JSON.stringify({
          userID: userID,
          said: subAdminID,
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          otp: +data.otp,
        }),
      }
    );
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
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
      }
    );

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
