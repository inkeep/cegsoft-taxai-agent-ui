export const inkeepConfig = {
  agentUrl: import.meta.env.VITE_INKEEP_AGENT_URL ?? "http://localhost:3003/api/chat",
  agentApiKey: import.meta.env.VITE_INKEEP_AGENT_API_KEY,
  taxesAiApiKey: import.meta.env.VITE_TAXESAI_API_KEY,
};
