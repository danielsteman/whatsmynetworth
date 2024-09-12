"use client";

import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

interface SyncButtonProps {
  connectionId: string;
}

const SyncButton: React.FC<SyncButtonProps> = ({ connectionId }) => {
  const [syncing, setSyncing] = useState<boolean>(false);

  const syncTransactions = (connectionId: string) => {
    setSyncing(!syncing);
    console.log(`Syncing... using ${connectionId}`);
  };

  const syncIconStyle = syncing ? "animate-spin" : "";

  const baseButtonStyle =
    "flex flex-row gap-2 items-center p-2 rounded-md hover:bg-neutral-200";
  const additionalButtonStyle = syncing ? "bg-neutral-100" : "";
  const buttonStyle = `${baseButtonStyle} ${additionalButtonStyle}`;

  return (
    <button onClick={() => syncTransactions(connectionId)}>
      <div className={buttonStyle}>
        <FaSyncAlt className={syncIconStyle} />
        <span>Sync transactions</span>
      </div>
    </button>
  );
};

export default SyncButton;
