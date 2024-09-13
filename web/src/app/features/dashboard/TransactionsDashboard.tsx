import NewAccountButton from "../newAccount/NewAccountButton";
import { DashboardProps } from "./Dashboards";
import SyncButton from "./SyncButton";

const TransactionsDashboard: React.FC<DashboardProps> = ({ session }) => {
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
        <SyncButton identifier={session.user.id} />
      </div>
    </div>
  );
};

export default TransactionsDashboard;
