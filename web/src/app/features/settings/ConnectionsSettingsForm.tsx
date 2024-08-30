"use client";

import { ConnectionsSettingsFormProps } from "./SettingsForm";

const ConnectionsSettingsForm: React.FC<ConnectionsSettingsFormProps> = ({
  connections,
}) => {
  console.log(connections);
  return (
    <div>
      <h2>Connections</h2>
      <div>
        {connections &&
          connections.map((con) => {
            return <div>hoi</div>;
          })}
      </div>
    </div>
  );
};

export default ConnectionsSettingsForm;
