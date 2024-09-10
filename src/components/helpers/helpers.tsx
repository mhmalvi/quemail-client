import React, { useMemo } from "react";
import { io } from "socket.io-client";

export const PaymentsDueChecker = () => {
    const socket = useMemo(() => io("https://backend.quemailer.com"), []);

    // Ensure the socket is connected only once at the start
    if (!socket.connected) {
        socket.connect();
    }

}