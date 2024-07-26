"use client";

import { useState, ChangeEvent } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { Storage, billingStore, checkout } from "@/store/store";
import CardDetailsCheckout from "./billing-components/CardDetailsCheckout";
import { subscription } from "@/app/api/billing";
import { Spinner } from "flowbite-react";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface CheckoutFormProps {
  //funny moments
  customerId: string;
  priceId: string;
}

const CheckoutForm = (props: CheckoutFormProps): JSX.Element => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const cardID = checkout((state: any) => state.cardID);
  const index = checkout((state: any) => state.index);

  const handleCheckoutFormSubmit = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const subscriptionResponse = await subscription(
      props.customerId,
      props.priceId,
      cardID
    );
    console.log(subscriptionResponse);
    if (subscriptionResponse) {
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleCheckoutFormSubmit}
      className="w-full flex flex-col gap-4 items-center"
    >
      <CardDetailsCheckout />
      {loading ? (
        <Spinner color="purple" aria-label="Purple spinner example" size="xl" />
      ) : (
        <button
          disabled={!stripe || disabled}
          type="submit"
          className="w-1/4 bg-brand-color p-2 rounded-md disabled:cursor-not-allowed disabled:bg-brand-color/20"
        >
          Pay Now
        </button>
      )}
      {error && <div className="text-red-500 font-semibold ">{error}</div>}
    </form>
  );
};

const CheckoutFormWrapper = (props: CheckoutFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm customerId={props.customerId} priceId={props.priceId} />
    </Elements>
  );
};

export default CheckoutFormWrapper;
