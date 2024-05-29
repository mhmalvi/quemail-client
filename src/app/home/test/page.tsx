"use client";
import { successNotification, warningNotification } from "@/components/utils/utility";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState({ to: "", from: "", subject: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      console.log(data);
      const result = await fetch(`https://backend.quemailer.com/google/send-email`, {
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
      });
      if (result.ok) {
        const responseData = await result.json();
        successNotification("Email sent successfully!");
        return responseData;
      } else {
        const errorData = await result.json();
        warningNotification(`Error: ${errorData.message}`);
        return null;
      }
    } catch (error:any) {
      warningNotification(`Error: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-8 items-center justify-center bg-dark-black">
      <div>
        <label>To:</label>
        <input
          className="text-black"
          value={data.to}
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
          value={data.from}
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              from: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          className="text-black"
          value={data.subject}
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              subject: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label>Text:</label>
        <textarea
          className="text-black"
          value={data.text}
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              text: e.target.value,
            }));
          }}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </div>
  );
};

export default Test;
