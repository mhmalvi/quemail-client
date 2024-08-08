import React from "react";

type PackageCardProps = {
  packageName: string | null;
  createdTime: Date | string | null;
  endTime: Date | string | null;
  packagePrice: number | string | null;
};

const PackageCard: React.FC<PackageCardProps> = ({
  packageName,
  createdTime,
  endTime,
  packagePrice,
}) => {
  const getBackgroundColor = (packageName: string | null): string => {
    switch (packageName) {
      case "Free":
        return "bg-gradient-to-r from-bronze-light to-bronze-dark";
      case "Starters":
        return "bg-gradient-to-r from-silver-light to-silver-dark";
      case "Growths":
        return "bg-gradient-to-r from-pink-500 from-10% via-red-500 via-30% to-yellow-500 to-90%";
      case "Professionals":
        return "bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-40% to-emerald-500 to-90%";
      case "Enterprises":
        return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-gray-300 from-10% via-gray-400 via-30% to-gray-600 to-90% ";
    }
  };

  //bg-gradient-to-r from-red-400 from-10% via-pink-500 via-30% to-purple-600 to-90% -
  //bg-gradient-to-r from-gray-300 from-10% via-gray-400 via-30% to-gray-600 to-90% - free

  return (
    <div
      className={`w-2/3 h-1/3 flex rounded-full border-4 justify-center items-center animate-glow`}
    >
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black text-center overflow-hidden">
        {packageName}
      </h1>
    </div>
  );
};

export default PackageCard;
