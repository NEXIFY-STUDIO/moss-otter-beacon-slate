import { Group, Panel, Separator } from "react-resizable-panels";
import { LeftPanel } from "@/components/chat/LeftPanel";
import { CenterPanel } from "@/components/editor/CenterPanel";
import { RightPanel } from "@/components/preview/RightPanel";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

/**
 * Mobile (< lg): single full-height pane via Chat | Code | Preview tabs.
 * Desktop (≥ lg): classic 3-column resizable IDE.
 */
export function ResizableIDE({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const mobilePane = useUiStore((s) => s.mobilePane);

  return (
    <div className={cn("flex-1 min-h-0 min-w-0 overflow-hidden relative", className)}>
      {/* Mobile / tablet: one pane fills the shell between TopBar and tab bar */}
      <div className="absolute inset-0 flex flex-col lg:hidden">
        {mobilePane === "chat" && (
          <div className="h-full min-h-0">
            <LeftPanel />
          </div>
        )}
        {mobilePane === "code" && (
          <div className="h-full min-h-0">
            <CenterPanel mobile />
          </div>
        )}
        {mobilePane === "preview" && (
          <div className="h-full min-h-0">
            <RightPanel mobile />
          </div>
        )}
      </div>

      {/* Desktop: resizable three columns */}
      <div className="absolute inset-0 hidden lg:block">
        <Group orientation="horizontal" className="h-full w-full">
          <Panel id="left" defaultSize="22" minSize="15" className="min-w-0">
            <LeftPanel />
          </Panel>
          <Separator
            className="w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors"
            aria-label="Resize left panel"
          />
          <Panel id="center" defaultSize="45" minSize="20" className="min-w-0">
            <CenterPanel />
          </Panel>
          <Separator
            className="w-1.5 bg-charcoal/10 dark:bg-cream/10 hover:bg-terracotta/50 active:bg-terracotta transition-colors"
            aria-label="Resize right panel"
          />
          <Panel id="right" defaultSize="33" minSize="18" className="min-w-0">
            <RightPanel />
          </Panel>
        </Group>
      </div>
    </div>
  );
}
