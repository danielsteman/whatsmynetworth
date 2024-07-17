"use client";

import React from "react";
import { GrAppsRounded } from "react-icons/gr";
import { IoMdCard } from "react-icons/io";
import { RiStackLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { Tabs } from "./navigationSlice";

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
          <Avatar username={"Daniel"} />
        </div>
      </div>
      <NavigationItem
        icon={GrAppsRounded}
        tab={Tabs.DASHBOARD}
        active={currentTab === Tabs.DASHBOARD ? true : false}
      />
      <NavigationItem
        icon={RiStackLine}
        tab={Tabs.ACCOUNTS}
        active={currentTab === Tabs.ACCOUNTS ? true : false}
      />
      <NavigationItem
        icon={IoMdCard}
        tab={Tabs.TRANSACTIONS}
        active={currentTab === Tabs.TRANSACTIONS ? true : false}
      />
    </div>
  );
};

export default Navigation;
