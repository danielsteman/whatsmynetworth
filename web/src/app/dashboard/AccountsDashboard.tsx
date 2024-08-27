import NewAccountButton from "../features/newAccount/NewAccountButton";
import { DashboardsProps } from "./Dashboards";

const AccountsDashboard: React.FC<DashboardsProps> = ({ session }) => {
  // TODO: get next-auth session on client side
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Accounts</div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
    </div>
  );
};

export default AccountsDashboard;
