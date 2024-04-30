"use client";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";

const AboutUs = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background-color ">
      <>
        <Navbar />
        <div className="flex flex-col gap-8 lg:mt-32 mt-24 w-full 2xl:px-72 xl:px-64 lg:px-36 md:px-8 px-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-slate-300">About Us</h1>
              <h1 className="md:flex hidden text-base font-normal text-slate-300">
                Engage with Quemailer&apos;s community to grow your business
                according to the statistics.
              </h1>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-md">
              Create Account
            </button>
          </div>
          {/* Section 1 */}
          <div className="flex flex-col items-center text-center lg:px-16 lg:py-8 p-4 gap-4 bg-dark-glass backdrop-blur-2xl  rounded-md">
            <h1 className="m-0 p-0 text-3xl">Welcome to</h1>
            <h1 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 text-6xl lg:w-1/3">
              Quemailer
            </h1>
            <p className="m-0 p-0 text-slate-300 lg:text-center text-justify">
              Where we redefine the way you manage relationships and empower
              your business with cutting-edge CRM solutions. At Queleads CRM, we
              understand the pivotal role relationships play in the success of
              any enterprise. Our mission is to provide you with a comprehensive
              Customer Relationship Management (CRM) software that not only
              streamlines your processes but also cultivates lasting connections
              with your clients.
            </p>
          </div>
          {/* Section 2 */}
          <div className="flex flex-col lg:px-16 lg:py-8 p-4 gap-8 bg-dark-glass backdrop-blur-2xl rounded-md gap-8">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
              <div className="flex flex-col lg:w-1/2 gap-4">
                <div className="lg:w-1/4">
                  <h1 className=" text-2xl">Our Mission</h1>
                  <div className="w-full h-1 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-r-md"></div>
                </div>
                <p className="m-0 p-0 text-justify text-slate-300">
                  There&apos;s this notion that to grow a business, you have to
                  be ruthless. But we know there&apos;s a better way to grow.
                  One where what&apos;s good for the bottom line is also good
                  for customers. We believe businesses can grow with a
                  conscience, and succeed with a soul — and that they can do it
                  with inbound. That&apos;s why we&apos;ve created an ecosystem
                  uniting software, education, and community to help businesses
                  grow better every day.
                </p>
              </div>
              <Image src={Images.Mission} alt="mission" />
            </div>
            <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
              <Image src={Images.Vision} alt="Vision" />
              <div className="flex flex-col lg:w-1/2 gap-4">
                <div className="lg:w-1/4">
                  <h1 className=" text-2xl">Our Vision</h1>
                  <div className="w-full h-1 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-r-md"></div>
                </div>
                <p className="m-0 p-0 text-justify text-slate-300">
                  There&apos;s this notion that to grow a business, you have to
                  be ruthless. But we know there&apos;s a better way to grow.
                  One where what&apos;s good for the bottom line is also good
                  for customers. We believe businesses can grow with a
                  conscience, and succeed with a soul — and that they can do it
                  with inbound. That&apos;s why we&apos;ve created an ecosystem
                  uniting software, education, and community to help businesses
                  grow better every day.
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
              <div className="flex flex-col lg:w-1/2 gap-4">
                <div className="lg:w-1/4">
                  <h1 className=" text-2xl">Our Story</h1>
                  <div className="w-full h-1 bg-gradient-to-r from-brand-color to-brand-color-2 rounded-r-md"></div>
                </div>
                <p className="m-0 p-0 text-justify text-slate-300">
                  As fellow graduate students at MIT in 2004, Brian and Dharmesh
                  noticed a shift in the way people shop and buy. Consumers were
                  no longer tolerating interruptive bids for their attention —
                  in fact, they&apos;d gotten really, really good at ignoring
                  them. From this shift, a company was born: HubSpot. It was
                  founded on &quot;inbound&quot;, the notion that people
                  don&apos;t want to be interrupted by marketers or harassed by
                  salespeople — they want to be helped.Today, the inbound
                  movement continues to empower businesses around the world to
                  stop interrupting, start helping & return their focus to the
                  customer.
                </p>
              </div>
              <Image src={Images.Story} alt="story" />
            </div>
          </div>
          {/* Section 3 */}
          <div className="w-full flex flex-col justify-center items-center gap-4 px-8">
            <h1 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 text-4xl">Who we are</h1>
            <p className="m-0 p-0 text-center text-slate-300">
              Queleads CRM is a dynamic and innovative team dedicated to
              revolutionizing the way businesses interact with their customers.
              With a collective passion for technology and a commitment to
              excellence, we have crafted a powerful CRM software designed to
              meet the unique needs of your organization.
            </p>
          </div>
          <div className="flex flex-col lg:px-16 lg:py-8 p-4 gap-8 bg-dark-glass backdrop-blur-2xl rounded-md gap-8"></div>
        </div>
        <Footer />
      </>
    </main>
  );
};

export default AboutUs;
