"use client";

import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

interface SyncButtonProps {
  identifier: string;
}

const SyncButton: React.FC<SyncButtonProps> = ({ identifier }) => {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const syncTransactions = async (identifier: string) => {
    setSyncing(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/transactions/sync`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier: identifier }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unknown error occurred.");
    } finally {
      setSyncing(false);
    }
  };

  const syncIconStyle = syncing ? "animate-spin" : "";

  const baseButtonStyle =
    "flex flex-row gap-2 items-center p-2 rounded-md hover:bg-neutral-200";
  const additionalButtonStyle = syncing ? "bg-neutral-100" : "";
  const buttonStyle = `${baseButtonStyle} ${additionalButtonStyle}`;

  return (
    <>
      <button onClick={() => syncTransactions(identifier)}>
        <div className={buttonStyle}>
          <FaSyncAlt className={syncIconStyle} />
          <span>Sync transactions</span>
        </div>
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default SyncButton;
