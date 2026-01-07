import { useEffect, useMemo, useState } from "react";
import {
  InkeepChatButton,
  type InkeepChatButtonProps,
} from "@inkeep/agents-ui";

const tenantId = import.meta.env.VITE_INKEEP_TENANT_ID ?? "default";
const projectId =
  import.meta.env.VITE_INKEEP_PROJECT_ID ?? "cegsoft-pilot-project";
const agentId = import.meta.env.VITE_INKEEP_AGENT_ID ?? "taxesai-pilot-agent";
const agentUrlFromEnv =
  import.meta.env.VITE_INKEEP_AGENT_URL ?? "http://localhost:3003/api/chat";
const agentApiKey = import.meta.env.VITE_INKEEP_AGENT_API_KEY;

type TaxReturn = {
  id: string;
  title: string;
  type: string;
  taxYear: string;
  lastAccessed: string;
  created: string;
};

type Client = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  taxReturns: TaxReturn[];
};

const clients: Client[] = [
  {
    id: "60fe9215-3f9f-4600-8bb8-02c0b4e362c2",
    fullName: "Juan Lopez",
    phone: "7870996778",
    email: "juanlopez90@gmail.com",
    taxReturns: [
      {
        id: "f831b980-3f13-439d-bcd0-3c6a91044498",
        title:
          "Planilla de Contribución Sobre Ingresos de Individuos - Forma Única",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2024",
        lastAccessed: "12/17/2025",
        created: "12/15/2025",
      },
    ],
  },
  {
    id: "aabddc15-25d4-4f9a-9476-9ec0584180ec",
    fullName: "Anna Parker",
    phone: "7871111112",
    email: "anna@parker.com",
    taxReturns: [
      {
        id: "77ad23b4-1247-452a-a77e-aee482bff74e",
        title:
          "Planilla de Contribución Sobre Ingresos de Individuos - Forma Única",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2024",
        lastAccessed: "12/12/2025",
        created: "12/12/2025",
      },
      {
        id: "9dfb6860-cacd-4ef5-8935-91e2b265fd14",
        title: "Esc 1003",
        type: "Individual Income Tax Return - Unique Form (F482)",
        taxYear: "2025",
        lastAccessed: "12/15/2025",
        created: "12/15/2025",
      },
    ],
  },
];

