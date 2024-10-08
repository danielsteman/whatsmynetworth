"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { IoIosLink, IoMdArrowBack } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "./newAccountMenuSlice";
import React from "react";
import { CurrentUserSessionProps } from "./NewAccountButton";
import { useRouter } from "next/navigation";

const FirstStepMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <h2 className="text-neutral-500 border-b-2 py-4 w-full">
        What would you like to add?
      </h2>
      <button
        className="font-medium w-full hover:bg-neutral-200 rounded-xl p-3"
        onClick={() => dispatch(setStep(1))}
      >
        <div className="flex flex-row gap-4">
          <RiBankFill size={24} />
          <div>Payment account</div>
        </div>
      </button>
    </>
  );
};

const SecondStepMenu: React.FC<CurrentUserSessionProps> = ({ currentUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLinkBankAccount = async () => {
    try {
      if (!currentUser || !currentUser.user || !currentUser.user.id) {
        console.error("User ID is not available.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/connections/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier: currentUser.user.id }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error while linking bank account: ${errorText}`);
        return;
      }

      const data = await response.json();
      if (data.connect_url) {
        router.push(data.connect_url);
      } else {
        console.error("Connection data doesn't contain connect_url");
        return;
      }
    } catch (error) {
      console.error("Error while getting Saltedge connect link:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4 border-b-2 w-full items-center text-neutral-500">
        <button
          onClick={() => dispatch(setStep(0))}
          className="p-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
        >
          <IoMdArrowBack size={24} />
        </button>
        <h2 className=" py-4 w-full">How would you like to add it?</h2>
      </div>
      <button
        onClick={handleLinkBankAccount}
        className="font-medium w-full hover:bg-neutral-200 rounded-xl p-3"
      >
        <div className="flex flex-row gap-4">
          <IoIosLink size={24} />
          <div>Link bank account safely through open banking</div>
        </div>
      </button>
    </>
  );
};

const NewAccountMenu: React.FC<CurrentUserSessionProps> = ({ currentUser }) => {
  const menuStep = useSelector((state: RootState) => state.newAccountMenu.step);

  const renderMenuStep = () => {
    switch (menuStep) {
      case 0:
        return <FirstStepMenu />;
      case 1:
        return <SecondStepMenu currentUser={currentUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl w-screen p-4 pt-2 items-start rounded-xl">
      {renderMenuStep()}
    </div>
  );
};

export default NewAccountMenu;
