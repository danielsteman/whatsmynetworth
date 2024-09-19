import NewAccountButton from "../newAccount/NewAccountButton";
import { TransactionsDashboardProps } from "./Dashboards";
import SyncButton from "./SyncButton";

const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  session,
  accounts,
  accountTransactions,
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
        {Object.entries(accountTransactions).map(
          ([accountId, transactions]) => (
            <div key={accountId}>
              <h3>Account ID: {accountId}</h3>
              <ul>
                {transactions.map((transaction, index) => (
                  <li key={index}>{transaction.description}</li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
