import Images from "@/components/utils/images";
import Image from "next/image";
import React from "react";

const NoContact = () => {
  return (
    <div>
      <Image src={Images.NotAvailable} alt="not-available" />
    </div>
  );
};
export default NoContact;
