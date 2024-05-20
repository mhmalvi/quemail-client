export const saveTemplate = async (data: Object) => {
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/template-save`,
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
export const fetchTemplate = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  try {
    const result = await fetch(
      `https://backend.quemailer.com/api/template-fetch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          client_id: userID,
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
