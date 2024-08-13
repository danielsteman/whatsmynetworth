import React, { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        {children}
        <h2 className="text-2xl font-bold">Centered Overlay</h2>
        <p className="mt-4">
          This overlay is centered horizontally and vertically.
        </p>
        <button className="absolute top-2 right-2 text-black font-bold">
          X
        </button>
      </div>
    </div>
  );
};

export default Overlay;
