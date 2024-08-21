"use client";

import { RiBankFill } from "react-icons/ri";

const NewAccountMenu = () => {
  return (
    <div className="flex flex-col gap-4 max-w-xl w-screen p-4 pt-2 items-start rounded-xl">
      <h2 className="text-neutral-500 border-b-2 py-4 w-full">
        What would you like to add?
      </h2>
      <button className="font-medium w-full hover:bg-neutral-200 rounded-xl p-3">
        <div className="flex flex-row gap-4">
          <RiBankFill size={24} />
          <div>Payment account</div>
        </div>
      </button>
    </div>
  );
};

export default NewAccountMenu;
