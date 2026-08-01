import { useState } from "react";
import { Rocket, CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/stores/use-ui-store";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";

/**
 * 1-click publish skeleton (S24) — clear UX, no real deploy backend yet.
 */
export function PublishDialog(): React.JSX.Element | null {
  const open = useUiStore((s) => s.publishOpen);
  const setPublishOpen = useUiStore((s) => s.setPublishOpen);
  const [slug, setSlug] = useState(DEMO_PROJECT_ID);
  const [step, setStep] = useState<"form" | "done">("form");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const publicUrl = `https://cosy.app/p/${slug || "project"}`;

  const publish = async () => {
    if (!slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    setStep("done");
    toast.success("Publish skeleton ready");
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-charcoal/45 backdrop-blur-sm"
      role="presentation"
      onMouseDown={() => {
        setPublishOpen(false);
        setStep("form");
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-title"
        className="w-full max-w-md border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal p-5 space-y-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-charcoal bg-terracotta text-white">
            <Rocket className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2
              id="publish-title"
              className="font-serif text-lg font-semibold text-charcoal dark:text-cream"
            >
              Publish project
            </h2>
            <p className="text-xs text-charcoal/55 dark:text-cream/50 mt-0.5">
              One-click skeleton — wires to deploy target later.
            </p>
          </div>
        </div>

        {step === "form" ? (
          <>
            <label className="block space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal/50 dark:text-cream/45">
                Public slug
              </span>
              <Input
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "-")
                      .slice(0, 48),
                  )
                }
                aria-label="Publish slug"
                className="font-mono text-sm"
              />
            </label>
            <p className="text-xs font-mono text-charcoal/50 dark:text-cream/45 break-all">
              {publicUrl}
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setPublishOpen(false);
                  setStep("form");
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => void publish()} disabled={busy}>
                {busy ? "Publishing…" : "Publish"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-diff-add-text text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5" aria-hidden />
              Skeleton published
            </div>
            <p className="text-sm text-charcoal dark:text-cream break-all font-mono">
              {publicUrl}
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(publicUrl);
                    toast.success("Link copied");
                  } catch {
                    toast.error("Copy failed");
                  }
                }}
              >
                <Copy className="h-3.5 w-3.5" aria-hidden />
                Copy link
              </Button>
              <Button
                onClick={() => {
                  setPublishOpen(false);
                  setStep("form");
                }}
              >
                Done
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
