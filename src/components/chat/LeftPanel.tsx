import { AgentStatus } from "@/components/chat/AgentStatus";
import { ChatThread } from "@/components/chat/ChatThread";
import { PromptInput } from "@/components/chat/PromptInput";

export function LeftPanel(): React.JSX.Element {
  return (
    <aside className="h-full flex flex-col bg-cream dark:bg-slate border-r border-charcoal/5 dark:border-cream/5 min-h-0 overflow-hidden">
      <div className="px-3 py-2 border-b-2 border-charcoal/10 dark:border-cream/10 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-charcoal/50 dark:text-cream/45">
          Chat & Agents
        </p>
        <h2 className="font-serif text-sm font-semibold text-charcoal dark:text-cream">
          Conversation
        </h2>
      </div>
      <div className="shrink-0">
        <AgentStatus />
      </div>
      <ChatThread />
      <div className="shrink-0">
        <PromptInput />
      </div>
    </aside>
  );
}
