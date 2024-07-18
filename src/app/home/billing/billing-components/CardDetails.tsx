import { Elements } from "@stripe/react-stripe-js";
import { Modal, Table, Tooltip } from "flowbite-react";
import { Key, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import AddCardFormWrapper from "../AddCardForm";
import { Storage } from "@/store/store";
import { getAllCardList, deleteCard } from "@/app/api/billing";
import { TbEdit, TbTrash, TbCreditCard, TbCirclePlus } from "react-icons/tb";
import { Card, DeleteCardModalProps } from "@/components/utils/types";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const renderDeleteCardModal = ({
  show,
  onClose,
  name,
  brand,
  digit,
  id,
  onDeleteSuccess
}: DeleteCardModalProps & { onDeleteSuccess: () => void }) => (
  <Modal show={show} onClose={onClose} size={"3xl"}>
    <Modal.Header>
      <h1 className="text-dark-black dark:text-slate-300">Delete Card?</h1>
    </Modal.Header>
    <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full flex flex-col gap-4">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Show card details
      </h1>
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Name : {name}
      </h1>
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Brand : {brand}
      </h1>
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Last 4 Digit : {digit}
      </h1>
      <hr className="border-dark-black dark:border-violet-200" />
      <h1 className="text-base m-0 p-0 dark:text-white text-dark-black flex justify-center gap-4">
        <button
          className="w-1/8 h-full flex flex-col 2xl:p-2 py-1 px-2 rounded-md 2xl:text-sm text-xs bg-violet-500 text-dark-black dark:text-white hover:text-white border border-slate-300 hover:bg-red-500 bg-transparent duration-100 ease-in-out"
          onClick={() => {
            deleteCard(id).then(() => {
              onDeleteSuccess();
              onClose();
            });
          }}
        >
          Delete card
        </button>
      </h1>
    </Modal.Body>
  </Modal>
);

const CardDetails = () => {
  const [addCardModal, setAddCardModal] = useState<boolean>(false);
  const [deleteCardModal, setDeleteCardModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const customerId = Storage.getItem("stripeCustomerID");
  const [allCards, setAllCards] = useState<Card[]>([]);

  const fetchAllCards = async () => {
    const res = await getAllCardList();
    if (res) {
      setAllCards(res.data);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  const handleDeleteSuccess = () => {
    setAllCards((prevCards) => prevCards.filter((card) => card.id !== selectedCard?.id));
  };

  return (
    <div className="bg-white step-3 summary-element w-full dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4 flex flex-col gap-2">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center">
        Card Details
      </h1>
      <h1 className="text-base m-0 p-0 dark:text-white text-dark-black flex justify-end gap-4">
        <button
          className="w-1/8 h-full flex flex-col justify-center 2xl:p-2 py-1 px-2 rounded-md 2xl:text-sm text-xs text-dark-black dark:text-white hover:text-white border border-slate-300 hover:bg-violet-500 bg-transparent duration-100 ease-in-out"
          onClick={() => {
            setAddCardModal(true);
          }}
        >
          <span className="flex flex-row justify-center items-center gap-2 font-medium text-black-200">
            add card <TbCirclePlus />
          </span>
        </button>
      </h1>
      <div className="w-full h-full overflow-auto border rounded border-violet-200">
        <Table hoverable striped>
          <Table.Head className="w-full">
            <Table.HeadCell className="w-1/3 sticky text-center">Holder Name</Table.HeadCell>
            <Table.HeadCell className="w-1/3 sticky text-center">Brand</Table.HeadCell>
            <Table.HeadCell className="w-1/3 sticky text-center">Last 4 Digit</Table.HeadCell>
            <Table.HeadCell className="w-1/3 sticky text-center">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allCards.map((items: Card, index: Key) => (
              <Table.Row
                key={index}
                className="w-full dark:border-gray-700 dark:bg-transparent cursor-pointer"
              >
                <Table.Cell className="w-full flex items-center justify-center text-gray-900 dark:text-white">
                  <Tooltip content={items.name} className="bg-brand-color text-center" placement="bottom">
                    {items.name && items.name.length > 5 ? `${items.name.slice(0, 5)}...` : items.name}
                  </Tooltip>
                </Table.Cell>
                <Table.Cell className="w-1/5 text-center">{items.brand}</Table.Cell>
                <Table.Cell className="w-1/5 text-center">{items.last4}</Table.Cell>
                <Table.Cell className="w-1/5 text-center">
                  <div className="flex justify-center gap-2">
                    <Tooltip content="update card" className="bg-brand-color text-center" placement="bottom">
                      <button className="border rounded-full border-violet-500 hover:text-violet-500">
                        <TbEdit className="m-1" />
                      </button>
                    </Tooltip>
                    <Tooltip content="make default" className="bg-brand-color text-center" placement="bottom">
                      <button className="border rounded-full border-green-500 hover:text-green-500">
                        <TbCreditCard className="m-1 transition-fill duration-200 ease-in-out" />
                      </button>
                    </Tooltip>
                    <Tooltip content="delete card" className="bg-brand-color text-center" placement="bottom">
                      <button
                        className="border rounded-full border-red-500 hover:text-red-500"
                        onClick={() => {
                          setSelectedCard(items);
                          setDeleteCardModal(true);
                        }}
                      >
                        <TbTrash className="m-1 transition-fill duration-200 ease-in-out" />
                      </button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Modal
        show={addCardModal}
        dismissible
        onClose={() => {
          setAddCardModal(false);
        }}
        size={"3xl"}
      >
        <Modal.Header>
          <h1 className="text-dark-black dark:text-slate-300">Enter your card details</h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 text-slate-300 overflow-y-auto h-full">
          <Elements stripe={stripePromise}>
            <AddCardFormWrapper customerId={customerId} />
          </Elements>
        </Modal.Body>
      </Modal>
      {selectedCard &&
        renderDeleteCardModal({
          show: deleteCardModal,
          onClose: () => setDeleteCardModal(false),
          name: selectedCard.name,
          brand: selectedCard.brand,
          digit: selectedCard.last4,
          id: selectedCard.id,
          onDeleteSuccess: handleDeleteSuccess
        })}
    </div>
  );
};

export default CardDetails;
