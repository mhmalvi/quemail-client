import { EditContactData } from "@/components/utils/types";

export const importContact = async (data: {}) => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/contact-save/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      console.error("Error:", result.statusText);
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const fetchContact = async (page: number) => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const data = {
    userID: userID,
    page: page,
    per_page: 8,
  };
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/contact-fetch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      console.error("Error:", result.statusText);
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const updateContact = async (data: EditContactData) => {
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/contact-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      console.error("Error:", result.statusText);
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const destroyContact = async (data: number) => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/contact-destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data,
          user_id: userID,
        }),
      }
    );
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      console.error("Error:", result.statusText);
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};

export const fetchGroup = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/group-fetch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          user_id: userID,
        }),
      }
    );
    if (result.ok) {
      const responseData = await result.json();
      return responseData;
    } else {
      console.error("Error:", result.statusText);
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};
