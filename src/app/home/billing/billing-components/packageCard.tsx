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
        return "bg-white";
    }
  };

  return (
    <div
      className={`w-2/3 h-2/3 flex rounded justify-center items-center ${getBackgroundColor(
        packageName
      )}`}
    >
      <h1 className="flex text-base m-0 p-0 font-medium text-slate-600">
        {packageName}
      </h1>
    </div>
  );
};

export default PackageCard;
