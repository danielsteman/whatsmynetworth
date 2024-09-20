import { AccountTransactions } from "./Dashboards";

interface Props {
  accountTransactions: AccountTransactions;
}

const TransactionList: React.FC<Props> = ({ accountTransactions }) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      {Object.entries(accountTransactions).map(([accountId, transactions]) => (
        <div key={accountId}>
          <h3>Account ID: {accountId}</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>{transaction.description}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
