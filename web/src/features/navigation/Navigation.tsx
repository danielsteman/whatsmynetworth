import React from "react";
import { GrAppsRounded } from "react-icons/gr";
import { IoMdCard } from "react-icons/io";
import { RiStackLine } from "react-icons/ri";
import NavigationItem from "./navigationItem";

const Navigation = () => {
  return (
    <>
      <NavigationItem icon={GrAppsRounded} label={"Dashboard"} />
      <NavigationItem icon={RiStackLine} label={"Accounts"} />
      <NavigationItem icon={IoMdCard} label={"Transactions"} />
    </>
  );
};

export default Navigation;
