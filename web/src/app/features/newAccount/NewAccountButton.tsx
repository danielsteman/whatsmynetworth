"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./newAccountMenuSlice";

export default function NewAccountButton() {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector(
    (state: RootState) => state.newAccountMenu.open
  );
  return (
    <button onClick={() => dispatch(toggleMenu(!open))}>
      <div className="flex flex-row gap-1 p-2 pr-3 bg-darkgray font-medium text-sm text-white rounded-lg hover:opacity-85">
        <FiPlus size={20} />
        <div>New Account</div>
      </div>
    </button>
  );
}
