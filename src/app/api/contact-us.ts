import { billingStore, Storage } from "@/store/store";

export const contactUs = async (
  email: string,
  name: string,
  subject: string,
  description: string
) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-contactus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          subject: subject,
          description: description,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchContactUs = async (page: number, per_page: number) => {
  try {
    const userID = Storage.getItem("userID");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-contactus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Storage.getItem("token"),
        },
        body: JSON.stringify({
          userID: userID,
          page: page,
          per_page: per_page,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteContactMail = async (id: number) => {
  try {
    const userID = Storage.getItem("userID");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/destroy-contactus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Storage.getItem("token"),
        },
        body: JSON.stringify({
          userID: userID,
          id: id,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchAllUser = async (
  page: number,
  per_page: number
) => {
  try {
    const userID = Storage.getItem("userID");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Storage.getItem("token"),
        },
        body: JSON.stringify({
          userID: userID,
          page: page,
          per_page: per_page,
        }),
      }
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};
