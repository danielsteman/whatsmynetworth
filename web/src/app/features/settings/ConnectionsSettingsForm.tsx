"use client";

import { ConnectionsSettingsFormProps } from "./SettingsForm";

const ConnectionsSettingsForm: React.FC<ConnectionsSettingsFormProps> = ({
  connections,
}) => {
  if (!connections || connections.length === 0) {
    return <p>No connections available.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="px-4 py-2 font-semibold text-md w-full bg-neutral-100 rounded-lg">
        Connections
      </h2>
      <table className="table-auto w-full bg-neutral-100 rounded-lg">
        <thead>
          <tr>
            {["ID", "Created At", "Status"].map((header) => (
              <th key={header} className="text-left text-sm px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {connections
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((conn) => (
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
