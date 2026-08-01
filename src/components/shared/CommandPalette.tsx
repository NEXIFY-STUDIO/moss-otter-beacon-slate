import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import {
  FolderPlus,
  Home,
  Moon,
  Sun,
  Monitor,
  LayoutDashboard,
  FileCode2,
  Rocket,
  Check,
  Square,
  Smartphone,
  Tablet,
  MonitorSmartphone,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useUiStore } from "@/stores/use-ui-store";
import { useThemeStore, type ThemeMode } from "@/stores/use-theme-store";
import { useAgentStore } from "@/stores/use-agent-store";
import { useFileStore } from "@/stores/use-file-store";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function CommandPalette(): React.JSX.Element {
  const open = useUiStore((s) => s.commandOpen);
  const setCommandOpen = useUiStore((s) => s.setCommandOpen);
  const setPublishOpen = useUiStore((s) => s.setPublishOpen);
  const setPreviewDevice = useUiStore((s) => s.setPreviewDevice);
  const setMobilePane = useUiStore((s) => s.setMobilePane);
  const refreshPreview = useUiStore((s) => s.refreshPreview);
  const setMode = useThemeStore((s) => s.setMode);
  const applyProposal = useFileStore((s) => s.applyProposal);
  const proposal = useFileStore((s) => s.proposal);
  const hitlVisible = useAgentStore((s) => s.hitlVisible);
  const setHitlVisible = useAgentStore((s) => s.setHitlVisible);
  const setPhase = useAgentStore((s) => s.setPhase);
  const pushStatus = useAgentStore((s) => s.pushStatus);
  const isStreaming = useAgentStore((s) => s.isStreaming);
  const abort = useAgentStore((s) => s.abort);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!useUiStore.getState().commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return <></>;

  const run = (fn: () => void) => {
    fn();
    setCommandOpen(false);
  };

  const setTheme = (mode: ThemeMode) => run(() => setMode(mode));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-charcoal/40 backdrop-blur-sm"
      role="presentation"
      onMouseDown={() => setCommandOpen(false)}
    >
      <div
        className="w-full max-w-lg border-2 border-charcoal dark:border-cream/20 bg-cream dark:bg-slate-card shadow-brutal overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Command label="Command palette" shouldFilter>
          <div className="border-b-2 border-charcoal/10 dark:border-cream/10 px-3">
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command…"
              className="w-full h-12 bg-transparent text-sm outline-none text-charcoal dark:text-cream placeholder:text-charcoal/40 dark:placeholder:text-cream/35"
              autoFocus
            />
          </div>
          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-charcoal/50 dark:text-cream/45">
              No results.
            </Command.Empty>

            <Command.Group heading="Navigate">
              <Command.Item
                value="home landing"
                onSelect={() => run(() => void navigate({ to: "/" }))}
                className={itemClass}
              >
                <Home className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Home
              </Command.Item>
              <Command.Item
                value="dashboard projects"
                onSelect={() => run(() => void navigate({ to: "/dashboard" }))}
                className={itemClass}
              >
                <LayoutDashboard className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Dashboard
              </Command.Item>
              <Command.Item
                value="open demo studio ide"
                onSelect={() =>
                  run(() =>
                    void navigate({
                      to: "/studio/$projectId",
                      params: { projectId: DEMO_PROJECT_ID },
                    }),
                  )
                }
                className={itemClass}
              >
                <FileCode2 className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Open demo studio
              </Command.Item>
              <Command.Item
                value="sign in login"
                onSelect={() => run(() => void navigate({ to: "/login" }))}
                className={itemClass}
              >
                <LogIn className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Sign in
              </Command.Item>
              <Command.Item
                value="launch checklist a11y security"
                onSelect={() => run(() => void navigate({ to: "/launch" }))}
                className={itemClass}
              >
                <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Launch checklist
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Studio actions">
              <Command.Item
                value="approve hitl accept"
                onSelect={() =>
                  run(() => {
                    if (!hitlVisible || !proposal) {
                      toast.message("No pending HitL proposal");
                      return;
                    }
                    applyProposal();
                    setHitlVisible(false);
                    setPhase("done");
                    pushStatus("Approved via Cmd+K");
                    refreshPreview();
                    toast.success("Approved via Cmd+K");
                  })
                }
                className={itemClass}
              >
                <Check className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Approve current diff
              </Command.Item>
              <Command.Item
                value="stop abort pipeline"
                onSelect={() =>
                  run(() => {
                    if (!isStreaming) {
                      toast.message("Pipeline not running");
                      return;
                    }
                    abort();
                  })
                }
                className={itemClass}
              >
                <Square className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Stop generation
              </Command.Item>
              <Command.Item
                value="publish deploy one click"
                onSelect={() => run(() => setPublishOpen(true))}
                className={itemClass}
              >
                <Rocket className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Publish project
              </Command.Item>
              <Command.Item
                value="pane chat mobile"
                onSelect={() => run(() => setMobilePane("chat"))}
                className={itemClass}
              >
                Chat pane
              </Command.Item>
              <Command.Item
                value="pane code editor mobile"
                onSelect={() => run(() => setMobilePane("code"))}
                className={itemClass}
              >
                Code pane
              </Command.Item>
              <Command.Item
                value="pane preview mobile"
                onSelect={() => run(() => setMobilePane("preview"))}
                className={itemClass}
              >
                Preview pane
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Preview device">
              <Command.Item
                value="device mobile"
                onSelect={() => run(() => setPreviewDevice("mobile"))}
                className={itemClass}
              >
                <Smartphone className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Mobile frame
              </Command.Item>
              <Command.Item
                value="device tablet"
                onSelect={() => run(() => setPreviewDevice("tablet"))}
                className={itemClass}
              >
                <Tablet className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Tablet frame
              </Command.Item>
              <Command.Item
                value="device desktop"
                onSelect={() => run(() => setPreviewDevice("desktop"))}
                className={itemClass}
              >
                <MonitorSmartphone className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Desktop frame
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Theme">
              <Command.Item
                value="light theme"
                onSelect={() => setTheme("light")}
                className={itemClass}
              >
                <Sun className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Light theme
              </Command.Item>
              <Command.Item
                value="dark theme"
                onSelect={() => setTheme("dark")}
                className={itemClass}
              >
                <Moon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Dark theme
              </Command.Item>
              <Command.Item
                value="system theme"
                onSelect={() => setTheme("system")}
                className={itemClass}
              >
                <Monitor className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                System theme
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Project">
              <Command.Item
                value="new project"
                onSelect={() => run(() => void navigate({ to: "/dashboard" }))}
                className={itemClass}
              >
                <FolderPlus className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                New project
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

const itemClass = cn(
  "flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded-none min-h-11",
  "text-charcoal dark:text-cream",
  "data-[selected=true]:bg-terracotta data-[selected=true]:text-white",
  "aria-selected:bg-terracotta aria-selected:text-white",
);
