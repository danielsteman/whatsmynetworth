import NewAccountButton from "../newAccount/NewAccountButton";
import { BudgetsDashboardProps } from "./Dashboards";

const BudgetsDashboard: React.FC<BudgetsDashboardProps> = ({ session }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Budgets</div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
    </div>
  );
};

export default BudgetsDashboard;
