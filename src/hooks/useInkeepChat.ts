import { useMemo, useEffect } from "react";
import type { InkeepChatButtonProps } from "@inkeep/agents-ui";
import { inkeepConfig } from "../config/inkeep";

export function useInkeepChat(jwtToken: string, selectedReturnId: string) {
  const aiChatSettings: InkeepChatButtonProps["aiChatSettings"] | undefined =
    useMemo(() => {
      if (!jwtToken) {
        console.log("Chat not initialized yet - no JWT token.");
        return undefined;
      }

      const headers: Record<string, string> = {
        // Inkeep headers
        "x-emit-operations": "true", // enables status updates (e.g., tool usage updates)

        // TaxesAI agent headers
        "jwt-authentication-token": `Bearer ${jwtToken}`,
        "x-api-key": inkeepConfig.taxesAiApiKey,
      };

      if (selectedReturnId) {
        headers["return-id"] = selectedReturnId;
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
        jwtTokenPreview: "..." + jwtToken.slice(-50),
      });

      return {
        agentUrl: inkeepConfig.agentUrl,
        apiKey: inkeepConfig.agentApiKey,
        headers,
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
