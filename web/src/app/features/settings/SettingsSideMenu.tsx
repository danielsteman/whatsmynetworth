"use client";

import MenuItem from "@/app/components/MenuItem";
import { IoIosLink } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const SettingsSideMenu = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full relative flex gap-2 items-center pb-2">
        <h3 className="font-medium text-neutral-500 text-xs uppercase">
          general
        </h3>
        <div className="h-px bg-neutral-200 w-full"></div>
      </div>
      <MenuItem
        label="Account"
        icon={MdAccountCircle}
        active={false}
        href="settings/account"
      />
      <MenuItem
        label="Connections"
        icon={IoIosLink}
        active={true}
        href="connections"
      />
    </div>
  );
};

export default SettingsSideMenu;
