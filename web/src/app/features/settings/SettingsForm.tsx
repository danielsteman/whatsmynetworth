"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsSettingsForm from "./AccountsSettingsForm";
import ConnectionsSettingsForm from "./ConnectionsSettingsForm";

const SettingsForm = () => {
  const selectedItem = useSelector(
    (state: RootState) => state.settingsMenu.selected
  );
  const settingsFormMapping = {
    Account: <AccountsSettingsForm />,
    Connections: <ConnectionsSettingsForm />,
  };
  return settingsFormMapping[selectedItem];
};

export default SettingsForm;
