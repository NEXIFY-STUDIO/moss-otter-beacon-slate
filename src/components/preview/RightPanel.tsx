import {
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  ExternalLink,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeviceFrame } from "@/components/preview/DeviceFrame";
import { useFileStore } from "@/stores/use-file-store";
import { useUiStore } from "@/stores/use-ui-store";
import { buildPreviewHtml } from "@/lib/demo-data";
import type { PreviewDevice } from "@/types/project";
import { cn } from "@/lib/utils";

const devices: { id: PreviewDevice; icon: typeof Monitor; label: string }[] = [
  { id: "mobile", icon: Smartphone, label: "Mobile" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "desktop", icon: Monitor, label: "Desktop" },
];

export function RightPanel({
  mobile = false,
}: {
  mobile?: boolean;
}): React.JSX.Element {
  const files = useFileStore((s) => s.files);
  const device = useUiStore((s) => s.previewDevice);
  const zoom = useUiStore((s) => s.previewZoom);
  const previewKey = useUiStore((s) => s.previewKey);
  const setPreviewDevice = useUiStore((s) => s.setPreviewDevice);
  const setPreviewZoom = useUiStore((s) => s.setPreviewZoom);
  const refreshPreview = useUiStore((s) => s.refreshPreview);

  const contentMap = new Map<string, string>();
  for (const [path, file] of files) contentMap.set(path, file.content);
  const srcDoc = buildPreviewHtml(contentMap, device);

  const openExternal = () => {
    const blob = new Blob([srcDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  // On phone: fill the pane (device frame would be double-nested nonsense)
  const effectiveDevice = mobile ? "mobile" : device;
  const effectiveZoom = mobile ? 100 : zoom;

  return (
    <aside className="h-full flex flex-col bg-cream-secondary/40 dark:bg-slate-card/30 min-h-0 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1.5 px-2 py-2 border-b-2 border-charcoal/10 dark:border-cream/10 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/50 dark:text-cream/45 mr-1">
          Preview
        </p>
        {!mobile && (
          <div
            className="flex border-2 border-charcoal/15 dark:border-cream/15 overflow-hidden"
            role="group"
            aria-label="Device selector"
          >
            {devices.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPreviewDevice(id)}
                aria-label={label}
                aria-pressed={device === id}
                className={cn(
                  "h-9 w-9 flex items-center justify-center transition-colors",
                  device === id
                    ? "bg-terracotta text-white"
                    : "bg-cream dark:bg-slate text-charcoal dark:text-cream hover:bg-charcoal/5 dark:hover:bg-cream/5",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </button>
            ))}
          </div>
        )}
        <Badge variant="outline" className="normal-case tracking-normal">
          {mobile ? "fill" : device}
        </Badge>
        <div className="ml-auto flex items-center gap-0.5">
          {!mobile && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Zoom out"
                onClick={() => setPreviewZoom(zoom - 10)}
              >
                <ZoomOut className="h-3.5 w-3.5" aria-hidden />
              </Button>
              <span className="text-[11px] font-mono tabular-nums w-10 text-center text-charcoal/55 dark:text-cream/50">
                {zoom}%
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Zoom in"
                onClick={() => setPreviewZoom(zoom + 10)}
              >
                <ZoomIn className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Refresh preview"
            onClick={refreshPreview}
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Open preview in new tab"
            onClick={openExternal}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative bg-white dark:bg-slate">
        {mobile ? (
          <iframe
            key={previewKey}
            title="Live project preview"
            srcDoc={srcDoc}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <DeviceFrame device={effectiveDevice} zoom={effectiveZoom}>
            <iframe
              key={previewKey}
              title="Live project preview"
              srcDoc={srcDoc}
              className="h-full w-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          </DeviceFrame>
        )}
        {!mobile && (
          <div className="absolute top-2 right-2 pointer-events-none">
            <Badge
              variant="default"
              className="backdrop-blur-sm bg-cream/80 dark:bg-slate-card/80 normal-case tracking-normal shadow-brutal-sm"
            >
              Inspector soon
            </Badge>
          </div>
        )}
      </div>
    </aside>
  );
}
