import { EditContactData } from "@/components/utils/types";

export const fetchGroups = async (page: number, per_page: number | null) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const data = {
    userID: userID,
    page: page,
    per_page: per_page,
  };
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-fetch-page`,
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

export const destroyContact = async (data: string[]) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
          groups: data,
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

export const fetchGroupList = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-fetch`,
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

export const fetchGroupItems = async (data: string | null, page: number) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-fetch-by-group`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID,
          group: data,
          page: page,
          per_page: 8,
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
