"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AccountsSettingsForm from "./AccountsSettingsForm";
import ConnectionsSettingsForm from "./ConnectionsSettingsForm";
import { Connection } from "@/app/services/getConnections";

export interface ConnectionsSettingsFormProps {
  connections: Connection[];
}

interface SettingsFormProps extends ConnectionsSettingsFormProps {}

const SettingsForm: React.FC<SettingsFormProps> = ({ connections }) => {
  const selectedItem = useSelector(
    (state: RootState) => state.settingsMenu.selected
  );
  const settingsFormMapping = {
    Account: <AccountsSettingsForm />,
    Connections: <ConnectionsSettingsForm connections={connections} />,
  };
  return settingsFormMapping[selectedItem];
};

export default SettingsForm;
