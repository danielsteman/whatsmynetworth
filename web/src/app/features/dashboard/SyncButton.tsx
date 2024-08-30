"use client";

import { FaSyncAlt } from "react-icons/fa";

interface SyncButtonProps {
  connectionId: string;
}

const SyncButton: React.FC<SyncButtonProps> = ({ connectionId }) => {
  const syncTransactions = (connectionId: string) => {
    console.log(`Syncing... using ${connectionId}`);
  };
  return (
    <button onClick={() => syncTransactions(connectionId)}>
      <div className="flex flex-row gap-2 items-center p-2 rounded-md hover:bg-neutral-200">
        <FaSyncAlt />
        <span>Sync transactions</span>
      </div>
    </button>
  );
};

export default SyncButton;
