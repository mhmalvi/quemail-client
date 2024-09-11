import React, { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

interface PaymentsDueEmitProps {
  searchKeyword: string | null;
  currentPage: number | null;
}

export const PaymentsDueChecker: React.FC<PaymentsDueEmitProps> = ({ searchKeyword, currentPage }) => {
  const userID = typeof window !== "undefined" && localStorage.getItem("userID");

  const socket = useMemo(() => io("https://backend.quemailer.com"), []);

  useEffect(() => {
    // Ensure the socket is connected only once when the component mounts
    if (!socket.connected) {
      socket.connect();
    }

    const handleSearch = () => {
      socket.emit("contacts", {
        keyword: searchKeyword || "", // Use an empty string if searchKeyword is undefined
        userID: userID || "",
        page: currentPage,
        per_page: 8,
      });
    };

    // Trigger the search after socket connection
    handleSearch();

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, searchKeyword, currentPage, userID]);

  return null; // If this is just for functionality and there's no UI
};
