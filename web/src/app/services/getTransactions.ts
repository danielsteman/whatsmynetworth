interface TransactionMetadata {
  merchantId: string;
  originalAmount: number;
  originalCurrencyCode: string;
  postingDate: string;
  time: string;
  id: string;
  type: string;
  payee: string;
  payer: string;
  additional: string;
  payerInformation: string;
  accountBalanceSnapshot: number;
  categorizationConfidence: number;
}

export interface Transaction {
  id: string;
  duplicated: boolean;
  mode: string;
  status: string;
  madeOn: string;
  amount: number;
  currencyCode: string;
  description: string;
  category: string;
  extra?: TransactionMetadata;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchTransactions = async (
  accountId: string
): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_id: accountId.toString() }),
      }
    );
    const data = response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
