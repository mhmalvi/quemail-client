import { Checkbox, Modal, Spinner, Table, Tooltip } from "flowbite-react";
import { Key, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Storage, checkout } from "@/store/store";
import { getAllCardList } from "@/app/api/billing";
import { TbCircleCheck } from "react-icons/tb";
import { Card } from "@/components/utils/types";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

const CardDetailsCheckout = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const setIndex = checkout((state: any) => state.setIndex);
  const selectedIndex = checkout((state: any) => state.index);
  const setCardID = checkout((state: any) => state.setCardID);

  const fetchAllCards = async () => {
    const res = await getAllCardList();
    if (res) {
      setAllCards(res.data);
      setTableLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    setTableLoading(true);
    fetchAllCards();
  }, []);

  const handleSelectedCard = (index: Key, id: string) => {
    setIndex(index);
    setCardID(id);
  };

  return (
    <div className="bg-white step-3 summary-element w-full dark:bg-light-glass backdrop-blur-xl dark:border-none overflow-hidden flex flex-col">
      {tableLoading ? (
        <div className="flex w-full h-80 justify-center items-center">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="xl"
          />
        </div>
      ) : allCards.length === 0 ? (
        <div className="flex w-full h-full border rounded border-violet-200 justify-center items-center">
          <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
            No Card Added
          </h1>
        </div>
      ) : (
        <div className="w-full h-full overflow-auto">
          <Table hoverable striped>
            <Table.Head className="w-full">
              <Table.HeadCell className="w-1/3 sticky text-center">
                Selected
              </Table.HeadCell>
              <Table.HeadCell className="w-1/3 sticky text-center">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="w-1/3 sticky text-center">
                Brand
              </Table.HeadCell>
              <Table.HeadCell className="w-1/3 sticky text-center">
                Digit
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {allCards.map((items: Card, index: Key) => (
                <Table.Row
                  key={index}
                  className={`w-full dark:bg-transparent cursor-pointer}`}
                  onClick={() => handleSelectedCard(index, items.id)}
                >
                  <Table.Cell className="w-1/5 text-center">
                    <input
                      type="checkbox"
                      readOnly
                      className="rounded-md bg-transparent checked:bg-brand-color dark:checked:bg-brand-color outline-none focus:ring-0"
                      checked={selectedIndex == index}
                    />
                  </Table.Cell>
                  <Table.Cell className="w-full flex items-center justify-center text-gray-900 dark:text-white">
                    <Tooltip
                      content={
                        index === 0 ? items.name + ": Default" : items.name
                      }
                      className="bg-brand-color text-center"
                      placement="bottom"
                    >
                      <div className="flex flex-row items-center gap-2">
                        {items.name && items.name.length > 5
                          ? `${items.name.slice(0, 4)}...`
                          : items.name}
                        {index === 0 ? (
                          <TbCircleCheck className="text-green-500"></TbCircleCheck>
                        ) : (
                          ""
                        )}
                      </div>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell className="w-1/5 text-center">
                    {items.brand}
                  </Table.Cell>
                  <Table.Cell className="w-1/5 text-center">
                    {items.last4}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CardDetailsCheckout;
