export interface Account {
  id: string;
  name: string;
  nature: string;
  balance: number;
  currency_code: string;
  extra?: {
    cards: string[];
    transactions_count: {
      posted: number;
      pending: number;
    };
  };
  connection_id: string;
  created_at: string;
  updated_at: string;
}

export const getAccounts = async (
  customerIdentifier: string
): Promise<Account[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: customerIdentifier }),
      }
    );
    const data = response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
