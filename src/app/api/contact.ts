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

export const fetchContact = async () => {
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const data = {
    userID: userID,
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
