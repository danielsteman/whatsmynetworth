import React from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  icon: IconType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-row items-center gap-1 p-2">
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default MenuItem;
