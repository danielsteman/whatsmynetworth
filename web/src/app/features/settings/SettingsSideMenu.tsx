"use client";

import MenuItem from "@/app/components/MenuItem";
import { IoIosLink } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { select, SettingsMenuItem } from "./settingsMenuSlice";
import { RootState } from "@/lib/store";

const SettingsSideMenu = () => {
  const dispatch = useDispatch();
  const clickHandler = (item: SettingsMenuItem) => {
    dispatch(select(item));
  };
  const selectedItem = useSelector(
    (state: RootState) => state.settingsMenu.selected
  );
  const isActive = (item: SettingsMenuItem): boolean => {
    return item === selectedItem;
  };
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
        active={isActive(SettingsMenuItem.SETTINGS)}
        clickHandler={() => clickHandler(SettingsMenuItem.SETTINGS)}
      />
      <MenuItem
        label="Connections"
        icon={IoIosLink}
        active={isActive(SettingsMenuItem.CONNECTIONS)}
        clickHandler={() => clickHandler(SettingsMenuItem.CONNECTIONS)}
      />
    </div>
  );
};

export default SettingsSideMenu;
