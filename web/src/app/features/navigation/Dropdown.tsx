"use client";

import { ReactNode, useState } from "react";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownItemStyle = "font-medium text-sm";
  return (
    <div className="flex flex-col relative">
      <div onClick={() => setToggle(!toggle)}>{children}</div>
      {toggle && (
        <div className="flex flex-col gap-2 absolute top-10 w-fit bg-neutral-200 p-2 rounded-md min-w-20">
          <button className={dropdownItemStyle}>Settings</button>
          <button className={dropdownItemStyle}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
