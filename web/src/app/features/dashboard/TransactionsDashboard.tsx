import NewAccountButton from "../newAccount/NewAccountButton";
import { TransactionsDashboardProps } from "./Dashboards";
import SyncButton from "./SyncButton";

const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  session,
  accountTransactions,
}) => {
  const tableHeaderStyle =
    "w-28 font-semibold text-sm px-4 py-2 text-left uppercase text-neutral-500";
  const tableCellStyle = "text-sm font-semibold px-4 py-2";
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
      <div>
        {Object.entries(accountTransactions).map(([iban, transactions]) => (
          <div key={iban} className="p-2 flex flex-col gap-2">
            <table className="min-w-full mt-4">
              <thead>
                <tr className="border-b">
                  <th className={tableHeaderStyle}>IBAN</th>
                  <th className={`${tableHeaderStyle} text-right`}>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-neutral-100">
                  <td className={tableCellStyle}>{iban}</td>
                  <td className={`${tableCellStyle} text-right`}>
                    {transactions.length}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
