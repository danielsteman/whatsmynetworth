"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsDashboard from "./AccountsDashboard";
import DefaultDashboard from "./DefaultDashboard";
import { Session } from "next-auth";
import TransactionsDashboard from "./TransactionsDashboard";
import BudgetsDashboard from "./BudgetsDashboard";
import { Account } from "@/app/services/getAccounts";
import { Transaction } from "@/app/services/getTransactions";
import { Categories } from "@/app/dashboard/getCategoryDistribution";

export interface DashboardProps {
  session: Session;
}

export interface DefaultDashboardProps extends DashboardProps {
  accountCategoryDistributions: { [key: string]: Categories };
}

export interface AccountsDashboardProps extends DashboardProps {
  accounts: Account[];
}

export type AccountTransactions = { [key: string]: Transaction[] };

export interface TransactionsDashboardProps extends AccountsDashboardProps {
  accountTransactions: AccountTransactions;
}

export interface BudgetsDashboardProps extends DashboardProps {}

type CombinedDashboardProps = DashboardProps &
  AccountsDashboardProps &
  TransactionsDashboardProps &
  DefaultDashboardProps;

const Dashboards: React.FC<CombinedDashboardProps> = ({
  session,
  accounts,
  accountTransactions,
  accountCategoryDistributions,
}) => {
  const currentTab = useSelector(
    (state: RootState) => state.navigation.currentTab
  );
  const tabDashboardMapping = {
    Dashboard: (
      <DefaultDashboard
        session={session}
        accountCategoryDistributions={accountCategoryDistributions}
      />
    ),
    Accounts: <AccountsDashboard session={session} accounts={accounts} />,
    Transactions: (
      <TransactionsDashboard
        session={session}
        accounts={accounts}
        accountTransactions={accountTransactions}
      />
    ),
    Budgets: <BudgetsDashboard session={session} />,
  };
  return tabDashboardMapping[currentTab];
};

export default Dashboards;
