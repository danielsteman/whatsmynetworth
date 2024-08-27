import Navigation from "@/app/features/navigation/Navigation";
import Portfolio from "@/app/features/portfolioQuickMenu/Portfolio";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { redirect } from "next/navigation";
import { makeStore } from "@/lib/store";
import DefaultDashboard from "./DefaultDashboard";
import AccountsDashboard from "./AccountsDashboard";
import Dashboards from "./Dashboards";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-row gap-8 p-8 w-full">
        <div className="flex flex-col gap-1 w-72">
          <Navigation />
          <div className="h-4" />
          <Portfolio />
        </div>
        <Dashboards session={session} />
      </div>
    </>
  );
}
