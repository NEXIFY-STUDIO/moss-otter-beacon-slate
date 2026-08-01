import { useEffect, useMemo, useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Info,
  TreePine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DeviceFrame } from "@/components/preview/DeviceFrame";
import { useFileStore } from "@/stores/use-file-store";
import { useUiStore } from "@/stores/use-ui-store";
import { useWebContainerStore } from "@/stores/use-webcontainer-store";
import { useAgentStore } from "@/stores/use-agent-store";
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
  const status = useWebContainerStore((s) => s.status);
  const wcUrl = useWebContainerStore((s) => s.url);
  const boot = useWebContainerStore((s) => s.boot);
  const tearDown = useWebContainerStore((s) => s.tearDown);
  const pushStatus = useAgentStore((s) => s.pushStatus);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [infoDismissed, setInfoDismissed] = useState(false);

  useEffect(() => {
    void boot();
    return () => tearDown();
  }, [boot, tearDown]);

  useEffect(() => {
    setPreviewReady(false);
    const t = window.setTimeout(() => setPreviewReady(true), 80);
    return () => window.clearTimeout(t);
  }, [previewKey, device, zoom, files]);

  const contentMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const [path, file] of files) map.set(path, file.content);
    return map;
  }, [files]);

  const srcDoc = useMemo(
    () => buildPreviewHtml(contentMap, device),
    [contentMap, device],
  );

  const openExternal = () => {
    if (wcUrl) {
      window.open(wcUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const blob = new Blob([srcDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  const effectiveDevice = mobile ? "mobile" : device;
  const effectiveZoom = mobile ? 100 : zoom;
  const isStatic = !wcUrl;
  // Static srcdoc: no allow-same-origin (avoids console sandbox warning).
  // Live WC URL may need same-origin for the runtime; keep it only then.
  const iframeSandbox = wcUrl
    ? "allow-scripts allow-same-origin allow-forms allow-modals"
    : "allow-scripts allow-forms";

  const showInfoStrip =
    isStatic &&
    !infoDismissed &&
    (status === "fallback" || status === "error" || status === "ready");

  return (
    <aside className="h-full flex flex-col bg-cream-secondary/40 dark:bg-slate-card/30 min-h-0 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1.5 px-2 py-2 border-b-2 border-charcoal/10 dark:border-cream/10 shrink-0">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-charcoal/50 dark:text-cream/45 mr-1">
          Preview
        </p>
        {!mobile ? (
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
        ) : null}
        <Badge
          variant={isStatic ? "outline" : "success"}
          className="normal-case tracking-normal"
        >
          {wcUrl
            ? "Live WC"
            : status === "booting" || status === "detecting"
              ? "booting…"
              : "Live static"}
        </Badge>
        <div className="ml-auto flex items-center gap-0.5">
          {!mobile ? (
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
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Toggle inspector stub"
            onClick={() => setInspectorOpen((v) => !v)}
          >
            <TreePine className="h-3.5 w-3.5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Refresh preview"
            onClick={() => {
              refreshPreview();
              pushStatus("Preview refreshed");
            }}
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

      {showInfoStrip ? (
        <div
          className="shrink-0 px-2.5 py-1.5 border-b border-charcoal/10 dark:border-cream/10 bg-cream dark:bg-slate-card text-[11px] text-charcoal/65 dark:text-cream/60 flex items-start gap-2"
          role="status"
        >
          <Info
            className="h-3.5 w-3.5 text-charcoal/45 dark:text-cream/40 shrink-0 mt-0.5"
            aria-hidden
          />
          <p className="min-w-0 flex-1 leading-snug">
            <span className="font-semibold text-charcoal dark:text-cream">
              Live static preview
            </span>
            {" — "}
            updates on Approve. Full WebContainer needs deploy headers
            (COOP/COEP).
          </p>
          <button
            type="button"
            className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-charcoal/45 hover:text-charcoal dark:text-cream/40 dark:hover:text-cream px-1 min-h-7"
            onClick={() => setInfoDismissed(true)}
            aria-label="Dismiss preview info"
          >
            OK
          </button>
        </div>
      ) : null}

      <div className="flex-1 min-h-0 relative bg-white dark:bg-slate flex">
        <div className="flex-1 min-w-0 min-h-0 relative">
          {!previewReady || status === "booting" || status === "detecting" ? (
            <div className="absolute inset-0 flex flex-col gap-2 p-4 bg-cream dark:bg-slate z-10">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="flex-1 w-full" />
            </div>
          ) : null}
          {mobile ? (
            <iframe
              key={`${previewKey}:${isStatic ? "static" : "wc"}`}
              title="Live project preview"
              src={wcUrl ?? undefined}
              srcDoc={wcUrl ? undefined : srcDoc}
              className="absolute inset-0 h-full w-full border-0 bg-white"
              sandbox={iframeSandbox}
            />
          ) : (
            <DeviceFrame device={effectiveDevice} zoom={effectiveZoom}>
              <iframe
                key={`${previewKey}:${isStatic ? "static" : "wc"}`}
                title="Live project preview"
                src={wcUrl ?? undefined}
                srcDoc={wcUrl ? undefined : srcDoc}
                className="h-full w-full border-0 bg-white"
                sandbox={iframeSandbox}
              />
            </DeviceFrame>
          )}
          {!mobile ? (
            <div className="absolute top-2 right-2 pointer-events-none">
              <Badge
                variant="default"
                className="backdrop-blur-sm bg-cream/80 dark:bg-slate-card/80 normal-case tracking-normal shadow-brutal-sm"
              >
                {wcUrl ? "Live WC" : "Synced · App.tsx"}
              </Badge>
            </div>
          ) : null}
        </div>

        {inspectorOpen ? (
          <div className="w-[min(180px,40%)] shrink-0 border-l-2 border-charcoal/10 dark:border-cream/10 bg-cream dark:bg-slate-card p-2 overflow-auto text-[11px] font-mono">
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-terracotta mb-2 font-sans">
              DOM tree
            </p>
            <ul className="space-y-0.5 text-charcoal/70 dark:text-cream/65">
              <li>html</li>
              <li className="pl-2">body.frame</li>
              <li className="pl-4">header.nav</li>
              <li className="pl-4">main</li>
              <li className="pl-6">section.hero</li>
              <li className="pl-6">section#features</li>
              <li className="pl-6">section#cta</li>
            </ul>
            <p className="mt-3 text-charcoal/45 dark:text-cream/40 font-sans text-[10px]">
              Preview mirrors App.tsx after Approve
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
