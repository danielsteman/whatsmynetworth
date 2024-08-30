"use client";

const SyncButton = () => {
  const syncTransactions = (connectionId: string) => {
    console.log(`Syncing... Using ${connectionId}`);
  };
  const connectionId = "";
  return (
    <button onClick={() => syncTransactions(connectionId)}>
      Sync transactions
    </button>
  );
};

export default SyncButton;
