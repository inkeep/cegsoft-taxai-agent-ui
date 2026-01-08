import { useState, useMemo } from "react";
import type { Client } from "../types";

export function useClientSelection(clients: Client[]) {
  const [selectedClientId, setSelectedClientId] = useState<string>(
    clients[0]?.id ?? ""
  );
  const [selectedReturnId, setSelectedReturnId] = useState<string>("");

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId),
    [clients, selectedClientId]
  );

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    setSelectedReturnId("");
  };

  return {
    selectedClientId,
    selectedClient,
    selectedReturnId,
    handleClientChange,
    setSelectedReturnId,
  };
}
