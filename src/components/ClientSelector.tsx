import type { Client } from "../types";

interface ClientSelectorProps {
  clients: Client[];
  selectedClientId: string;
  onClientChange: (clientId: string) => void;
}

export function ClientSelector({
  clients,
  selectedClientId,
  onClientChange,
}: ClientSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <label
        htmlFor="clientSelect"
        className="block text-base font-semibold text-gray-800 mb-3"
      >
        Select a Client
      </label>
      <select
        id="clientSelect"
        value={selectedClientId}
        onChange={(e) => onClientChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      >
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.fullName} ({client.email})
          </option>
        ))}
      </select>
    </div>
  );
}
