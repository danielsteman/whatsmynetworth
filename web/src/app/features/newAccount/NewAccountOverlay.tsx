"use client";

import { AppDispatch } from "@/lib/store";
import React, { ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleMenu } from "./newAccountMenuSlice";

interface OverlayProps {
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        {children}
        <h2 className="text-2xl font-bold">Centered Overlay</h2>
        <p className="mt-4">
          This overlay is centered horizontally and vertically.
        </p>
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

export default Overlay;
