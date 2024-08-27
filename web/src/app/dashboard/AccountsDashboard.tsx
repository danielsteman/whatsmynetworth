import authOptions from "@/app/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewAccountButton from "../features/newAccount/NewAccountButton";

export default async function AccountsDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-lg font-medium">Accounts</div>
        </div>
        <div className="ml-auto">
          <NewAccountButton currentUser={session} />
        </div>
      </div>
    </div>
  );
}
