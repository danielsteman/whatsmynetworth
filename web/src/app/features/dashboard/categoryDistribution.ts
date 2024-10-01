import { Transaction } from "../../services/getTransactions";

export interface CategoryInfo {
  count: number;
  percentage: number;
}

export interface Categories {
  [key: string]: CategoryInfo;
}

interface InputData {
  [account: string]: {
    [category: string]: CategoryInfo;
  };
}

export interface Result {
  [category: string]: CategoryInfo;
}

export const getCategoryDistribution = async (
  accountTransactions: Transaction[]
): Promise<Categories> => {
  const categoryCounts: { [key: string]: number } = {};

  accountTransactions.forEach((transaction) => {
    const category = transaction.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const totalTransactions = accountTransactions.length;
  const categoryDistribution: Categories = {};

  for (const category in categoryCounts) {
    if (categoryCounts.hasOwnProperty(category)) {
      const count = categoryCounts[category];
      const percentage = ((count / totalTransactions) * 100).toFixed(2);
      categoryDistribution[category] = {
        count: count,
        percentage: parseFloat(percentage),
      };
    }
  }

  return categoryDistribution;
};

export function sumCategoryDistributions(data: InputData): Result {
  const result: Result = {};
  let totalSum = 0;

  for (const account in data) {
    const categories = data[account];

    for (const category in categories) {
      const count = categories[category].count || 0;
      totalSum += count;

      if (!result[category]) {
        result[category] = { count: 0, percentage: 0 };
      }
      result[category].count += count;
    }
  }

  for (const category in result) {
    result[category].percentage =
      totalSum > 0 ? (result[category].count / totalSum) * 100 : 0;
  }

  return result;
}
