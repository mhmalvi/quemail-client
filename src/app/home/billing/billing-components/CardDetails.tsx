import { CardElement, Elements } from "@stripe/react-stripe-js";
import { Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import AddCardFormWrapper from "../AddCardForm";
import { Storage } from "@/store/store";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const CardDetails = () => {
  const [checkoutModal, setCheckoutModal] = useState<boolean>(false);
  const customerId = Storage.getItem("stripeCustomerID");

  useEffect(() => {});

  return (
    <div className="step-3 summary-element w-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Card Details
      </h1>
      <button
        onClick={() => {
          setCheckoutModal(true);
        }}
      >
        <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
          Create a card
        </h1>
      </button>
      <Table hoverable striped>
        <Table.Head className="w-full ">
          <Table.HeadCell className="w-1/3 sticky text-center ">
            Holder Name
          </Table.HeadCell>
          <Table.HeadCell className="w-1/3 sticky text-center ">
            Brand
          </Table.HeadCell>
          <Table.HeadCell className="w-1/3 sticky text-center ">
            Last 4 Digit
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y"></Table.Body>
      </Table>
      <Modal
        show={checkoutModal}
        dismissible
        onClose={() => {
          setCheckoutModal(false);
        }}
        size={"3xl"}
      >
        <Modal.Header>
          <h1 className="text-dark-black dark:text-slate-300">
            Enter your card details
          </h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full">
          <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
            Show card details
          </h1>
          <Elements stripe={stripePromise}>
            <AddCardFormWrapper customerId={customerId}></AddCardFormWrapper>
          </Elements>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardDetails;
