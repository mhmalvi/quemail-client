import { Storage } from "@/store/store";
import { subscriptionDetails } from "@/app/api/billing";

const CardPlan = () => {
  const priceID = Storage.getItem("priceID");

  return (
    <div className="step-3 summary-element w-full bg-white dark:bg-light-glass backdrop-blur-xl dark:border-none border border-violet-200 rounded-md overflow-hidden p-4">
      <h1
        className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black"
        onClick={() => {
          console.log(priceID);
        }}
      >
        Card Plan
      </h1>
    </div>
  );
};

export default CardPlan;
