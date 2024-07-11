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
    // Listen for changes in card input
    // and display errors, if any, to the user
    // Also control the disabled state of the submit button
    // if the input field is empty
    setDisabled(event.empty);
    setError(event.error?.message ?? "");
  };

  const handleCheckoutFormSubmit = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    // Call the subscribe endpoint and create a Stripe subscription
    // object. Returns the subscription ID and client secret
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
    <form onSubmit={handleCheckoutFormSubmit} className="bg-orange-300">
      <CardElement onChange={handleCardInputChange} />
      <button disabled={!stripe || disabled} type="submit">
        Pay Now
      </button>
      {error && <div>{error}</div>}
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
