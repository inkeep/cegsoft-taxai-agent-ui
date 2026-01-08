export const inkeepConfig = {
  tenantId: import.meta.env.VITE_INKEEP_TENANT_ID ?? "default",
  projectId: import.meta.env.VITE_INKEEP_PROJECT_ID ?? "cegsoft-pilot-project",
  agentId: import.meta.env.VITE_INKEEP_AGENT_ID ?? "taxesai-pilot-agent",
  agentUrl: import.meta.env.VITE_INKEEP_AGENT_URL ?? "http://localhost:3003/api/chat",
  agentApiKey: import.meta.env.VITE_INKEEP_AGENT_API_KEY,
  taxesAiApiKey: import.meta.env.VITE_TAXESAI_API_KEY,
};
