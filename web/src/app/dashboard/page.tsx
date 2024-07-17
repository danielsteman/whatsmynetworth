import Navigation from "@/app/features/navigation/Navigation";
import Portfolio from "@/app/features/portfolioQuickMenu/Portfolio";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-8 p-8">
      <div className="flex flex-col gap-1 w-72">
        <Navigation />
        <div className="h-8" />
        <Portfolio />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>Welcome back, Daniel</div>
          <div>New account</div>
        </div>
        <div>No accounts yet</div>
      </div>
    </div>
  );
}
