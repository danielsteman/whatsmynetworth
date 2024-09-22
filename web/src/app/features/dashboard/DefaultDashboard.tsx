import NewAccountButton from "../newAccount/NewAccountButton";
import { sumCategoryDistributions } from "./categoryDistribution";

import { DefaultDashboardProps } from "./Dashboards";
import DoughnutChart from "@/app/components/charts/DoughnutChart";

const DefaultDashboard: React.FC<DefaultDashboardProps> = ({
  session,
  accountCategoryDistributions,
}) => {
  const aggregatedCategoryDistribution = sumCategoryDistributions(
    accountCategoryDistributions
  );
  const countValues = Object.values(aggregatedCategoryDistribution).map(
    (item) => item.count
  );

  console.log(aggregatedCategoryDistribution);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center">
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
      <div className="grid grid-cols-3 gap-4 pt-8">
        <div>
          <DoughnutChart
            data={countValues}
            labels={Object.keys(aggregatedCategoryDistribution)}
            title="Categories"
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
