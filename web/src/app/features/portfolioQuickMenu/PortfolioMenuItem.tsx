import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface PortfolioMenuItemProps {
  label: string;
}

const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({ label }) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <IoIosArrowForward />
      <div className="text-sm font-medium ">{label}</div>
    </div>
  );
};

export default PortfolioMenuItem;
