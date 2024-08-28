import SettingsSideMenu from "../features/settings/SettingsSideMenu";

const Settings = () => {
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
