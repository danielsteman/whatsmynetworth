import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../auth";
import SettingsSideMenu from "../features/settings/SettingsSideMenu";
import SettingsForm from "../features/settings/SettingsForm";
import { getConnections } from "../services/getConnections";

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
