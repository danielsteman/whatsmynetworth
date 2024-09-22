import { Transaction } from "../services/getTransactions";

interface CategoryInfo {
  count: number;
  percentage: number;
}

export interface Categories {
  [key: string]: CategoryInfo;
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
