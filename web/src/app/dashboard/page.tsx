import Navigation from "@/app/features/navigation/Navigation";
import Portfolio from "@/app/features/portfolioQuickMenu/Portfolio";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { redirect } from "next/navigation";
import Dashboards from "../features/dashboard/Dashboards";
import { getCategoryDistribution } from "./getCategoryDistribution";
import { getAccounts } from "../services/getAccounts";
import { fetchTransactions, Transaction } from "../services/getTransactions";

export interface Categories {
  [key: string]: number;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const accounts = await getAccounts(session.user.id);

  const accountTransactions: { [key: string]: Transaction[] } = {};
  const accountCategoryDistributions: { [key: string]: Categories } = {};

  const transactionsPromises = accounts.map(async (account) => {
    const transactions = await fetchTransactions(account.id);
    accountTransactions[account.name] = transactions;

    const categoryDistribution = await getCategoryDistribution(transactions);
    accountCategoryDistributions[account.name] = categoryDistribution;
  });

  await Promise.all(transactionsPromises);

  return (
    <>
      <div className="flex flex-row gap-8 p-8 w-full">
        <div className="flex flex-col gap-1 w-72">
          <Navigation />
          <div className="h-4" />
          <Portfolio />
        </div>
        <Dashboards
          session={session}
          accounts={accounts}
          accountTransactions={accountTransactions}
          accountCategoryDistributions={accountCategoryDistributions}
        />
      </div>
    </>
  );
}
