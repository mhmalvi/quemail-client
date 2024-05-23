"use client";
import Images from "@/components/utils/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Campaigns = () => {
  return (
    <div className="dark:bg-dark-glass rounded-md h-full p-4 shadow-md border dark:border-none bg-white flex items-center justify-center gap-16">
      <button className="w-1/3 flex flex-col items-center justify-center dark:text-slate-300 text-dark-black p-2 border border-brand-color rounded-md dark:hover:bg-dark-black hover:bg-violet-50 duration-100 ease-in">
        <Link href="/home/campaigns/new-campaign">
          <Image
            src={Images.NewCampaign}
            alt="allTemplates"
            className="w-full"
          />
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black text-2xl ">
            New Campaign
          </h1>
        </Link>
      </button>
      <button className="w-1/3 flex flex-col items-center justify-center dark:text-slate-300 text-dark-black p-2 border border-brand-color rounded-md dark:hover:bg-dark-black hover:bg-violet-50 duration-100 ease-in">
        <Link href="/home/campaigns/all-campaigns">
          <Image
            src={Images.AllCampaigns}
            alt="allTemplates"
            className="w-full"
          />
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black text-2xl">
            All Campaigns
          </h1>
        </Link>
      </button>
      <button className="w-1/3 flex flex-col items-center justify-center dark:text-slate-300 text-dark-black p-2 border border-brand-color rounded-md dark:hover:bg-dark-black hover:bg-violet-50 duration-100 ease-in">
        <Link href="/home/campaigns/template-generator">
          <Image
            src={Images.TemplateGenerator}
            alt="allTemplates"
            className="w-full"
          />
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black text-2xl">
            Template Generator
          </h1>
        </Link>
      </button>
      <button className="w-1/3 flex flex-col items-center justify-center dark:text-slate-300 text-dark-black p-2 border border-brand-color rounded-md dark:hover:bg-dark-black hover:bg-violet-50 duration-100 ease-in">
        <Link href="/home/campaigns/all-templates">
          <Image
            src={Images.AllTemplates}
            alt="allTemplates"
            className="w-full"
          />
          <h1 className="m-0 p-0 dark:text-slate-300 text-dark-black text-2xl">
            All Templates
          </h1>
        </Link>
      </button>
    </div>
  );
};
export default Campaigns;
