"use client";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import { contactUs } from "../api/contact-us";
import {
  successNotification,
  warningNotification,
} from "@/components/utils/utility";

const Contact = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const handleContactUs = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email && name && subject && description) {
      var response = await contactUs(email, name, subject, description);
      response = await response.json();

      if (response && response.status === 201) {
        successNotification(response.message);
        setEmail("");
        setName("");
        setSubject("");
        setDescription("");
      } else {
        warningNotification(response.message);
      }
    } else {
      warningNotification("Please fill out the form");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-background-color">
      <Navbar />
      <div className="flex flex-col gap-8 lg:mt-32 mt-24 w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-normal text-slate-300">Contact Us</h1>
            <h1 className="md:flex hidden text-base font-normal text-slate-300">
              Contact with us to know more about Quemailer. Do send email to
              reach us.
            </h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-md">
            Create Account
          </button>
        </div>
        <div className="h-full flex lg:flex-row flex-col justify-between items-center lg:px-16 lg:py-8 p-4 gap-8 bg-dark-glass rounded-md">
          <Image src={Images.Contact} alt="Contact" className="" />
          <div className="h-full lg:w-1/2 bg-dark-glass rounded-md flex flex-col p-8 gap-4">
            <div className="">
              <h1 className="m-0 p-0 text-2xl">Get in Touch</h1>
              <p className="m-0 p-0 text-slate-400">
                Explore our help docs or contact our team.
              </p>
            </div>
            <form onSubmit={handleContactUs} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-transparent border border-slate-400 rounded-md p-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Your Email Address</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-transparent border border-slate-400 rounded-md p-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="I have a query..."
                  className="bg-transparent border border-slate-400 rounded-md p-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">How can we help you?</label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="bg-transparent border border-slate-400 rounded-md p-4"
                />
              </div>
              <button className="w-1/3 p-4 bg-gradient-to-r from-brand-color to-button-color-2 rounded-md">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
