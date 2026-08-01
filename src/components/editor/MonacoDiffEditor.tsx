import { Suspense, useEffect, useState, type ComponentType } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DiffView } from "@/components/editor/DiffView";
import { useThemeStore } from "@/stores/use-theme-store";
import { useAgentStore } from "@/stores/use-agent-store";
import type { DiffProposal, FileLanguage } from "@/types/file";
import { cn } from "@/lib/utils";

const THEME_LIGHT = "cosy-brutal-light";
const THEME_DARK = "cosy-brutal-dark";

interface MonacoDiffEditorProps {
  proposal: DiffProposal | null;
  fallbackContent: string;
  language: FileLanguage | string;
  className?: string | undefined;
}

type MonacoModule = typeof import("@monaco-editor/react");
type MonacoNS = typeof import("monaco-editor");

let themesRegistered = false;

function toFileLanguage(lang: string): FileLanguage {
  const allowed: FileLanguage[] = [
    "tsx",
    "ts",
    "jsx",
    "js",
    "css",
    "json",
    "html",
    "md",
    "txt",
  ];
  return (allowed.includes(lang as FileLanguage) ? lang : "txt") as FileLanguage;
}

function toMonacoLanguage(lang: string): string {
  if (lang === "txt") return "plaintext";
  if (lang === "md") return "markdown";
  return lang;
}

function registerCosyThemes(monaco: MonacoNS): void {
  if (themesRegistered) return;
  monaco.editor.defineTheme(THEME_LIGHT, {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6b6560", fontStyle: "italic" },
      { token: "keyword", foreground: "c85a32" },
      { token: "string", foreground: "15803d" },
      { token: "number", foreground: "b45309" },
      { token: "type", foreground: "1c1d21" },
    ],
    colors: {
      "editor.background": "#f4f1ea",
      "editor.foreground": "#1c1d21",
      "editorLineNumber.foreground": "#1c1d2166",
      "editorLineNumber.activeForeground": "#d96b43",
      "editorCursor.foreground": "#d96b43",
      "editor.selectionBackground": "#d96b4333",
      "editor.lineHighlightBackground": "#eae6df88",
      "editorGutter.background": "#f4f1ea",
      "diffEditor.insertedTextBackground": "#22c55e26",
      "diffEditor.removedTextBackground": "#ef444426",
      "diffEditor.insertedLineBackground": "#22c55e18",
      "diffEditor.removedLineBackground": "#ef444418",
      "scrollbarSlider.background": "#1c1d2133",
      "scrollbarSlider.hoverBackground": "#1c1d2155",
      focusBorder: "#d96b43",
    },
  });
  monaco.editor.defineTheme(THEME_DARK, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8a8680", fontStyle: "italic" },
      { token: "keyword", foreground: "e07a52" },
      { token: "string", foreground: "4ade80" },
      { token: "number", foreground: "fbbf24" },
      { token: "type", foreground: "f4f1ea" },
    ],
    colors: {
      "editor.background": "#0d0e11",
      "editor.foreground": "#f4f1ea",
      "editorLineNumber.foreground": "#f4f1ea55",
      "editorLineNumber.activeForeground": "#d96b43",
      "editorCursor.foreground": "#d96b43",
      "editor.selectionBackground": "#d96b4344",
      "editor.lineHighlightBackground": "#16181d99",
      "editorGutter.background": "#0d0e11",
      "diffEditor.insertedTextBackground": "#22c55e33",
      "diffEditor.removedTextBackground": "#ef444433",
      "diffEditor.insertedLineBackground": "#22c55e22",
      "diffEditor.removedLineBackground": "#ef444422",
      "scrollbarSlider.background": "#f4f1ea22",
      "scrollbarSlider.hoverBackground": "#f4f1ea44",
      focusBorder: "#d96b43",
    },
  });
  themesRegistered = true;
}

/**
 * Stable DiffEditor shell: once mounted it stays mounted for the parent lifetime.
 * Prop updates use Monaco's model setters (no remount / no dispose race).
 */
