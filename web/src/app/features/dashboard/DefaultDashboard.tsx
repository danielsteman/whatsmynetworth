import NewAccountButton from "../newAccount/NewAccountButton";
import CategoryAggregatesList from "./CategoryAggregatesList";
import { sumCategoryDistributions } from "./categoryDistribution";

import { DefaultDashboardProps } from "./Dashboards";
import HorizontalBarChart from "@/app/components/charts/HorizontalBarChart";

const DefaultDashboard: React.FC<DefaultDashboardProps> = ({
  session,
  accountCategoryDistributions,
}) => {
  const aggregatedCategoryDistribution = sumCategoryDistributions(
    accountCategoryDistributions
  );
  const counts = Object.values(aggregatedCategoryDistribution).map(
    (item) => item.count
  );
  const labels = Object.keys(aggregatedCategoryDistribution);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Welcome back</div>
          <div className="text-sm text-neutral-500">
            Here's what's happening today
          </div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
      <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4 pt-8">
        <div>
          <CategoryAggregatesList
            aggregatedCategoryDistribution={aggregatedCategoryDistribution}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
