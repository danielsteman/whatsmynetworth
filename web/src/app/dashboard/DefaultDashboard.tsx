import NewAccountButton from "../features/newAccount/NewAccountButton";
import { DashboardsProps } from "./Dashboards";

const DefaultDashboard: React.FC<DashboardsProps> = ({ session }) => {
  // TODO: get next-auth session on client side
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
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
    </div>
  );
};

export default DefaultDashboard;
