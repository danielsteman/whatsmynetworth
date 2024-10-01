import { Result } from "./categoryDistribution";

// A simple utility function to map categories to unique Tailwind colors
const getCategoryColor = (category: string): string => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "teal",
  ];
  const index = Math.abs(category.charCodeAt(0) % colors.length);
  return colors[index];
};

interface CategoryAggregatesListProps {
  aggregatedCategoryDistribution: Result;
}

const CategoryAggregatesList: React.FC<CategoryAggregatesListProps> = ({
  aggregatedCategoryDistribution,
}) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden p-2">
      <div className="text-lg font-medium p-4">Categories</div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="font-medium text-neutral-500 text-sm text-left p-2">
              Category
            </th>
            <th className="font-medium text-neutral-500 text-sm text-left p-2">
              Count
            </th>
            <th className="font-medium text-neutral-500 text-sm text-left p-2">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(aggregatedCategoryDistribution).map(
            ([category, stats]) => {
              const color = getCategoryColor(category);
              return (
                <tr className="border-b border-neutral-200" key={category}>
                  <td className="p-2 ">
                    <div
                      className={`w-fit h-fit p-1 px-2 rounded-md bg-${getCategoryColor(
                        category
                      )}-100`}
                    >
                      {category}
                    </div>
                  </td>
                  <td className="px-4 py-2">{stats.count}</td>
                  <td className="px-4 py-2">{stats.percentage}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryAggregatesList;
