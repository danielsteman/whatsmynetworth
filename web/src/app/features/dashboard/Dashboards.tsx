"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsDashboard from "./AccountsDashboard";
import DefaultDashboard from "./DefaultDashboard";
import { Session } from "next-auth";
import TransactionsDashboard from "./TransactionsDashboard";
import { Account, Transaction } from "../../dashboard/page";

export interface DashboardProps {
  session: Session;
}

export interface AccountsDashboardProps extends DashboardProps {
  accounts: Account[];
}

export interface TransactionsDashboardProps extends DashboardProps {
  accounts: Account[];
  accountTransactions: { [key: string]: Transaction[] };
}

type CombinedDashboardProps = DashboardProps &
  AccountsDashboardProps &
  TransactionsDashboardProps;

const Dashboards: React.FC<CombinedDashboardProps> = ({
  session,
  accounts,
  accountTransactions,
}) => {
  const currentTab = useSelector(
    (state: RootState) => state.navigation.currentTab
  );
  const tabDashboardMapping = {
    Dashboard: <DefaultDashboard session={session} />,
    Accounts: <AccountsDashboard session={session} accounts={accounts} />,
    Transactions: (
      <TransactionsDashboard
        session={session}
        accounts={accounts}
        accountTransactions={accountTransactions}
      />
    ),
  };
  return tabDashboardMapping[currentTab];
};

export default Dashboards;
