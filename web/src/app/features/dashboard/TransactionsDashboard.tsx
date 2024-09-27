import {
  IoMdArrowDropdownCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import NewAccountButton from "../newAccount/NewAccountButton";
import { TransactionsDashboardProps } from "./Dashboards";
import SyncButton from "./SyncButton";
import { useState } from "react";

type DropdownState = {
  [key: string]: boolean;
};

const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  session,
  accountTransactions,
}) => {
  const tableHeaderStyle =
    "w-28 font-semibold text-sm px-4 py-2 text-left uppercase text-neutral-500";
  const tableCellStyle = "text-sm font-semibold px-4 py-2";

  const initialDropdownState = Object.keys(accountTransactions).reduce(
    (acc, key) => {
      acc[key] = false;
      return acc;
    },
    {} as DropdownState
  );

  const [dropdownState, setDropdownState] =
    useState<DropdownState>(initialDropdownState);

  const toggleDropdown = (iban: string) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [iban]: !prevState[iban],
    }));
  };

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
            <table className="min-w-full mt-4 table-auto">
              <thead>
                <tr className="border-b">
                  <th className="w-fit" />
                  <th className={`${tableHeaderStyle} w-full`}>IBAN</th>
                  <th className={`${tableHeaderStyle} text-right w-full`}>
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b  hover:bg-neutral-100">
                  <td className="w-fit">
                    <div className="cursor-pointer pl-2 ">
                      {dropdownState[iban] ? (
                        <IoMdArrowDropdownCircle
                          className="text-2xl hover:text-teal-500"
                          onClick={() => toggleDropdown(iban)}
                        />
                      ) : (
                        <IoMdArrowDroprightCircle
                          className="text-2xl hover:text-teal-500"
                          onClick={() => toggleDropdown(iban)}
                        />
                      )}
                    </div>
                  </td>
                  <td className={`${tableCellStyle} w-full whitespace-nowrap`}>
                    {iban}
                  </td>
                  <td
                    className={`${tableCellStyle} w-full text-right whitespace-nowrap`}
                  >
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
