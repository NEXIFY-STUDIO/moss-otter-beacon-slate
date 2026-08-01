import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAgentStore } from "@/stores/use-agent-store";
import { useFileStore } from "@/stores/use-file-store";
import { cn } from "@/lib/utils";

const REASONS = [
  "Wrong approach",
  "Style mismatch",
  "Missing requirements",
  "Security concern",
  "Other",
] as const;

export function RejectionPoll(): React.JSX.Element {
  const open = useAgentStore((s) => s.rejectionOpen);
  const setRejectionOpen = useAgentStore((s) => s.setRejectionOpen);
  const setLastRejection = useAgentStore((s) => s.setLastRejection);
  const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
  const setPhase = useAgentStore((s) => s.setPhase);
  const addMessage = useAgentStore((s) => s.addMessage);
  const pushStatus = useAgentStore((s) => s.pushStatus);
  const setProposal = useFileStore((s) => s.setProposal);
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [freeText, setFreeText] = useState("");

  const submit = () => {
    setLastRejection({
      reason,
      ...(freeText.trim() ? { freeText: freeText.trim() } : {}),
    });
    setProposal(null);
    setHitlVisible(false);
    setRejectionOpen(false);
    setPhase("idle");
    pushStatus(`Rejected · ${reason}`);
    addMessage({
      role: "assistant",
      agentType: "ORCHESTRATOR",
      content: `Zmena zamietnutá (${reason}). ${freeText.trim() ? `Poznámka: ${freeText.trim()}` : "Priprav nový prompt s viac detailmi."}`,
    });
    setFreeText("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Rejection feedback"
          onClick={() => setRejectionOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-lg font-semibold text-charcoal dark:text-cream">
              Prečo si zamietol?
            </h2>
            <p className="text-xs text-charcoal/55 dark:text-cream/50 mt-1">
              Feedback trénuje ďalší run pipeline (AiInteractionLog).
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Rejection reasons">
              {REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={reason === r}
                  onClick={() => setReason(r)}
                  className={cn(
                    "border-2 px-2.5 py-1 text-xs font-semibold transition-colors",
                    reason === r
                      ? "border-charcoal bg-terracotta text-white shadow-brutal-sm"
                      : "border-charcoal/20 dark:border-cream/20 bg-transparent text-charcoal dark:text-cream hover:border-terracotta/50",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <Textarea
              className="mt-3 shadow-none min-h-[72px]"
              placeholder="Voliteľný detail…"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              aria-label="Free text rejection reason"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRejectionOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={submit}>
                Submit rejection
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
