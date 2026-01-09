import {
  InkeepChatButton,
  type InkeepChatButtonProps,
} from "@inkeep/agents-ui";

interface ChatSectionProps {
  aiChatSettings?: InkeepChatButtonProps["aiChatSettings"];
  selectedReturnId: string;
  isChatOpen: boolean;
  onChatOpenChange: (isOpen: boolean) => void;
}

export function ChatSection({
  aiChatSettings,
  selectedReturnId,
  isChatOpen,
  onChatOpenChange,
}: ChatSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Chat with TaxesAI
          </h2>
          <p className="text-sm text-gray-600">
            The selected return ID will be passed in the request headers and
            context so the agent can respond with return-specific data.
          </p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p className="font-semibold text-gray-700">Selected Record</p>
          <p className="break-all">{selectedReturnId || "None selected"}</p>
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
            onOpenChange: onChatOpenChange,
          }}
        />
      ) : (
        <p className="text-sm text-red-600">
          Chat settings are not initialized. Please check authentication.
        </p>
      )}
    </div>
  );
}
