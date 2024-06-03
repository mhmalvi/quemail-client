"use client";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";

const PrivacyPolicy = () => {
  return (
    <div className="w-full h-full dark:bg-dark-glass shadow-md backdrop-blur-2xl bg-white rounded-md p-4 flex flex-col gap-8 overflow-y-scroll">
      <div className="flex justify-between lg:px-16 lg:py-8 p-4 gap-8 bg-dark-glass rounded-md">
        <div className="w-1/2">
          <h1 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 lg:text-2xl text-3xl">
            Summary of our Privacy Policy
          </h1>
          <p className="m-0 p-0 text-slate-300 lg:text-start text-justify">
            It covers every Queleads website that links here, and all of the
            products and services contained on those websites. The detailed
            policy follows the same structure as this summary and constitutes
            the actual legal document.
          </p>
        </div>
        <div className="w-1/2">
          <h1 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-r from-brand-color to-brand-color-2 lg:text-2xl text-3xl">
            Our Privacy Commitment
          </h1>
          <p className="m-0 p-0 text-slate-300 lg:text-start text-justify">
            Queleads CRM has never sold your information to someone else for
            advertising, or made money by showing you other people&apos;s ads,
            and we never will. This has been our approach for almost 25 years,
            and we remain committed to it. This policy tells you what
            information we collect from you, what we do with it, who can access
            it, and what you can do about it.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:px-16 lg:py-8 p-4 gap-8 bg-dark-glass rounded-md">
        <div className="flex items-center justify-between gap-16">
          <div className="flex flex-col gap-8">
            {/* Number One */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">
                1. Information We Collect
              </h1>
              <div className="flex flex-col">
                <h2 className="text-base text-slate-300 ">
                  1.1 Personal Information
                </h2>
                <p className="text-sm text-slate-300 ">
                  We collect the following types of personal information when
                  you use Queleads CRM
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-slate-400 m-0 p-0">
                  Contact Information : Your name, email address, phone number.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Account Information : Usernames, passwords, and other
                  credentials used to access Queleads CRM.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Company Details : Information about your organization,
                  including name and address.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="text-base text-slate-300">
                  1.2 Usage Information
                </h2>
                <p className="text-sm text-slate-300">
                  We collect data related to your usage of Queleads CRM,
                  including:
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-slate-400 m-0 p-0">
                  Log Data: IP address, browser type, access times.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Usage Patterns: How you interact with Queleads CRM.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Device Information: Device type, operating system.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">
                2. How We Use Your Information
              </h1>
              <div className="flex flex-col">
                <p className="text-sm text-slate-300">
                  We use the collected information for the following purposes:
                  Providing and improving Queleads CRM.
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-slate-400 m-0 p-0">
                  Customizing your experience and preferences.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Communicating with you, including service updates and support.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Analyzing usage patterns to enhance our services.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Ensuring the security and integrity of Queleads CRM.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="text-base text-slate-300">
                  1.2 Usage Information
                </h2>
                <p className="text-sm text-slate-300">
                  We collect data related to your usage of Queleads CRM,
                  including:
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-slate-400 m-0 p-0">
                  Log Data: IP address, browser type, access times.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Usage Patterns: How you interact with Queleads CRM.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Device Information: Device type, operating system.
                </p>
              </div>
            </div>
          </div>
          <Image src={Images.Privacy1} alt="Privacy Send Mail" />
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-16">
          <Image src={Images.Privacy2} alt="Privacy Send Mail" />
          <div className="flex flex-col gap-8">
            {/* Number Three */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">
                3. Data Sharing and Disclosure
              </h1>
              <div className="flex flex-col">
                <p className="text-sm text-slate-300">
                  We may share your personal information in the following
                  situations:
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm text-slate-400 m-0 p-0">
                  With Your Consent: When you explicitly agree to the sharing of
                  specific information.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Legal Obligations: To comply with applicable laws and
                  regulations.
                </p>
                <p className="text-sm text-slate-400 m-0 p-0">
                  Business Transactions: In connection with a merger,
                  acquisition, or sale of assets.
                </p>
              </div>
            </div>
            {/* Number Four */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">4. Security Measures</h1>
              <div className="flex flex-col">
                <p className="text-sm text-slate-400">
                  We implement robust security measures to protect your
                  information from unauthorized access, disclosure, alteration,
                  and destruction.
                </p>
              </div>
            </div>
            {/* Number Five */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">
                5. Your Choices and Rights
              </h1>
              <div className="flex flex-col">
                <p className="text-sm text-slate-400">
                  You have the following rights regarding your personal
                  information: Access, correct or delete your data. Opt-out of
                  marketing communications. Withdraw consent for processing
                  where applicable.
                </p>
              </div>
            </div>
            {/* Number Five */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl text-slate-300">
                6. Updates to this Privacy Policy
              </h1>
              <div className="flex flex-col">
                <p className="text-sm text-slate-400">
                  We may update this Privacy Policy periodically. The latest
                  version will be posted on our website with the effective date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
