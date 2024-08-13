import Navigation from "@/app/features/navigation/Navigation";
import Portfolio from "@/app/features/portfolioQuickMenu/Portfolio";
import NewAccountButton from "../features/newAccount/NewAccountButton";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-8 p-8 w-full">
      <div className="flex flex-col gap-1 w-72">
        <Navigation />
        <div className="h-4" />
        <Portfolio />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="text-lg font-medium">Welcome back</div>
            <div className="text-sm text-neutral-500">
              Here's what's happening today
            </div>
          </div>
          <div className="ml-auto">
            <NewAccountButton />
          </div>
        </div>
        <div>...</div>
      </div>
    </div>
  );
}
