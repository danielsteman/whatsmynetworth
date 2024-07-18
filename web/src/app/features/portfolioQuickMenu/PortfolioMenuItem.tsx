import React from "react";

interface PortfolioMenuItemProps {
  label: string;
}

const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({ label }) => {
  return <div>{label}</div>;
};

export default PortfolioMenuItem;
