"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
import PortfolioMenuItem from "./PortfolioMenuItem";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Portfolio = () => {
  const currentTab = useSelector(
    (state: RootState) => state.portfolioMenu.currentTab
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <div className="font-semibold text-neutral-500 text-xs tracking-wider">
          PORTFOLIO
        </div>
        <div className="text-neutral-500 ml-auto p-2 rounded-lg hover:bg-neutral-100">
          <FiPlus size={20} />
        </div>
      </div>
      <div className="flex flex-col">
        <PortfolioMenuItem label={"Payment account"} />
        <PortfolioMenuItem label={"Saving account"} />
      </div>
    </div>
  );
};

export default Portfolio;
