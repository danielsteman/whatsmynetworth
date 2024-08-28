import SettingsSideMenu from "../features/settings/settingsSideMenu";

const Settings = () => {
  return (
    <div className="flex flex-row p-8 gap-24">
      <SettingsSideMenu />
      <div>
        <h2>Account</h2>
      </div>
    </div>
  );
};

export default Settings;
