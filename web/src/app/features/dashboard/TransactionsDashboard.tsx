import NewAccountButton from "../newAccount/NewAccountButton";
import { TransactionsDashboardProps } from "./Dashboards";
import SyncButton from "./SyncButton";

const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  session,
  accounts,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center">
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
      <div className="p-2 flex flex-col gap-2">
        {accounts.map((account, index) => (
          <div key={index}>{account.name}</div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
