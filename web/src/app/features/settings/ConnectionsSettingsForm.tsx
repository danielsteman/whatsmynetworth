"use client";

import { ConnectionsSettingsFormProps } from "./SettingsForm";

const ConnectionsSettingsForm: React.FC<ConnectionsSettingsFormProps> = ({
  connections,
}) => {
  if (!connections || connections.length === 0) {
    return <p>No connections available.</p>;
  }
  return (
    <div>
      <h2>Connections</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {["ID", "Created At", "Status"].map((header) => (
              <th key={header} className="text-left px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {connections.map((conn) => (
            <tr key={conn.id}>
              <td className="px-4 py-2">{conn.id}</td>
              <td className="px-4 py-2">
                {new Date(conn.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2">{conn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnectionsSettingsForm;
