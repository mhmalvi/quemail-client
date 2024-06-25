import { NewCampaignType } from "@/components/utils/types";

export const addMailInfo = async (
  email: string | null,
  appPassword: string | null,
  provider: string | null
) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userIDString =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const userID = userIDString ? parseInt(userIDString, 10) : null;
  const data = {
    email: email,
    appPassword: appPassword,
    userID: userID,
    provider: provider,
  };
  try {
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

export const fetchAddedMail = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userIDString =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const userID = userIDString ? parseInt(userIDString, 10) : null;
  console.log("userID: ", userID);
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/app-password-fetch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: parsedToken,
        },
        body: JSON.stringify({
          userID: userID
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

export const updateMailInfo = async (
  email: string | null,
  appPassword: string | null,
  id: number | null
) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userIDString =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const userID = userIDString ? parseInt(userIDString, 10) : null;
  const data = {
    email: email,
    appPassword: appPassword,
    userID: userID,
    id: id,
  };
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/app-password-update`,
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

export const destroyMail = async (id: number | null) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userIDString =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const userID = userIDString ? parseInt(userIDString, 10) : null;
  const data = {
    userID: userID,
    id: id,
  };
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/app-password-destroy`,
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

export const sendMail = async (data: NewCampaignType) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const userIDString =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const userID = userIDString ? parseInt(userIDString, 10) : null;

  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/campaign-create`,
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
export const fetchCampaign = async (data: {}) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);

  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/campaign-fetch`,
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
export const fetchCampaignItems = async (data: {}) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);

  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/campaignwise-mail-fetch`,
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
