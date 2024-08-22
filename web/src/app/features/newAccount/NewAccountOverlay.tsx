"use client";

import { AppDispatch } from "@/lib/store";
import React, { ReactNode, useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setStep, toggleMenu } from "./newAccountMenuSlice";

interface NewAccountOverlayProps {
  children: ReactNode;
}

const NewAccountOverlay: React.FC<NewAccountOverlayProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleMenu());
        dispatch(setStep(0));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [overlayRef]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg relative rounded-xl" ref={overlayRef}>
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
