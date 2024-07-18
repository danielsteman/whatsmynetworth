"use client";

import { AppDispatch } from "@/lib/store";
import React from "react";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { NavigationTabs, setTab } from "./navigationSlice";

interface NavigationItemProps {
  icon: IconType;
  tab: NavigationTabs;
  active: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  tab,
  active,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleTabClick = () => {
    dispatch(setTab(tab));
  };

  const activeStyle =
    "flex flex-row items-center gap-1 p-2 rounded-lg bg-white border-2 shadow-md border-gray-50 cursor-pointer";
  const inActiveStyle =
    "text-neutral-500 flex flex-row items-center gap-1 p-2 border-2 border-transparent rounded-lg hover:bg-neutral-200 hover:border-gray-50 cursor-pointer";

  return (
    <div
      onClick={() => handleTabClick()}
      className={active ? activeStyle : inActiveStyle}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{tab}</div>
    </div>
  );
};

export default NavigationItem;
