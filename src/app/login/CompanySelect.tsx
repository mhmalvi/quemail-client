"use client";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { passwordLoginStore, Storage } from "@/store/store";

interface Company {
    userName: string;
    email: string;
}

interface CompanySelectProps {
    companyList: Company[];
}

const CompanySelect: React.FC<CompanySelectProps> = ({ companyList }) => {

    const handleCredentialSubmit = (comapny: any) => {
        console.log(comapny)
        Storage.setItem("userName", comapny.userName);
        Storage.setItem("email", comapny.email);
        Storage.setItem("photo", comapny.image);
        Storage.setItem("token", comapny.token);
        Storage.setItem("userID", Number(comapny.id));
        Storage.setItem("first_user", Number(comapny.first_user));
    };

    return (

        <div className="bg-light-glass w-full rounded-md backdrop-blur-2xl p-8 flex flex-col gap-4 items-center justify-center">

            <div className="flex flex-row">
                <h1 className="m-0 p-0 text-5xl text-slate-300 ">Que</h1>
                <Image
                    src={Images.MainLogo}
                    alt="logo"
                    className="h-16 w-16 rounded-md ease-in duration-100"
                />
                <h1 className="m-0 p-0 text-5xl text-slate-300 ">ailer</h1>
            </div>
            <div className="w-full overflow-x-auto">
                <div className="flex gap-4">
                    {companyList.map((company, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-4 rounded-md border border-slate-400 min-w-[200px] flex-shrink-0 cursor-pointer"
                            onClick={() => {
                                handleCredentialSubmit(company);
                            }}
                        >
                            <h2 className="text-slate-300">{company.userName}</h2>
                            <p className="text-slate-400">{company.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CompanySelect;
