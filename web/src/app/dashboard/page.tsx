import MenuItem from "./MenuItem";
import { RiStackLine } from "react-icons/ri";
import { IoMdCard } from "react-icons/io";
import { GrAppsRounded } from "react-icons/gr";
import Logo from "./Logo";
import Avatar from "./Avatar";

export default function Home() {
  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="flex flex-col gap-1 ">
        <div className="flex flex-row items-center">
          <div className="p-6">
            <Logo />
          </div>
          <Avatar username={"Daniel"} />
        </div>
        <MenuItem icon={GrAppsRounded} label={"Dashboard"} />
        <MenuItem icon={RiStackLine} label={"Accounts"} />
        <MenuItem icon={IoMdCard} label={"Transactions"} />
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
