import { Circle } from "lucide-react";
import { useAgentStore } from "@/stores/use-agent-store";
import { formatLatency, cn } from "@/lib/utils";

export function AgentStatus(): React.JSX.Element {
  const agents = useAgentStore((s) => s.agents);
  const latencyMs = useAgentStore((s) => s.latencyMs);
  const tokensUsed = useAgentStore((s) => s.tokensUsed);
  const isStreaming = useAgentStore((s) => s.isStreaming);

  return (
    <div className="border-b-2 border-charcoal/10 dark:border-cream/10 px-3 py-2.5 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-charcoal/50 dark:text-cream/45">
          Agents
        </p>
        <span className="text-[10px] font-mono tabular-nums text-charcoal/45 dark:text-cream/40">
          {formatLatency(latencyMs)} · {tokensUsed}t
        </span>
      </div>
      <ul className="space-y-1.5" aria-live="polite">
        {agents.map((agent) => (
          <li
            key={agent.type}
            className="flex items-center gap-2 text-xs"
          >
            <Circle
              className={cn(
                "h-2.5 w-2.5 shrink-0 fill-current",
                agent.state === "running" && "text-terracotta animate-pulse",
                agent.state === "success" && "text-diff-add-text",
                agent.state === "error" && "text-diff-del-text",
                agent.state === "idle" && "text-charcoal/30 dark:text-cream/30",
              )}
              aria-hidden
            />
            <span className="font-semibold w-6 text-charcoal dark:text-cream">
              {agent.type}
            </span>
            <span className="truncate text-charcoal/60 dark:text-cream/55">
              {agent.message ?? agent.label}
            </span>
            {agent.latencyMs !== undefined && (
              <span className="ml-auto font-mono tabular-nums text-charcoal/40 dark:text-cream/35">
                {agent.latencyMs}ms
              </span>
            )}
          </li>
        ))}
      </ul>
      {isStreaming && (
        <p className="text-[11px] text-terracotta font-medium animate-pulse">
          Streaming pipeline…
        </p>
      )}
    </div>
  );
}
