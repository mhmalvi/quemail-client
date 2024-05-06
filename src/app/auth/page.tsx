"use client";
import React from "react";
function extractParamsFromCurrentURL(): Map<string, string> {
  if (window) {
    const searchParams = new URLSearchParams(window.location.search);
    const params = new Map<string, string>();

    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
  }
  return params;
}

const params = extractParamsFromCurrentURL();

console.log(params.get("param1"));
console.log(params.get("param2"));

const Authenticate = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1>Welcome to Quemailer</h1>
    </div>
  );
};
export default Authenticate;
