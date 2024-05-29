"use client";
import React, { useEffect, useState } from "react";

function Test() {
  const [token, setToken] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const sendEmail = async (e: any) => {
    e.preventDefault();

    if (!token) {
      alert("You must authenticate first.");
      return;
    }

    try {
      const response = await fetch(
        "https://backend.quemailer.com/api/auth/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            to,
            subject,
            text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert(`Email sent: ${data}`);
    } catch (error) {
      console.error("Error sending email", error);
      alert("Failed to send email");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Send Email with Gmail API</h1>
        {token ? (
          <form onSubmit={sendEmail}>
            <div>
              <label>To:</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Email</button>
          </form>
        ) : (
          <a href="https://backend.quemailer.com/api/auth/user">
            Authenticate with Google
          </a>
        )}
      </header>
    </div>
  );
}

export default Test;
