export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>Logo</div>
          <div>Avatar</div>
        </div>
        <div>Dashboard</div>
        <div>Accounts</div>
        <div>Transactions</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>Welcome back, Daniel</div>
          <div>New account</div>
        </div>
        <div>No accounts yet</div>
      </div>
    </div>
  );
}
