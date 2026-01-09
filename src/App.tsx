import { useEffect, useState } from "react";
import { clients } from "./data/clients";
import { inkeepConfig } from "./config/inkeep";
import { useAuth } from "./hooks/useAuth";
import { useClientSelection } from "./hooks/useClientSelection";
import { useInkeepChat } from "./hooks/useInkeepChat";
import { LoadingScreen } from "./components/LoadingScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { Header } from "./components/Header";
import { ClientSelector } from "./components/ClientSelector";
import { ClientInfo } from "./components/ClientInfo";
import { TaxReturnsList } from "./components/TaxReturnsList";
import { ChatSection } from "./components/ChatSection";

export default function App() {
  const { jwtToken, isLoading, authError, retry } = useAuth();
  const clientSelection = useClientSelection(clients);
  const { aiChatSettings, isReady } = useInkeepChat(jwtToken, clientSelection.selectedReturnId);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    console.log("[Inkeep Demo] Loaded env config", {
      tenantId: inkeepConfig.tenantId,
      projectId: inkeepConfig.projectId,
      agentId: inkeepConfig.agentId,
      agentUrl: inkeepConfig.agentUrl,
      hasAgentApiKey: Boolean(inkeepConfig.agentApiKey),
      hasTaxesAiApiKey: Boolean(inkeepConfig.taxesAiApiKey),
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (authError) {
    return <ErrorScreen error={authError} onRetry={retry} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="grid gap-6">
            <ClientSelector
              clients={clients}
              selectedClientId={clientSelection.selectedClientId}
              onClientChange={clientSelection.handleClientChange}
            />
            <ClientInfo client={clientSelection.selectedClient} />
            <TaxReturnsList
              taxReturns={clientSelection.selectedClient?.taxReturns}
              selectedReturnId={clientSelection.selectedReturnId}
              onSelectReturn={clientSelection.setSelectedReturnId}
              onClearSelection={() => clientSelection.setSelectedReturnId("")}
            />
            <ChatSection
              aiChatSettings={aiChatSettings}
              selectedReturnId={clientSelection.selectedReturnId}
              isChatOpen={isChatOpen}
              onChatOpenChange={setIsChatOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
