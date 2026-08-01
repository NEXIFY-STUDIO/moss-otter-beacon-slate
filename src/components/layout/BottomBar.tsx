import { Command, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/stores/use-agent-store";
import { useUiStore } from "@/stores/use-ui-store";
import { formatLatency, cn } from "@/lib/utils";

export function BottomBar({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const statusLog = useAgentStore((s) => s.statusLog);
  const latencyMs = useAgentStore((s) => s.latencyMs);
  const tokensUsed = useAgentStore((s) => s.tokensUsed);
  const toggleCommand = useUiStore((s) => s.toggleCommand);
  const last = statusLog[statusLog.length - 1] ?? "Ready";

  return (
    <footer
      className={cn(
        "h-10 shrink-0 border-t-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card flex items-center gap-3 px-3 text-xs",
        className,
      )}
    >
      <Terminal className="h-3.5 w-3.5 text-terracotta shrink-0" aria-hidden />
      <p className="min-w-0 flex-1 truncate text-charcoal/70 dark:text-cream/65 font-mono">
        {last}
      </p>
      <span className="hidden sm:inline text-charcoal/45 dark:text-cream/40 font-mono tabular-nums">
        {formatLatency(latencyMs)} · {tokensUsed} tok
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
