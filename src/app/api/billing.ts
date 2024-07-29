import { billingStore, Storage } from "@/store/store";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";
import { subscriptionProps } from "@/components/utils/types";

export const subscription = async (
  stripeCustomerID: string,
  priceID: string,
  paymentSourceID: string
) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Storage.getItem("token"),
        },
        body: JSON.stringify({
          stripeCustomerID: stripeCustomerID,
          priceID: priceID,
          userID: Storage.getItem("userID"),
          amount: billingStore.getState().amount,
          paymentSourceID: paymentSourceID,
        }),
      }
    );
    if (result) {
      const response = await result.json();
      successNotification("Subscription Started!");
      return response.id;
    } else {
      return null;
    }
  } catch (error: any) {
    warningNotification("Something went wrong. Please try again!");
    return error.response;
  }
};

export const stripeSubscriptionInfo = async () => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();
  if (res.message !== "success") {
    throw new Error(res.message);
  }
  try {
    const result = await fetch(
      `https://api.stripe.com/v1/products/${res.productID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + secretKey,
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

export const stripeINFO = async () => {
  const userID = Storage.getItem("userID");
  try {
    const result = await fetch(`https://backend.quemailer.com/api/getID`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Storage.getItem("token"),
      },
      body: JSON.stringify({
        userID: userID,
      }),
    });
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

export const subscriptionDetails = async () => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();
  if (res.message !== "success") {
    throw new Error(res.message);
  }
  const subscriptionId = res.subscriptionID;
  try {
    const result = await fetch(
      `https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + secretKey,
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

export const fetchProducts = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe-products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      const response = await result.json();
      return response.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error.response;
  }
};
export const fetchPriceId = async (priceId: number) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe-price-by-product-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceID: priceId,
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

export const getAllCardList = async () => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();
  if (res) {
    try {
      const result = await fetch(
        `https://api.stripe.com/v1/customers/${res.stripeCustomerID}/cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + secretKey,
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
  }
};

//need to update createCard function
export const createCard = async (stripeToken: string, name: string) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();

  const data = new URLSearchParams({ source: stripeToken });

  if (res.message !== "success") {
    throw new Error(res.message);
  }
  try {
    //get all card information
    const response2 = await getAllCardList();
    const result2 = response2;
    //create the card
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${res.stripeCustomerID}/sources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${secretKey}`,
        },
        body: data.toString(),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return result;
    }

    const cardId = result.id;

    const data1 = new URLSearchParams({ name: name });

    //update the card with name
    const response1 = await fetch(
      `https://api.stripe.com/v1/customers/${res.stripeCustomerID}/sources/${cardId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${secretKey}`,
        },
        body: data1.toString(),
      }
    );

    const result1 = await response1.json();

    if (!response1.ok) {
      return result1;
    }

    if (Array.isArray(result2.data)) {
      result2.data.some((card: any) => {
        if (result1.fingerprint === card.fingerprint) {
          deleteCard(result1.id);
          throw new Error("duplicate");
        }
        return false;
      });
    } else {
      console.log("result2.data is not an array");
    }
    return result1;
  } catch (error) {
    return error;
  }
};

export const deleteCard = async (cardId: any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();

  if (res.message !== "success") {
    throw new Error(res.message);
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${res.stripeCustomerID}/sources/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    if (!response.ok) {
      warningNotification("Network response was not ok!");
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    warningNotification("Something went wrong!");
    return error;
  }
};

export const updateDefaultCard = async (defaultCard: any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const res = await stripeINFO();

  // if (res.message !== "success") {
  //   throw new Error(res.message);
  // }

  const data = new URLSearchParams({ default_source: defaultCard });

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${res.stripeCustomerID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${secretKey}`,
        },
        body: data.toString(),
      }
    );

    if (!response.ok) {
      warningNotification("Network problem while updating default card!");
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    successNotification("Default Card updated successfully!");
    return result;
  } catch (error) {
    return error;
  }
};
