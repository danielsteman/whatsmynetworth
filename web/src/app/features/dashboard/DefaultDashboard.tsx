import BarChart from "@/app/components/charts/BarChart";
import NewAccountButton from "../newAccount/NewAccountButton";
import { DashboardProps } from "./Dashboards";

const DefaultDashboard: React.FC<DashboardProps> = ({ session }) => {
  // TODO: get next-auth session on client side
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Welcome back</div>
          <div className="text-sm text-neutral-500">
            Here's what's happening today
          </div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
      <BarChart />
    </div>
  );
};

export default DefaultDashboard;
