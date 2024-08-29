import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../auth";
import SettingsSideMenu from "../features/settings/SettingsSideMenu";
import SettingsForm from "../features/settings/SettingsForm";

const getConnections = async (customerIdentifier: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/connections`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: customerIdentifier }),
  });
  const connections = await response.json();
  return connections;
};

const Settings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const connections = await getConnections(session.user.id);
  // console.log(connections);
  return (
    <div className="flex flex-row p-8 gap-12">
      <SettingsSideMenu />
      <SettingsForm />
    </div>
  );
};

export default Settings;
