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

const fetchAccounts = async (
  customerIdentifier: string
): Promise<Account[]> => {
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
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const accounts = await fetchAccounts(session.user.id);
  console.log(accounts);

  return (
    <>
      <div className="flex flex-row gap-8 p-8 w-full">
        <div className="flex flex-col gap-1 w-72">
          <Navigation />
          <div className="h-4" />
          <Portfolio />
        </div>
        <Dashboards session={session} accounts={accounts} />
      </div>
    </>
  );
}
