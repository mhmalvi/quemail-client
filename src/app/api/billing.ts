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