function DiffEditorInner({
  original,
  modified,
  language,
  theme,
  fileLanguage,
}: {
  original: string;
  modified: string;
  language: string;
  theme: string;
  fileLanguage: FileLanguage;
}): React.JSX.Element {
  const [DiffEditor, setDiffEditor] = useState<
    ComponentType<{
      original: string;
      modified: string;
      language: string;
      theme: string;
      options: Record<string, unknown>;
      loading: React.ReactNode;
      beforeMount: (monaco: MonacoNS) => void;
      height: string;
      className?: string;
      keepCurrentOriginalModel?: boolean;
      keepCurrentModifiedModel?: boolean;
    }> | null
  >(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("@monaco-editor/react")
      .then((mod: MonacoModule) => {
        if (cancelled) return;
        setDiffEditor(() => mod.DiffEditor);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <DiffView
        proposal={{
          path: "",
          language: fileLanguage,
          original,
          modified,
          summary: "Monaco unavailable — fallback diff",
        }}
        fallbackContent={modified}
        language={fileLanguage}
      />
    );
  }

  if (!DiffEditor) {
    return (
      <div className="h-full flex flex-col gap-2 p-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="flex-1 w-full min-h-[200px]" />
      </div>
    );
  }

  return (
    <DiffEditor
      original={original}
      modified={modified}
      language={language}
      theme={theme}
      height="100%"
      className="min-h-0"
      keepCurrentOriginalModel
      keepCurrentModifiedModel
      beforeMount={(monaco) => {
        registerCosyThemes(monaco);
      }}
      loading={
        <div className="h-full flex flex-col gap-2 p-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="flex-1 w-full min-h-[200px]" />
        </div>
      }
      options={{
        readOnly: true,
        originalEditable: false,
        renderSideBySide: true,
        automaticLayout: true,
        fontFamily: '"Fira Code", ui-monospace, Menlo, Consolas, monospace',
        fontSize: 13,
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        lineNumbers: "on",
        renderOverviewRuler: false,
        diffWordWrap: "on",
        padding: { top: 8, bottom: 8 },
      }}
    />
  );
}

interface SettledSnapshot {
  original: string;
  modified: string;
  path: string;
  summary: string;
  language: FileLanguage;
}

/**
 * Settled proposals use Monaco; live streaming uses DiffView overlay.
 * Monaco stays mounted once created — never unmount mid-pipeline (avoids
 * TextModel dispose races).
 */
export function MonacoDiffEditor({
  proposal,
  fallbackContent,
  language,
  className,
}: MonacoDiffEditorProps): React.JSX.Element {
  const resolved = useThemeStore((s) => s.resolved);
  const isStreaming = useAgentStore((s) => s.isStreaming);
  const theme = resolved === "dark" ? THEME_DARK : THEME_LIGHT;
  const [mounted, setMounted] = useState(false);
  const fileLanguage = toFileLanguage(language);
  const [settled, setSettled] = useState<SettledSnapshot | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture / update settled snapshot only when pipeline is idle
  useEffect(() => {
    if (isStreaming) return;
    if (!proposal || proposal.original === proposal.modified) {
      // keep previous settled Monaco models; don't wipe them on null mid-session
      return;
    }
    const next: SettledSnapshot = {
      original: proposal.original,
      modified: proposal.modified,
      path: proposal.path,
      summary: proposal.summary,
      language: toFileLanguage(proposal.language),
    };
    // Defer one frame so React layout finishes before model update
    const id = window.setTimeout(() => {
      setSettled((prev) => {
        if (
          prev &&
          prev.original === next.original &&
          prev.modified === next.modified &&
          prev.path === next.path
        ) {
          return prev;
        }
        return next;
      });
    }, 80);
    return () => window.clearTimeout(id);
  }, [isStreaming, proposal]);

  if (!mounted) {
    return (
      <div className={cn("h-full flex flex-col min-h-0", className)}>
        <div className="flex-1 p-3">
          <Skeleton className="h-full w-full min-h-[160px]" />
        </div>
      </div>
    );
  }

  const showOverlay =
    isStreaming ||
    !settled ||
    proposal === null ||
    proposal.original === proposal.modified;

  return (
    <div
      className={cn(
        "relative h-full flex flex-col min-h-0 bg-cream dark:bg-slate",
        className,
      )}
    >
      {/* Monaco layer — once settled exists, keep mounted forever in this shell */}
      {settled ? (
        <div
          className={cn(
            "absolute inset-0 flex flex-col min-h-0",
            showOverlay && "invisible pointer-events-none",
          )}
          aria-hidden={showOverlay}
        >
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-charcoal/10 dark:border-cream/10 text-[11px] shrink-0">
            <span className="font-mono text-charcoal/60 dark:text-cream/55">
              {settled.path} · monaco diff · {settled.language}
            </span>
            <span className="text-charcoal/45 dark:text-cream/40 truncate max-w-[50%]">
              {settled.summary}
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <Suspense
              fallback={
                <div className="h-full flex flex-col gap-2 p-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="flex-1 w-full" />
                </div>
              }
            >
              <DiffEditorInner
                original={settled.original}
                modified={settled.modified}
                language={toMonacoLanguage(settled.language)}
                theme={theme}
                fileLanguage={settled.language}
              />
            </Suspense>
          </div>
        </div>
      ) : null}

      {/* DiffView overlay during stream / no proposal */}
      {showOverlay ? (
        <div className="absolute inset-0 z-10 min-h-0">
          <DiffView
            proposal={proposal}
            fallbackContent={fallbackContent}
            language={fileLanguage}
          />
        </div>
      ) : null}
    </div>
  );
}
