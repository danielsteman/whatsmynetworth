import { IoIosArrowForward } from "react-icons/io";

interface PortfolioMenuItemProps {
  label: string;
}

const PortfolioMenuItem: React.FC<PortfolioMenuItemProps> = ({ label }) => {
  return (
    <div className="flex flex-row gap-4 items-center py-4 px-2 rounded-xl hover:bg-neutral-100">
      <IoIosArrowForward className="text-neutral-500" size={20} />
      <div className="text-sm font-medium ">{label}</div>
    </div>
  );
};

export default PortfolioMenuItem;
