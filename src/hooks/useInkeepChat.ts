import { useMemo, useEffect } from "react";
import type { InkeepChatButtonProps } from "@inkeep/agents-ui";
import { inkeepConfig } from "../config/inkeep";

export function useInkeepChat(jwtToken: string, selectedReturnId: string) {
  const aiChatSettings: InkeepChatButtonProps["aiChatSettings"] | undefined =
    useMemo(() => {
      if (!jwtToken) {
        console.log("[Inkeep Demo] Chat not initialized yet - no JWT token.");
        return undefined;
      }

      const headers: Record<string, string> = {
        // Standard Inkeep headers
        "x-inkeep-tenant-id": inkeepConfig.tenantId,
        "x-inkeep-project-id": inkeepConfig.projectId,
        "x-inkeep-agent-id": inkeepConfig.agentId,
        "x-emit-operations": "true", // enables status updates (e.g., tool usage updates)

        // TaxesAI agent custom headers (matching the requestHeaders schema)
        "jwt-authentication-token": `Bearer ${jwtToken}`,
        "x-api-key": inkeepConfig.taxesAiApiKey,
      };

      if (selectedReturnId) {
        headers["return-id"] = selectedReturnId;
      }
      // Build context object with both return-id and jwt-token
      const context: Record<string, string> = {
        "jwt-token": jwtToken,
      };
      if (selectedReturnId) {
        context["return-id"] = selectedReturnId;
      }

      console.log("[Inkeep Demo] Building InkeepChatButton props", {
        tenantId: inkeepConfig.tenantId,
        projectId: inkeepConfig.projectId,
        agentId: inkeepConfig.agentId,
        agentUrl: inkeepConfig.agentUrl,
        agentApiKey: inkeepConfig.agentApiKey,
        hasAgentApiKey: Boolean(inkeepConfig.agentApiKey),
        headerKeys: Object.keys(headers),
        hasSelectedReturn: Boolean(selectedReturnId),
        contextKeys: Object.keys(context),
        jwtTokenPreview: "..." + jwtToken.slice(-50),
      });

      return {
        agentUrl: inkeepConfig.agentUrl,
        apiKey: inkeepConfig.agentApiKey,
        headers,
        context,
        placeholder: "Ask me anything about taxes...",
        introMessage:
          "Hi! I'm your TaxesAI assistant. Select a return and start chatting.",
      };
    }, [jwtToken, selectedReturnId]);

  useEffect(() => {
    console.log("[Inkeep Demo] Context updated", {
      selectedReturnId,
      hasReturnId: Boolean(selectedReturnId),
      hasJwtToken: Boolean(jwtToken),
      jwtTokenPreview: jwtToken ? "..." + jwtToken.slice(-30) : "none",
    });
  }, [selectedReturnId, jwtToken]);

  return { aiChatSettings };
}
