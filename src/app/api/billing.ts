
import { Storage } from "@/store/store";
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
export const getCardDetails = async () => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  const customerId = Storage.getItem("stripeCustomerID");
  try {
    const result = await fetch(
      `https://api.stripe.com/v1/customers/${customerId}/cards`,
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
export const createCard = async (stripeToken:string) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  const customerId = Storage.getItem("stripeCustomerID");

  const data = new URLSearchParams({ source: stripeToken });

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${customerId}/sources`,
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
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const deleteCard = async (cardId:any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  const customerId = Storage.getItem("stripeCustomerID");

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${customerId}/sources/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
export const updateDefaultCard = async (defaultCard:any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  const customerId = Storage.getItem("stripeCustomerID");

  const data = new URLSearchParams({ default_source: defaultCard });

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/customers/${customerId}`,
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
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
