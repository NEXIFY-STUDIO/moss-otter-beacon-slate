import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { DiffProposal } from "@/types/file";

interface DiffLine {
  type: "same" | "add" | "del" | "ctx";
  left?: string | undefined;
  right?: string | undefined;
  text: string;
}

function computeLines(original: string, modified: string): DiffLine[] {
  const a = original.split("\n");
  const b = modified.split("\n");
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => 0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const row = dp[i];
      const nextRow = dp[i + 1];
      if (!row || !nextRow) continue;
      if (a[i] === b[j]) {
        row[j] = (nextRow[j + 1] ?? 0) + 1;
      } else {
        row[j] = Math.max(nextRow[j] ?? 0, row[j + 1] ?? 0);
      }
    }
  }
  const lines: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      lines.push({ type: "same", text: a[i] ?? "" });
      i++;
      j++;
    } else if ((dp[i + 1]?.[j] ?? 0) >= (dp[i]?.[j + 1] ?? 0)) {
      lines.push({ type: "del", text: a[i] ?? "" });
      i++;
    } else {
      lines.push({ type: "add", text: b[j] ?? "" });
      j++;
    }
  }
  while (i < n) {
    lines.push({ type: "del", text: a[i] ?? "" });
    i++;
  }
  while (j < m) {
    lines.push({ type: "add", text: b[j] ?? "" });
    j++;
  }
  return lines;
}

interface DiffViewProps {
  proposal: DiffProposal | null;
  fallbackContent: string;
  language: string;
}

export function DiffView({
  proposal,
  fallbackContent,
  language,
}: DiffViewProps): React.JSX.Element {
  const lines = useMemo(() => {
    if (!proposal) {
      return fallbackContent.split("\n").map((text) => ({
        type: "same" as const,
        text,
      }));
    }
    return computeLines(proposal.original, proposal.modified);
  }, [proposal, fallbackContent]);

  return (
    <div className="h-full flex flex-col min-h-0 bg-cream dark:bg-slate">
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-charcoal/10 dark:border-cream/10 text-[11px]">
        <span className="font-mono text-charcoal/60 dark:text-cream/55">
          {proposal ? `${proposal.path} · diff` : "editor"} · {language}
        </span>
        {proposal && (
          <span className="text-charcoal/45 dark:text-cream/40 truncate max-w-[50%]">
            {proposal.summary}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-auto font-mono text-[12px] leading-5">
        <pre className="min-w-full">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "flex px-2 border-l-2 border-transparent",
                line.type === "add" &&
                  "bg-diff-add-bg text-diff-add-text border-diff-add-text/40",
                line.type === "del" &&
                  "bg-diff-del-bg text-diff-del-text border-diff-del-text/40 line-through opacity-90",
                line.type === "same" && "text-charcoal/80 dark:text-cream/75",
              )}
            >
              <span className="w-4 shrink-0 select-none opacity-50">
                {line.type === "add" ? "+" : line.type === "del" ? "−" : " "}
              </span>
              <span className="w-10 shrink-0 select-none text-right pr-3 text-charcoal/30 dark:text-cream/25 tabular-nums">
                {idx + 1}
              </span>
              <code className="whitespace-pre-wrap break-all flex-1">
                {line.text || " "}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
