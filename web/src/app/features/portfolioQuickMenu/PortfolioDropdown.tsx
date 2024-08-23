"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  PortfolioQuickMenuDropdowns,
  toggleDropdown,
} from "./portfolioQuickMenuSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { setStep, toggleMenu } from "../newAccount/newAccountMenuSlice";

interface PortfolioDropdownProps {
  dropDown: PortfolioQuickMenuDropdowns;
}

const PortfolioDropdown: React.FC<PortfolioDropdownProps> = ({ dropDown }) => {
  const dispatch = useDispatch();
  const droppedDownItems = useSelector(
    (state: RootState) => state.portfolioMenu.droppedDownItems
  );

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row gap-4 py-4 px-2 items-center rounded-xl cursor-pointer hover:bg-neutral-100"
        onClick={() => dispatch(toggleDropdown(dropDown))}
      >
        {droppedDownItems[dropDown] === false ? (
          <IoIosArrowForward className="text-neutral-500" size={20} />
        ) : (
          <IoIosArrowDown className="text-neutral-500" size={20} />
        )}
        <div className="text-sm font-medium ">{dropDown}</div>
      </div>
      {droppedDownItems[dropDown] && (
        <div
          className="flex flex-col py-4 px-2 items-center rounded-xl cursor-pointer hover:bg-neutral-100"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch(toggleMenu());
            dispatch(setStep(1));
          }}
        >
          <div className="flex flex-row gap-4">
            <FiPlus size={20} className="text-neutral-500" />
            <div className="text-sm font-medium text-neutral-500">
              New {dropDown.toLowerCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDropdown;
