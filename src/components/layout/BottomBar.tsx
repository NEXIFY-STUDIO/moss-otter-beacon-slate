import { Command, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/stores/use-agent-store";
import { useUiStore } from "@/stores/use-ui-store";
import { useWebContainerStore } from "@/stores/use-webcontainer-store";
import { formatLatency, cn } from "@/lib/utils";

export function BottomBar({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const statusLog = useAgentStore((s) => s.statusLog);
  const latencyMs = useAgentStore((s) => s.latencyMs);
  const tokensUsed = useAgentStore((s) => s.tokensUsed);
  const agents = useAgentStore((s) => s.agents);
  const toggleCommand = useUiStore((s) => s.toggleCommand);
  const wcLogs = useWebContainerStore((s) => s.logs);
  const wcStatus = useWebContainerStore((s) => s.status);
  const lastAgent = statusLog[statusLog.length - 1];
  const lastWc = wcLogs[wcLogs.length - 1];
  // Prefer agent pipeline status over WC noise once agents have spoken
  const last =
    lastAgent && !lastAgent.startsWith("Missing crossOrigin")
      ? lastAgent
      : (lastWc ?? lastAgent ?? "Ready");

  const previewLabel =
    wcStatus === "fallback" || wcStatus === "error"
      ? "STATIC"
      : wcStatus === "ready"
        ? "WC"
        : wcStatus === "booting" || wcStatus === "detecting"
          ? "…"
          : "—";

  return (
    <footer
      className={cn(
        "h-10 shrink-0 border-t-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card flex items-center gap-3 px-3 text-xs",
        className,
      )}
    >
      <Terminal className="h-3.5 w-3.5 text-terracotta shrink-0" aria-hidden />
      <p
        className="min-w-0 flex-1 truncate text-charcoal/70 dark:text-cream/65 font-mono"
        role="status"
        aria-live="polite"
      >
        {last}
      </p>
      <span
        className="hidden md:inline text-charcoal/40 dark:text-cream/35 font-mono text-[10px] uppercase tracking-wide"
        title="Preview runtime mode"
      >
        PREVIEW:{previewLabel}
      </span>
      <span className="hidden sm:inline text-charcoal/45 dark:text-cream/40 font-mono tabular-nums">
        G0 {agents[0]?.latencyMs ?? "—"}ms · G1 {agents[1]?.latencyMs ?? "—"}ms ·
        G2 {agents[2]?.latencyMs ?? "—"}ms
      </span>
      <span className="hidden sm:inline text-charcoal/45 dark:text-cream/40 font-mono tabular-nums">
        Σ {formatLatency(latencyMs)} · {tokensUsed} tok
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 gap-1"
        onClick={toggleCommand}
        aria-label="Open command palette"
      >
        <Command className="h-3 w-3" aria-hidden />
        <kbd className="font-mono text-[10px] opacity-70">⌘K</kbd>
      </Button>
    </footer>
  );
}
