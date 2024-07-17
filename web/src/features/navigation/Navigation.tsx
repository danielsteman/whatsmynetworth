import React from "react";
import { GrAppsRounded } from "react-icons/gr";
import { IoMdCard } from "react-icons/io";
import { RiStackLine } from "react-icons/ri";
import NavigationItem from "./NavigationItem";
import Avatar from "./Avatar";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <div>
      <div className="flex flex-row items-center mb-4">
        <div>
          <Logo />
        </div>
        <div className="ml-auto">
          <Avatar username={"Daniel"} />
        </div>
      </div>
      <NavigationItem icon={GrAppsRounded} label={"Dashboard"} />
      <NavigationItem icon={RiStackLine} label={"Accounts"} />
      <NavigationItem icon={IoMdCard} label={"Transactions"} />
    </div>
  );
};

export default Navigation;
