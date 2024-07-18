import { Storage } from "@/store/store";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";

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
//   const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
//   const customerId = Storage.getItem("stripeCustomerID");
//   try {
//     const result = await fetch(
//       `https://api.stripe.com/v1/customers/${customerId}/cards`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Bearer " + secretKey,
//         },
//       }
//     );
//     if (result) {
//       const responseData = await result.json();
//       return responseData;
//     } else {
//       return null;
//     }
//   } catch (error: any) {
//     return error.response;
//   }
// };

export const getAllCardList = async () => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
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


//need to update createCard function
export const createCard = async (stripeToken: string, name: string) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const customerId = Storage.getItem("stripeCustomerID");

  const data = new URLSearchParams({ source: stripeToken });

  try {
    //get all card information
    const response2 = await getAllCardList();
    console.log(response2)

    const result2 = response2;

    //create the card
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
      throw new Error("Network response was not ok");
    }
    const result = await response.json();

    const cardId = result.id;

    const data1 = new URLSearchParams({ name: name });

    //update the card with name
    const response1 = await fetch(
      `https://api.stripe.com/v1/customers/${customerId}/sources/${cardId}`,
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

    if (Array.isArray(result2.data)) {
      result2.data.some((card: any) => {
        if (result1.fingerprint === card.fingerprint) {
          deleteCard(result1.id);
          warningNotification("This Card already exists!")
          console.log("duplicate card detected");
          throw new Error("Network response was not ok");
        }
        return false;
      });
    } else {
      console.log("result2.data is not an array");
    }
    successNotification("Card added successfully!")
    return result1;
  } catch (error) {
    return error;
  }
};

export const deleteCard = async (cardId: any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
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
      warningNotification("Network response was not ok!")
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    successNotification("Deleted Card successfully!")
    return result;
  } catch (error) {
    warningNotification("Something went wrong!")
    return error;
  }
};

export const updateDefaultCard = async (defaultCard: any) => {
  const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
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
