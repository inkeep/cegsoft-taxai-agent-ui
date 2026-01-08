import type { Client } from "../types";

interface ClientInfoProps {
  client?: Client;
}

export function ClientInfo({ client }: ClientInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Selected Client Information
      </h2>
      {client ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-600">Full Name</p>
            <p>{client.fullName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Email</p>
            <p>{client.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Phone</p>
            <p>{client.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">ID</p>
            <p>{client.id}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No client selected. Choose a client to view details.
        </p>
      )}
    </div>
  );
}
