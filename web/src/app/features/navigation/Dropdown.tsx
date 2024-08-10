"use client";

import { ReactNode, useState } from "react";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="flex flex-col relative">
      <div onClick={() => setToggle(!toggle)}>{children}</div>
      {toggle && <div className="absolute">hoi</div>}
    </div>
  );
};

export default Dropdown;
