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
          userID: Number(userID),
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

export const fetchSubAdminList = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company-subadmins`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
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

export const deleteSubAdmin = async (subadminID: number) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subadmin-remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
          subadminID: subadminID,
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

export const fetchAccountAcess = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
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

export const logoutSubAdmin = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("satok");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subadmin-logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          said: Number(userID),
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
