import React from "react";

type PackageCardProps = {
  packageName: string | null;
};

const PackageCard: React.FC<PackageCardProps> = ({ packageName }) => {
  const getBackgroundColor = (packageName: string | null): string => {
    switch (packageName) {
      case "Free":
        return "bg-gradient-to-r from-bronze-light to-bronze-dark";
      case "Starter":
        return "bg-gradient-to-r from-silver-light to-silver-dark";
      case "Growth":
        return "bg-gradient-to-r from-gold-light to-gold-dark";
      case "Professional":
        return "bg-gradient-to-r from-platinum-light to-platinum-dark";
      case "Enterprise":
        return "bg-gradient-to-r from-diamond-light to-diamond-dark";
      default:
        return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500";
    }
  };

  //bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 - enterprise
  //bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-40% to-emerald-500 to-90% - professional
  //bg-gradient-to-r from-pink-500 from-10% via-red-500 via-30% to-yellow-500 to-90% - growth
  //bg-gradient-to-r from-red-400 from-10% via-pink-500 via-30% to-purple-600 to-90% -
  //bg-gradient-to-r from-gray-300 from-10% via-gray-400 via-30% to-gray-600 to-90% - free

  return (
    <div
      className={`w-2/3 h-2/3 flex rounded justify-center items-center ${getBackgroundColor(
        packageName
      )}`}
    >
      <h1 className="flex text-base m-0 p-0 font-medium text-slate-200">
        {packageName}
      </h1>
    </div>
  );
};

export default PackageCard;
