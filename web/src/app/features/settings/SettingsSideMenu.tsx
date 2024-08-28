"use client";

import MenuItem from "@/app/components/MenuItem";
import { IoIosLink } from "react-icons/io";
import { MdAccountCircle, MdChevronLeft } from "react-icons/md";
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
    <div className="flex flex-col gap-1 min-w-48">
      <a
        href="/dashboard"
        className="flex flex-row gap-1 w-fit items-center pr-2 py-1 mb-4 cursor-pointer rounded-lg hover:bg-neutral-200"
      >
        <MdChevronLeft size={24} className="text-neutral-500" />
        <span className="font-medium text-sm">Back</span>
      </a>
      <div className="w-full relative flex gap-2 items-center py-2">
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
