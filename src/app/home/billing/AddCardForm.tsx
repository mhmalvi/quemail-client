"use client";

import { useState, ChangeEvent } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { createCard, getAllCardList } from "@/app/api/billing";
import { Spinner } from "flowbite-react";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface AddCardFormProps {
  customerId: string;
}

const CheckoutForm = (props: AddCardFormProps): JSX.Element => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardInputChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error?.message ?? "");
  };

  const handleCardHolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardHolderName(event.target.value);
  };

  const handleAddCardFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      return;
    }

    setLoading(true);
    setError(undefined);

    const { token, error: stripeError } = await stripe.createToken(cardElement);

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Failed to create token.");
      setLoading(false);
      return;
    }

    try {
      const result = await createCard(token.id, cardHolderName);

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log("Card added successfully:", result);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleAddCardFormSubmit}
      className="w-full flex flex-col gap-4 items-center"
    >
      <CardElement
        onChange={handleCardInputChange}
        className="p-4 bg-white rounded-md w-full"
      />
      <input
        value={cardHolderName}
        onChange={handleCardHolderNameChange}
        placeholder="Enter Card Holder Name"
        className="p-4 bg-white rounded-md w-full text-dark-black"
      />
      {loading ? (
        <Spinner color="purple" aria-label="Purple spinner example" size="xl" />
      ) : (
        <button
          disabled={!stripe || disabled}
          type="submit"
          className="w-1/4 bg-brand-color p-2 rounded-md disabled:cursor-not-allowed disabled:bg-brand-color/20"
        >
          ADD CARD
        </button>
      )}
      {error && <div className="text-red-500 font-semibold ">{error}</div>}
    </form>
  );
};

const AddCardFormWrapper = (props: AddCardFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm customerId={props.customerId} />
    </Elements>
  );
};

export default AddCardFormWrapper;
