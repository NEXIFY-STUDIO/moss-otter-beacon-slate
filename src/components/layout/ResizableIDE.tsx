import { useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { LeftPanel } from "@/components/chat/LeftPanel";
import { CenterPanel } from "@/components/editor/CenterPanel";
import { RightPanel } from "@/components/preview/RightPanel";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

/**
 * Mobile (< lg): single full-height pane via Chat | Code | Preview tabs.
 * Desktop (≥ lg): classic 3-column resizable IDE.
 * Only one shell mounts at a time (media query) to avoid duplicate PromptInputs.
 */
export function ResizableIDE({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const mobilePane = useUiStore((s) => s.mobilePane);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className={cn("flex-1 min-h-0 min-w-0 overflow-hidden relative", className)}>
      {!isDesktop ? (
        <div className="absolute inset-0 flex flex-col">
          {mobilePane === "chat" ? (
            <div className="h-full min-h-0">
              <ErrorBoundary fallbackTitle="Chat panel crashed">
                <LeftPanel />
              </ErrorBoundary>
            </div>
          ) : null}
          {mobilePane === "code" ? (
            <div className="h-full min-h-0">
              <ErrorBoundary fallbackTitle="Editor panel crashed">
                <CenterPanel mobile />
              </ErrorBoundary>
            </div>
          ) : null}
          {mobilePane === "preview" ? (
            <div className="h-full min-h-0">
              <ErrorBoundary fallbackTitle="Preview panel crashed">
                <RightPanel mobile />
              </ErrorBoundary>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="absolute inset-0">
          <Group orientation="horizontal" className="h-full w-full">
            <Panel id="left" defaultSize="22" minSize="15" className="min-w-0">
              <ErrorBoundary fallbackTitle="Chat panel crashed">
                <LeftPanel />
              </ErrorBoundary>
            </Panel>
            <Separator
              className="w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors"
              aria-label="Resize left panel"
            />
            <Panel id="center" defaultSize="45" minSize="20" className="min-w-0">
              <ErrorBoundary fallbackTitle="Editor panel crashed">
                <CenterPanel />
              </ErrorBoundary>
            </Panel>
            <Separator
              className="w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors"
              aria-label="Resize right panel"
            />
            <Panel id="right" defaultSize="33" minSize="18" className="min-w-0">
              <ErrorBoundary fallbackTitle="Preview panel crashed">
                <RightPanel />
              </ErrorBoundary>
            </Panel>
          </Group>
        </div>
      )}
    </div>
  );
}
