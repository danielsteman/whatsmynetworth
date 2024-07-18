"use client";

import { FiPlus } from "react-icons/fi";

export default function NewAccountButton() {
  return (
    <button onClick={() => console.log("new account")}>
      <div className="flex flex-row gap-1 p-2 pr-3 bg-darkgray font-medium text-sm text-white rounded-lg hover:opacity-85">
        <FiPlus size={20} />
        <div>New Account</div>
      </div>
    </button>
  );
}
