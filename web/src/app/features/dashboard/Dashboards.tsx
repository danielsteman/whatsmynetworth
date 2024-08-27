"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsDashboard from "./AccountsDashboard";
import DefaultDashboard from "./DefaultDashboard";
import { Session } from "next-auth";
import TransactionsDashboard from "./TransactionsDashboard";

export interface DashboardsProps {
  session: Session;
}

const Dashboards: React.FC<DashboardsProps> = ({ session }) => {
  const currentTab = useSelector(
    (state: RootState) => state.navigation.currentTab
  );
  const tabDashboardMapping = {
    Dashboard: <DefaultDashboard session={session} />,
    Accounts: <AccountsDashboard session={session} />,
    Transactions: <TransactionsDashboard session={session} />,
  };
  return tabDashboardMapping[currentTab];
};

export default Dashboards;
