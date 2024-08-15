"use client";
import React from "react";
import Image from "next/image";
import Images from "@/components/utils/images";
import Link from "next/link";
import { passwordLoginStore, Storage } from "@/store/store";
import { subadminToCompany } from "../api/auth";
import { warningNotification } from "@/components/utils/utility";
import { useRouter } from "next/navigation";

interface Company {
    userName: string;
    email: string;
}

interface CompanySelectProps {
    companyList: Company[];
    setShowCompanyList: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanySelect: React.FC<CompanySelectProps> = ({ companyList, setShowCompanyList }) => {
    const router = useRouter()

    const handleCredentialSubmit = async (comapny: any) => {
        const res = await subadminToCompany(comapny.id);
        const response = await res.json();

        if (response.status === 200) {
            Storage.setItem("userName", response.data.userName);
            Storage.setItem("email", response.data.email);
            Storage.setItem("photo", response.data.photo);
            Storage.setItem("token", response.data.token);
            Storage.setItem("satok", response.data.satok);
            Storage.setItem("userID", Number(response.data.userID));
            Storage.setItem("said", Number(response.data.said));
            Storage.setItem("first_user", Number(response.data.first_user));
            setShowCompanyList(false);
            router.push("/home");
        }
        else if (response?.status === 404) {
            warningNotification(response.message);
            window.location.href =
                window.location.pathname + "?reload=" + new Date().getTime();
        }
    };

    return (

        <div className="bg-light-glass backdrop-blur-2xl p-8 flex flex-col gap-4 items-center justify-center">

            <div className="flex flex-row">
                <h1 className="m-0 p-0 text-5xl dark:text-slate-300 text-slate-800 ">Que</h1>
                <Image
                    src={Images.MainLogo}
                    alt="logo"
                    className="h-16 w-16 rounded-md ease-in duration-100"
                />
                <h1 className="m-0 p-0 text-5xl dark:text-slate-300 text-slate-800">ailer</h1>
            </div>
            <div className="flex flex-row w-full justify-center items-center">
                <hr className="border-2 border-brand-color w-1/2"></hr>
                <h1 className="text-center dark:text-slate-300 text-slate-800">Login as</h1>
                <hr className="border-2 border-brand-color w-1/2"></hr>
            </div>
            <div className="w-full rounded-md overflow-x-auto">
                <div className="flex gap-4">
                    {companyList.map((company, index) => (
                        <div
                            key={index}
                            className="dark:bg-light-glass border-brand-color  p-4 rounded-md border flex-shrink-0 cursor-pointer"
                            onClick={() => {
                                handleCredentialSubmit(company);
                            }}
                        >
                            <h2 className="dark:text-slate-300 text-slate-800">{company.userName}</h2>
                            <p className="dark:text-slate-300 text-slate-800">{company.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CompanySelect;
