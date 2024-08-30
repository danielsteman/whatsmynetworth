import NewAccountButton from "../newAccount/NewAccountButton";
import { DashboardsProps } from "./Dashboards";
import SyncButton from "./SyncButton";

const TransactionsDashboard: React.FC<DashboardsProps> = ({ session }) => {
  // TODO: get next-auth session on client side
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Transactions</div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
      <div>
        <SyncButton />
      </div>
    </div>
  );
};

export default TransactionsDashboard;
