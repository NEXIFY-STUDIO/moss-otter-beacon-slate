import { useState } from "react";
import { ChevronDown, Files } from "lucide-react";
import { FileTree } from "@/components/editor/FileTree";
import { MonacoDiffEditor } from "@/components/editor/MonacoDiffEditor";
import { DiffActions } from "@/components/editor/DiffActions";
import { HitLCard } from "@/components/editor/HitLCard";
import { useFileStore } from "@/stores/use-file-store";
import { cn } from "@/lib/utils";

export function CenterPanel({
  mobile = false,
}: {
  mobile?: boolean;
}): React.JSX.Element {
  const files = useFileStore((s) => s.files);
  const activeFilePath = useFileStore((s) => s.activeFilePath);
  const proposal = useFileStore((s) => s.proposal);
  const active = activeFilePath ? files.get(activeFilePath) : undefined;
  const [treeOpen, setTreeOpen] = useState(!mobile);

  const showProposal =
    proposal !== null &&
    (activeFilePath === null ||
      proposal.path === activeFilePath ||
      active === undefined);

  return (
    <section className="h-full flex flex-col sm:flex-row min-h-0 bg-cream dark:bg-slate relative overflow-hidden">
      {mobile ? (
        <div className="shrink-0 border-b-2 border-charcoal/10 dark:border-cream/10 bg-cream-secondary/60 dark:bg-slate-card/50">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2.5 text-left min-h-[44px]"
            onClick={() => setTreeOpen((v) => !v)}
            aria-expanded={treeOpen}
          >
            <Files className="h-4 w-4 text-terracotta shrink-0" aria-hidden />
            <span className="font-mono text-xs truncate flex-1 text-charcoal dark:text-cream">
              {activeFilePath ?? "Select file"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transition-transform text-charcoal/50 dark:text-cream/45",
                treeOpen && "rotate-180",
              )}
              aria-hidden
            />
          </button>
          {treeOpen ? (
            <div className="max-h-[40dvh] overflow-y-auto border-t border-charcoal/10 dark:border-cream/10">
              <FileTree onFileSelect={() => setTreeOpen(false)} compact />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-[min(200px,34%)] shrink-0 min-w-[120px] min-h-0 hidden sm:block">
          <FileTree />
        </div>
      )}

      {!mobile ? (
        <div className="sm:hidden shrink-0 border-b border-charcoal/10 max-h-[30%] overflow-auto">
          <FileTree compact />
        </div>
      ) : null}

      <div className="flex-1 min-w-0 min-h-0 relative flex flex-col">
        {showProposal && proposal ? <DiffActions /> : null}
        <MonacoDiffEditor
          proposal={showProposal ? proposal : null}
          fallbackContent={active?.content ?? "// Select a file"}
          language={
            showProposal && proposal
              ? proposal.language
              : (active?.language ?? "txt")
          }
        />
        <HitLCard compact={mobile} />
      </div>
    </section>
  );
}
