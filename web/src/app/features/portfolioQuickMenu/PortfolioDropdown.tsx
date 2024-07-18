"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  PortfolioQuickMenuDropdowns,
  toggleDropdown,
} from "./portfolioQuickMenuSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

interface PortfolioDropdownProps {
  dropDown: PortfolioQuickMenuDropdowns;
}

const PortfolioDropdown: React.FC<PortfolioDropdownProps> = ({ dropDown }) => {
  const dispatch = useDispatch();
  const droppedDownItems = useSelector(
    (state: RootState) => state.portfolioMenu.droppedDownItems
  );

  return (
    <div
      className="flex flex-row gap-4 items-center py-4 px-2 rounded-xl cursor-pointer hover:bg-neutral-100"
      onClick={() => dispatch(toggleDropdown(dropDown))}
    >
      {droppedDownItems[dropDown] === false ? (
        <IoIosArrowForward className="text-neutral-500" size={20} />
      ) : (
        <IoIosArrowDown className="text-neutral-500" size={20} />
      )}

      <div className="text-sm font-medium ">{dropDown}</div>
    </div>
  );
};

export default PortfolioDropdown;
