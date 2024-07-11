"use client";

import { useState, ChangeEvent } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface CheckoutFormProps {
  customerId: string;
  priceId: string;
}

const CheckoutForm = (props: CheckoutFormProps): JSX.Element => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardInputChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error?.message ?? "");
  };

  const handleCheckoutFormSubmit = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const subscriptionResponse = await fetch("/api/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: props.customerId,
        priceId: props.priceId,
      }),
    });
    const subscription = await subscriptionResponse.json();
    const stripePayload = await stripe.confirmCardPayment(
      subscription.clientSecret, // returned by subscribe endpoint
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (stripePayload.error) {
      setError(stripePayload.error.message);
    }
  };

  return (
    <form onSubmit={handleCheckoutFormSubmit} className="w-full flex flex-col gap-4 items-center">
      <CardElement onChange={handleCardInputChange} className="p-4 bg-violet-200 rounded-md w-full"/>
      <button disabled={!stripe || disabled } type="submit" className="w-1/4 bg-brand-color p-2 rounded-md disabled:cursor-not-allowed disabled:bg-brand-color/20">
        Pay Now
      </button>
      {error && <div className="text-red-500 font-semibold ">{error}</div>}
    </form>
  );
};

export default function CheckoutFormWrapper(props: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm customerId={props.customerId} priceId={props.priceId} />
    </Elements>
  );
}
