"use client";

import { getCardDetails } from "@/app/api/billing";
import { CONTAINER_STYLES } from "@/components/styles/flex_container";
import React, { useEffect, useState } from "react";

const Billing = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await getCardDetails();
      if (res) {
        setState(res);
        console.log(res);
      }
    })();
  },[]);
  return <div className={CONTAINER_STYLES}></div>;
};

export default Billing;
