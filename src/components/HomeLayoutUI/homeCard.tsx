"use client";
import React, { useState } from "react";
import Image from "next/image";
import Images from "../utils/images";
import { Label, Modal, Spinner, TextInput } from "flowbite-react";
const HomeCard = () => {
  const [serviceClicked, setServiceClicked] = useState<string | null>(null);
  return (
    <div className="h-full relative dark:bg-dark-glass shadow-md bg-[#ffffffbf] backdrop-blur-2xl rounded-md p-4 flex flex-col gap-4 overflow-hidden">
      <h1 className="xl:text-xl text-base m-0 p-0 dark:text-white text-dark-black">
        Connect your Store
      </h1>
      <p className="xl:text-base text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        Use your customer data to create more targeted emails
      </p>
      <div className="w-full h-1/2 border dark:border-dark-black shadow-md rounded-md flex items-center justify-center gap-4">
        <div
          className="h-20 p-4 border w-20 rounded-md"
          onClick={() => {
            setServiceClicked("Google");
          }}
        >
          <Image src={Images.Google} alt="Google" className="h-full" />
        </div>
      </div>
      <p className="xl:text-sm text-xs m-0 p-0 dark:text-slate-300 text-light-black">
        Segment and target customers based on purchase behavior using real-time
        data from your online store.
      </p>
      <Modal show={serviceClicked === "Google"} dismissible onClose={()=>{
        setServiceClicked(null)
      }}>
        <Modal.Header className="dark:bg-dark-glass bg-violet-50 dark:text-slate-300 text-dark-black">
          Connect store
        </Modal.Header>
        <Modal.Body className="dark:bg-dark-black bg-violet-50 flex flex-col gap-4">
          <div className="">
            <Label htmlFor="name" value="Add Email" />
            <TextInput
              id="email"
              placeholder="name@company.com"
              // value={editContactData.json.name || ""}
              // onChange={(event) =>
              //   handleEditContactDataChange("name", event.target.value)
              // }
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Add App Password" />
            <TextInput
              id="email"
              placeholder="name@company.com"
              // value={editContactData.json.email || ""}
              // onChange={(event) =>
              //   handleEditContactDataChange("email", event.target.value)
              // }
              required
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              // disabled={!hasChanges()}
              className="px-4 py-2 bg-brand-color rounded-md disabled:opacity-20"
              // onClick={() => {
              //   setUpdateLoading(true);
              //   onUpdate();
              // }}
            >
              {/* {updateLoading ? (
                    <Spinner
                      color="purple"
                      aria-label="Purple spinner example"
                      size="xl"
                    />
                  ) : (
                    "Verify"
                  )} */}
            </button>
            <button
              className="px-4 py-2 border border-brand-color rounded-md dark:text-slate-300 text-dark-black"
              onClick={() =>
                setServiceClicked(null)
              }
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default HomeCard;
