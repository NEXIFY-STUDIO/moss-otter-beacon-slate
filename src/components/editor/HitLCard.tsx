import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/stores/use-agent-store";
import { useFileStore } from "@/stores/use-file-store";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

export function HitLCard({
  compact = false,
}: {
  compact?: boolean;
}): React.JSX.Element {
  const hitlVisible = useAgentStore((s) => s.hitlVisible);
  const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
  const setRejectionOpen = useAgentStore((s) => s.setRejectionOpen);
  const setPhase = useAgentStore((s) => s.setPhase);
  const addMessage = useAgentStore((s) => s.addMessage);
  const pushStatus = useAgentStore((s) => s.pushStatus);
  const applyProposal = useFileStore((s) => s.applyProposal);
  const proposal = useFileStore((s) => s.proposal);
  const refreshPreview = useUiStore((s) => s.refreshPreview);
  const setMobilePane = useUiStore((s) => s.setMobilePane);

  const onApprove = () => {
    applyProposal();
    setHitlVisible(false);
    setPhase("done");
    pushStatus("Approved · file updated · preview refreshed");
    addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content:
        "Zmena schválená. Súbor aktualizovaný a live preview refreshnutý.",
    });
    refreshPreview();
    if (compact) setMobilePane("preview");
  };

  const onReject = () => {
    setRejectionOpen(true);
  };

  useEffect(() => {
    if (!hitlVisible) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "textarea" || tag === "input" || target?.isContentEditable) {
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onApprove();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onReject();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitlVisible, compact]);

  return (
    <AnimatePresence>
      {hitlVisible && proposal && (
        <motion.div
          // Don't start at opacity 0 when parent was display:none (mobile tabs) —
          // that freezes the card invisible after switching to Code.
          initial={compact ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute z-20 left-1/2 -translate-x-1/2 w-[min(420px,calc(100%-1rem))]",
            compact ? "bottom-2" : "bottom-4",
          )}
          role="dialog"
          aria-modal="false"
          aria-label="Human in the loop approval"
        >
          <div className="backdrop-blur-xl bg-cream/90 dark:bg-slate-card/90 border-2 border-charcoal/20 dark:border-cream/15 shadow-brutal p-3 sm:p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-terracotta">
              Human-in-the-loop
            </p>
            <h3 className="font-serif text-sm sm:text-base font-semibold mt-1 text-charcoal dark:text-cream">
              Approve code change?
            </h3>
            <p className="text-xs text-charcoal/60 dark:text-cream/55 mt-1 leading-relaxed line-clamp-2">
              {proposal.summary} ·{" "}
              <span className="font-mono">{proposal.path}</span>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                type="button"
                size="sm"
                className="min-h-11 w-full"
                onClick={onApprove}
                aria-label="Approve change"
              >
                <Check className="h-3.5 w-3.5" aria-hidden />
                Approve
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="min-h-11 w-full"
                onClick={onReject}
                aria-label="Reject change"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Reject
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
