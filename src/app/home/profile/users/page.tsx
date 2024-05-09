"use client"
import React from "react";

const Users = () => {
  return (
    <div className="relative w-full h-full bg-gray-800/80 rounded-md p-4 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="m-0 p-0 text-slate-300">Users in this account</h1>
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Add a new user
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-4">
          <button className="px-2 py-1 bg-brand-color rounded-md">Edit</button>
          <button className="px-2 py-1 border border-brand-color rounded-md">Cancel Access</button>
        </div>
      </div>
    </div>
  );
};
export default Users;
