export const addMailInfo = async (
  email: string | null,
  appPassword: string | null,
  provider: string | null
) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const data = {
    email: email,
    appPassword: appPassword,
    userID: userID && +userID,
    provider: provider,
  };
  try {
    console.log(data);
    const result = await fetch(
      `https://backend.quemailer.com/api/app-password-save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify(data),
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
