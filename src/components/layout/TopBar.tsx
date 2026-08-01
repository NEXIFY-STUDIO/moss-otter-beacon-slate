import { Link } from "@tanstack/react-router";
import { Command, Sparkles, Circle } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/stores/use-agent-store";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

interface TopBarProps {
  projectName?: string;
  className?: string;
  compact?: boolean;
}

export function TopBar({
  projectName = "Untitled Project",
  className,
  compact = false,
}: TopBarProps): React.JSX.Element {
  const agents = useAgentStore((s) => s.agents);
  const phase = useAgentStore((s) => s.phase);
  const toggleCommand = useUiStore((s) => s.toggleCommand);

  return (
    <header
      className={cn(
        "shrink-0 border-b-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary dark:bg-slate-card flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4",
        compact ? "h-12 min-h-[48px] sm:h-14 sm:min-h-14" : "h-14 min-h-14",
        className,
      )}
    >
      <Link
        to="/"
        className="flex items-center gap-2 shrink-0 group"
        aria-label="COSY Studio home"
      >
        <span className="flex h-8 w-8 items-center justify-center border-2 border-charcoal dark:border-cream/30 bg-terracotta text-white shadow-brutal-sm font-serif font-bold text-sm group-hover:translate-x-px group-hover:translate-y-px group-hover:shadow-none transition-all">
          C
        </span>
        <span className="hidden sm:inline font-serif font-semibold tracking-wide text-charcoal dark:text-cream">
          COSY
        </span>
      </Link>

      <div className="h-6 w-px bg-charcoal/15 dark:bg-cream/15 hidden sm:block" />

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.14em] text-charcoal/45 dark:text-cream/40 font-semibold leading-none">
          Project
        </p>
        <p className="truncate text-sm font-semibold text-charcoal dark:text-cream leading-tight mt-0.5">
          {projectName}
        </p>
      </div>

      <div
        className="flex md:hidden items-center gap-1 shrink-0"
        role="status"
        aria-label="Agent pipeline"
      >
        {agents.map((agent) => (
          <Circle
            key={agent.type}
            className={cn(
              "h-2.5 w-2.5 fill-current",
              agent.state === "running" && "text-terracotta animate-pulse",
              agent.state === "success" && "text-diff-add-text",
              agent.state === "error" && "text-diff-del-text",
              agent.state === "idle" && "text-charcoal/30 dark:text-cream/30",
            )}
            aria-label={`${agent.type} ${agent.state}`}
          />
        ))}
      </div>

      <div
        className="hidden md:flex items-center gap-1.5 px-2 py-1 border-2 border-charcoal/10 dark:border-cream/10 bg-cream/60 dark:bg-slate/60"
        role="status"
        aria-label="Agent pipeline status"
      >
        {agents.map((agent, i) => (
          <div key={agent.type} className="flex items-center gap-1.5">
            {i > 0 && (
              <span
                className="text-charcoal/25 dark:text-cream/25 text-xs"
                aria-hidden
              >
                →
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-medium">
              <Circle
                className={cn(
                  "h-2.5 w-2.5 fill-current",
                  agent.state === "running" && "text-terracotta animate-pulse",
                  agent.state === "success" && "text-diff-add-text",
                  agent.state === "error" && "text-diff-del-text",
                  agent.state === "idle" && "text-charcoal/30 dark:text-cream/30",
                )}
                aria-hidden
              />
              <span className="text-charcoal/80 dark:text-cream/80">
                {agent.type}
              </span>
            </span>
          </div>
        ))}
        <Badge variant="accent" className="ml-2 normal-case tracking-normal">
          {phase.replaceAll("_", " ")}
        </Badge>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 sm:hidden"
          onClick={toggleCommand}
          aria-label="Open command palette"
        >
          <Command className="h-4 w-4" aria-hidden />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex gap-1.5"
          onClick={toggleCommand}
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" aria-hidden />
          <span className="text-xs">Cmd+K</span>
        </Button>
        <ThemeToggle />
        <div
          className="hidden sm:flex h-8 w-8 items-center justify-center border-2 border-charcoal/20 dark:border-cream/20 bg-cream dark:bg-slate text-xs font-bold"
          aria-label="User profile placeholder"
          title="Profile (auth coming later)"
        >
          <Sparkles className="h-3.5 w-3.5 text-terracotta" aria-hidden />
        </div>
      </div>
    </header>
  );
}
