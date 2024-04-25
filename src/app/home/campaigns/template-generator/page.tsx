"use client";

import "./template.css";
const TemplateGenerator = () => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden rounded-md">
      <div className="flex items-center justify-end gap-4 ">
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Save Template
        </button>
        <button className="px-4 py-2 bg-brand-color rounded-md">
          Export HTML
        </button>
      </div>
      <div className="w-full h-full p-4"></div>
    </div>
  );
};

export default TemplateGenerator;
