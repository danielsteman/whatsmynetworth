import React from "react";
import { FiPlus } from "react-icons/fi";

const Portfolio = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="font-semibold text-neutral-500 text-xs tracking-wider">
        PORTFOLIO
      </div>
      <div className="text-neutral-500 ml-auto p-2 rounded-lg hover:bg-neutral-100">
        <FiPlus size={20} />
      </div>
    </div>
  );
};

export default Portfolio;
