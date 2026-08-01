import { Check, CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileStore } from "@/stores/use-file-store";
import { useAgentStore } from "@/stores/use-agent-store";
import { useUiStore } from "@/stores/use-ui-store";
import { computeLines } from "@/lib/diff";
import { cn } from "@/lib/utils";

export function DiffActions({
  className,
}: {
  className?: string | undefined;
}): React.JSX.Element | null {
  const proposal = useFileStore((s) => s.proposal);
  const applyProposal = useFileStore((s) => s.applyProposal);
  const applyHunk = useFileStore((s) => s.applyHunk);
  const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
  const setPhase = useAgentStore((s) => s.setPhase);
  const pushStatus = useAgentStore((s) => s.pushStatus);
  const addMessage = useAgentStore((s) => s.addMessage);
  const setRejectionOpen = useAgentStore((s) => s.setRejectionOpen);
  const refreshPreview = useUiStore((s) => s.refreshPreview);

  if (!proposal) return null;

  const changeCount = computeLines(proposal.original, proposal.modified).filter(
    (l) => l.type !== "same",
  ).length;

  const acceptAll = () => {
    applyProposal();
    setHitlVisible(false);
    setPhase("done");
    pushStatus("Accept all · multi-file site written");
    addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content: "Accept all: multi-page files merged into project.",
    });
    refreshPreview();
  };

  const rejectAll = () => {
    setRejectionOpen(true);
  };

  const acceptFirstHunk = () => {
    const lines = computeLines(proposal.original, proposal.modified);
    const idx = lines.findIndex((l) => l.type !== "same");
    if (idx < 0) return;
    applyHunk(idx);
    pushStatus(`Accept hunk @ line ${idx + 1}`);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 px-2 py-1.5 border-b border-charcoal/10 dark:border-cream/10 bg-cream-secondary/70 dark:bg-slate-card/50",
        className,
      )}
      role="toolbar"
      aria-label="Diff hunk actions"
    >
      <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/45 dark:text-cream/40 mr-1">
        {changeCount} changes
      </span>
      <Button
        type="button"
        size="sm"
        variant="primary"
        className="h-8 text-[11px]"
        onClick={acceptAll}
        aria-label="Accept all changes"
      >
        <CheckCheck className="h-3.5 w-3.5" aria-hidden />
        Accept all
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="h-8 text-[11px]"
        onClick={acceptFirstHunk}
        aria-label="Accept next hunk"
      >
        <Check className="h-3.5 w-3.5" aria-hidden />
        Accept hunk
      </Button>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        className="h-8 text-[11px]"
        onClick={rejectAll}
        aria-label="Reject all changes"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
        Reject all
      </Button>
    </div>
  );
}
