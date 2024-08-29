import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../auth";
import SettingsSideMenu from "../features/settings/SettingsSideMenu";

const Settings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/connections`;
  // fetch()
  console.log(session.user.id);
  return (
    <div className="flex flex-row p-8 gap-12">
      <SettingsSideMenu />
      <div>
        <h2>Account</h2>
      </div>
    </div>
  );
};

export default Settings;
