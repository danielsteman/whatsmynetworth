"use client";

import { AppDispatch } from "@/lib/store";
import React, { ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleMenu } from "./newAccountMenuSlice";

interface NewAccountOverlayProps {
  children: ReactNode;
}

const NewAccountOverlay: React.FC<NewAccountOverlayProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        {children}
        <button
          onClick={() => dispatch(toggleMenu())}
          className="absolute top-2 right-2 text-black font-bold"
        >
          <IoCloseCircle className="text-2xl text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default NewAccountOverlay;
