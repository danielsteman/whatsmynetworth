import Logo from "../../features/navigation/Logo";
import Avatar from "../../features/navigation/Avatar";
import { FiPlus } from "react-icons/fi";
import Navigation from "@/features/navigation/Navigation";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-8 p-8">
      <div className="flex flex-col gap-1 w-72">
        <div className="flex flex-row items-center mb-4">
          <div>
            <Logo />
          </div>
          <div className="ml-auto">
            <Avatar username={"Daniel"} />
          </div>
        </div>
        <Navigation />
        <div className="h-8" />
        <div className="flex flex-row items-center">
          <div className="font-semibold text-neutral-500 text-xs tracking-wider">
            PORTFOLIO
          </div>
          <div className="text-neutral-500 ml-auto p-2 rounded-lg hover:bg-neutral-100">
            <FiPlus size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>Welcome back, Daniel</div>
          <div>New account</div>
        </div>
        <div>No accounts yet</div>
      </div>
    </div>
  );
}
