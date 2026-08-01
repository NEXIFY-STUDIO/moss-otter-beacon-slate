import { useEffect, useRef } from "react";
import { useAgentStore } from "@/stores/use-agent-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ChatThread(): React.JSX.Element {
  const messages = useAgentStore((s) => s.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-3"
      role="log"
      aria-label="Chat thread"
      aria-live="polite"
    >
      {messages.length === 0 && (
        <div className="text-center py-8 px-4 border-2 border-dashed border-charcoal/15 dark:border-cream/15">
          <p className="font-serif text-base text-charcoal dark:text-cream">
            Start a conversation
          </p>
          <p className="text-xs text-charcoal/55 dark:text-cream/50 mt-1 leading-relaxed">
            Popíš UI zmenu — G0→G1→G2 pipeline pripraví diff na schválenie.
          </p>
        </div>
      )}
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <article
            key={msg.id}
            className={cn(
              "border-2 px-3 py-2.5 text-sm leading-relaxed max-w-[95%]",
              isUser
                ? "ml-auto border-charcoal dark:border-cream/25 bg-terracotta text-white shadow-brutal-sm"
                : "mr-auto border-charcoal/15 dark:border-cream/15 bg-cream dark:bg-slate-card text-charcoal dark:text-cream shadow-brutal-sm",
            )}
          >
            {!isUser && msg.agentType && (
              <Badge variant="accent" className="mb-1.5">
                {msg.agentType}
              </Badge>
            )}
            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            {msg.attachments && msg.attachments.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {msg.attachments.map((a) => (
                  <img
                    key={a.id}
                    src={a.previewUrl}
                    alt={a.name}
                    className="h-14 w-14 object-cover border-2 border-white/40"
                  />
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
      <div ref={bottomRef} className="h-px" />
    </div>
  );
}
