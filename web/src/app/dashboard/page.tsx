import Navigation from "@/app/features/navigation/Navigation";
import Portfolio from "@/app/features/portfolioQuickMenu/Portfolio";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { redirect } from "next/navigation";
import Dashboards from "../features/dashboard/Dashboards";

export interface Account {
  id: string;
  name: string;
  nature: string;
  balance: number;
  currency_code: string;
  extra?: {
    cards: string[];
    transactions_count: {
      posted: number;
      pending: number;
    };
  };
  connection_id: string;
  created_at: string;
  updated_at: string;
}

interface TransactionMetadata {
  merchantId: string;
  originalAmount: number;
  originalCurrencyCode: string;
  postingDate: string;
  time: string;
  id: string;
  type: string;
  payee: string;
  payer: string;
  additional: string;
  payerInformation: string;
  accountBalanceSnapshot: number;
  categorizationConfidence: number;
}

export interface Transaction {
  id: string;
  duplicated: boolean;
  mode: string;
  status: string;
  madeOn: string;
  amount: number;
  currencyCode: string;
  description: string;
  category: string;
  extra?: TransactionMetadata;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

const fetchAccounts = async (
  customerIdentifier: string
): Promise<Account[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: customerIdentifier }),
      }
    );
    const data = response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchTransactions = async (accountId: string): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_id: accountId.toString() }),
      }
    );
    const data = response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const accounts = await fetchAccounts(session.user.id);

  const accountTransactions: { [key: string]: Transaction[] } = {};

  const transactionsPromises = accounts.map(async (account) => {
    const transactions = await fetchTransactions(account.id);
    accountTransactions[account.name] = transactions;
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
        />
      </div>
    </>
  );
}
