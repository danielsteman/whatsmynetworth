"use client";

import React from "react";
import { GrAppsRounded, GrMoney } from "react-icons/gr";
import { IoMdCard } from "react-icons/io";
import { RiStackLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { NavigationTabs } from "./navigationSlice";
import Dropdown from "./Dropdown";

const Navigation = () => {
  const currentTab = useSelector(
    (state: RootState) => state.navigation.currentTab
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center mb-4">
        <div>
          <Logo />
        </div>
        <div className="ml-auto">
          <Dropdown>
            <Avatar username={"Daniel"} />
          </Dropdown>
        </div>
      </div>
      <NavigationItem
        icon={GrAppsRounded}
        tab={NavigationTabs.DASHBOARD}
        active={currentTab === NavigationTabs.DASHBOARD ? true : false}
      />
      <NavigationItem
        icon={RiStackLine}
        tab={NavigationTabs.ACCOUNTS}
        active={currentTab === NavigationTabs.ACCOUNTS ? true : false}
      />
      <NavigationItem
        icon={IoMdCard}
        tab={NavigationTabs.TRANSACTIONS}
        active={currentTab === NavigationTabs.TRANSACTIONS ? true : false}
      />
      <NavigationItem
        icon={GrMoney}
        tab={NavigationTabs.BUDGETS}
        active={currentTab === NavigationTabs.BUDGETS ? true : false}
      />
    </div>
  );
};

export default Navigation;