export default function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>(
    clients[0]?.id ?? ""
  );
  const [selectedReturnId, setSelectedReturnId] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId),
    [selectedClientId]
  );

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    setSelectedReturnId("");
  };

  useEffect(() => {
    console.log("[Inkeep Demo] Loaded env config", {
      tenantId,
      projectId,
      agentId,
      agentUrl: agentUrlFromEnv,
      hasAgentApiKey: Boolean(agentApiKey),
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Inkeep Demo] Submitting credentials", {
      jwtTokenLength: jwtToken.length,
      apiKeyLength: apiKey.length,
    });
    if (jwtToken && apiKey) {
      setIsInitialized(true);
    } else {
      console.warn(
        "[Inkeep Demo] Missing jwtToken or apiKey; chat will not initialize."
      );
    }
  };

  const aiChatSettings: InkeepChatButtonProps["aiChatSettings"] | undefined =
    useMemo(() => {
      if (!isInitialized) {
        console.log("[Inkeep Demo] Chat not initialized yet.");
        return undefined;
      }

      const headers: Record<string, string> = {
        // Standard Inkeep headers
        "x-inkeep-tenant-id": tenantId,
        "x-inkeep-project-id": projectId,
        "x-inkeep-agent-id": agentId,

        // TaxesAI agent custom headers (matching the requestHeaders schema)
        "jwt-authentication-token": `Bearer ${jwtToken}`,
        "x-api-key": apiKey,
      };

      if (selectedReturnId) {
        headers["return-id"] = selectedReturnId;
      }

      console.log("[Inkeep Demo] Building InkeepChatButton props", {
        tenantId,
        projectId,
        agentId,
        agentUrl: agentUrlFromEnv,
        agentApiKey: agentApiKey,
        hasAgentApiKey: Boolean(agentApiKey),
        headerKeys: Object.keys(headers),
        hasSelectedReturn: Boolean(selectedReturnId),
      });

      return {
        agentUrl: agentUrlFromEnv,
        apiKey: agentApiKey,
        headers,
        context: selectedReturnId
          ? { "return-id": selectedReturnId }
          : undefined,
        placeholder: "Ask me anything about taxes...",
        introMessage:
          "Hi! I'm your TaxesAI assistant. Select a return and start chatting.",
      };
    }, [isInitialized, jwtToken, apiKey, selectedReturnId]);

  useEffect(() => {
    console.log("[Inkeep Demo] Updated return selection", {
      selectedReturnId,
      hasReturnId: Boolean(selectedReturnId),
    });
  }, [selectedReturnId]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                CEGsoft TaxesAI Demo
              </h1>
              <p className="text-lg text-gray-600">
                Enter your credentials to start chatting with the TaxesAI assistant
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="jwtToken"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    JWT Authentication Token <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="jwtToken"
                    value={jwtToken}
                    onChange={(e) => setJwtToken(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black placeholder:text-gray-400"
                    placeholder="Enter JWT token"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    API Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black placeholder:text-gray-400"
                    placeholder="Enter API key"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Start Chat
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> Your credentials will be passed
                  securely to the TaxesAI agent for authentication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                CEGsoft TaxesAI Assistant
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AI Tax Assistant
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Ask questions about your tax returns, Form 482, and Puerto Rico tax regulations.
            </p>
            <button
              onClick={() => setIsInitialized(false)}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Change credentials
            </button>
          </div>

          <div className="grid gap-6">
            {/* Client Selector */}
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
                onChange={(e) => handleClientChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.fullName} ({client.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Selected Client Information
              </h2>
              {selectedClient ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-600">Full Name</p>
                    <p>{selectedClient.fullName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Email</p>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Phone</p>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">ID</p>
                    <p>{selectedClient.id}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No client selected. Choose a client to view details.
                </p>
              )}
            </div>

            {/* Tax Returns */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tax Returns</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Click a return to pass its record ID to the agent</span>
                  <button
                    type="button"
                    onClick={() => setSelectedReturnId("")}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
              {selectedClient?.taxReturns?.length ? (
                <div className="space-y-3">
                  {selectedClient.taxReturns.map((taxReturn) => {
                    const isSelected = taxReturn.id === selectedReturnId;
                    return (
                      <button
                        key={taxReturn.id}
                        onClick={() => setSelectedReturnId(taxReturn.id)}
                        className={`w-full text-left rounded-xl border transition shadow-sm px-5 py-4 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/60"
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {taxReturn.title}
                            </h3>
                            {isSelected ? (
                              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                                Selected
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                Select
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{taxReturn.type}</p>
                          <p className="text-sm text-gray-700 break-all">
                            Return ID: {taxReturn.id}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>Tax Year: {taxReturn.taxYear}</span>
                            <span>Last Accessed: {taxReturn.lastAccessed}</span>
                            <span>Created: {taxReturn.created}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No tax returns available for this client.
                </p>
              )}
            </div>

            {/* Chat Button */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Chat with TaxesAI
                  </h2>
                  <p className="text-sm text-gray-600">
                    The selected return ID will be passed in the request headers and context so the agent can respond with return-specific data.
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p className="font-semibold text-gray-700">Selected Record</p>
                  <p className="break-all">
                    {selectedReturnId || "None selected"}
                  </p>
                </div>
              </div>
              {aiChatSettings ? (
                <InkeepChatButton
                  baseSettings={{
                    organizationDisplayName: "CEGsoft TaxesAI",
                    primaryBrandColor: "#2563eb",
                    colorMode: { forcedColorMode: "light" },
                  }}
                  aiChatSettings={aiChatSettings}
                  openSettings={{
                    isOpen: isChatOpen,
                    onOpenChange: setIsChatOpen,
                  }}
                />
              ) : (
                <p className="text-sm text-red-600">
                  Chat settings are not initialized. Please re-enter credentials.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Management API
              </a>{" "}
              •
              <a
                href="http://localhost:3003"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700 ml-1"
              >
                Run API
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
