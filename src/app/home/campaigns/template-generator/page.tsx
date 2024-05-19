"use client";
import React, { useState } from "react";
import "./template.css";
import dynamic from "next/dynamic";
const TemplateGenerator = () => {
  const Editor = dynamic(() => import("./MainEditor"), {
    ssr: false,
  });

  return <Editor />;
};

export default TemplateGenerator;
