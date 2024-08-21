"use client";

import { useState } from "react";
import { IoIosLink, IoMdArrowBack } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";

type MenuSteps = 0 | 1;

interface StepMenuProps {
  setMenuStep: React.Dispatch<React.SetStateAction<MenuSteps>>;
}

const FirstStepMenu: React.FC<StepMenuProps> = ({ setMenuStep }) => (
  <>
    <h2 className="text-neutral-500 border-b-2 py-4 w-full">
      What would you like to add?
    </h2>
    <button
      className="font-medium w-full hover:bg-neutral-200 rounded-xl p-3"
      onClick={() => setMenuStep(1)}
    >
      <div className="flex flex-row gap-4">
        <RiBankFill size={24} />
        <div>Payment account</div>
      </div>
    </button>
  </>
);

const SecondStepMenu: React.FC<StepMenuProps> = ({ setMenuStep }) => (
  <>
    <div className="flex flex-row gap-4 border-b-2 w-full items-center text-neutral-500">
      <button
        onClick={() => setMenuStep(0)}
        className="p-1 rounded-lg bg-neutral-200 hover:bg-neutral-300"
      >
        <IoMdArrowBack size={24} />
      </button>
      <h2 className=" py-4 w-full">How would you like to add it?</h2>
    </div>
    <button className="font-medium w-full hover:bg-neutral-200 rounded-xl p-3">
      <div className="flex flex-row gap-4">
        <IoIosLink size={24} />
        <div>Link bank account safely through open banking</div>
      </div>
    </button>
  </>
);

const NewAccountMenu = () => {
  const [menuStep, setMenuStep] = useState<MenuSteps>(0);

  const renderMenuStep = () => {
    switch (menuStep) {
      case 0:
        return <FirstStepMenu setMenuStep={setMenuStep} />;
      case 1:
        return <SecondStepMenu setMenuStep={setMenuStep} />;
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
