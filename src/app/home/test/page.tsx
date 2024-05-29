"use client";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState({ to: "", from: "", subject: "", text: "" });
  const handleSubmit = async () => {
    try {
      console.log(data);
      const result = await fetch(
        `https://backend.quemailer.com/google/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
          }),
        }
      );
      if (result) {
        const responseData = await result.json();
        return responseData;
      } else {
        return null;
      }
    } catch (error: any) {
      return error.response;
    }
  };
  return (
    <div className="h-screen w-full flex flex-col gap-8 items-center justify-center bg-dark-black">
      <div>
        <label>To:</label>
        <input
          className="text-black"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              to: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label>From:</label>
        <input
          className="text-black"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              from: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label>subject:</label>
        <input
          className="text-black"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              subject: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label>text:</label>
        <input
          className="text-black"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              text: e.target.value,
            }));
          }}
        />
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};
export default Test;
