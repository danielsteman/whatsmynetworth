"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsDashboard from "./AccountsDashboard";
import DefaultDashboard from "./DefaultDashboard";
import { Session } from "next-auth";
import TransactionsDashboard from "./TransactionsDashboard";
import { Account } from "../../dashboard/page";

export interface DashboardProps {
  session: Session;
}

export interface AccountsDashboardProps extends DashboardProps {
  accounts: Account[];
}

type CombinedDashboardProps = DashboardProps & AccountsDashboardProps;

const Dashboards: React.FC<CombinedDashboardProps> = ({
  session,
  accounts,
}) => {
  const currentTab = useSelector(
    (state: RootState) => state.navigation.currentTab
  );
  const tabDashboardMapping = {
    Dashboard: <DefaultDashboard session={session} />,
    Accounts: <AccountsDashboard session={session} accounts={accounts} />,
    Transactions: <TransactionsDashboard session={session} />,
  };
  return tabDashboardMapping[currentTab];
};

export default Dashboards;
