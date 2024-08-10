"use client";

import { ReactNode, useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";

interface DropdownProps {
  children: ReactNode;
}

interface DropdownItemProps {
  label: string;
  logo: ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, logo }) => {
  return (
    <div className="flex flex-row items-center">
      {logo}
      <button className="font-medium text-sm text-left rounded-md py-1 px-2 hover:bg-neutral-300">
        {label}
      </button>
    </div>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownItemStyle =
    "font-medium text-sm text-left rounded-md py-1 px-2 hover:bg-neutral-300";
  return (
    <div className="flex flex-col relative">
      <div onClick={() => setToggle(!toggle)}>{children}</div>
      {toggle && (
        <div className="flex flex-col gap-2 absolute top-10 w-fit bg-neutral-200 p-2 rounded-md min-w-32">
          <DropdownItem label="Settings" logo={<FiSettings />} />
          <DropdownItem label="Sign out" logo={<FiLogOut />} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
