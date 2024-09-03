import NewAccountButton from "../newAccount/NewAccountButton";
import { AccountsDashboardProps } from "./Dashboards";

function getCurrencySymbol(currency: string): string {
  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    SEK: "kr",
    NZD: "NZ$",
  };

  return currencySymbols[currency] || currency;
}

const AccountsDashboard: React.FC<AccountsDashboardProps> = ({
  session,
  accounts,
}) => {
  const tableHeaderStyle =
    "font-semibold text-sm px-4 py-2 text-left uppercase text-neutral-500";
  const tableCellStyle = "text-sm font-semibold px-4 py-2";

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
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className={tableHeaderStyle}>Name</th>
            <th className={tableHeaderStyle}>Type</th>
            <th className={tableHeaderStyle}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr
              key={index}
              className="border-b rounded-lg hover:bg-neutral-100"
            >
              <td className={tableCellStyle}>{account.name}</td>
              <td className={tableCellStyle}>{account.nature}</td>
              <td className={tableCellStyle}>
                {getCurrencySymbol(account.currency_code)} {account.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsDashboard;
