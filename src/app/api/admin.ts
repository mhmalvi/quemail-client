export const addUser = async (
  userName: string | null,
  email: string | null
) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-subadmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
          userName: userName,
          email: email,
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
