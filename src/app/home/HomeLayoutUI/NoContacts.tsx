"use client";
import Images from "@/components/utils/images";
import Image from "next/image";
import React from "react";

const NoContacts = () => {
  return (
    <div>
      {Images.NotAvailable && (
        <Image src={Images.NotAvailable} alt="not-available" />
      )}
    </div>
  );
};
export default NoContacts;
