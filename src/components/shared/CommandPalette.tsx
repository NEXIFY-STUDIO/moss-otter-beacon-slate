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
} from "lucide-react";
import { useUiStore } from "@/stores/use-ui-store";
import { useThemeStore, type ThemeMode } from "@/stores/use-theme-store";
import { DEMO_PROJECT_ID } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function CommandPalette(): React.JSX.Element {
  const open = useUiStore((s) => s.commandOpen);
  const setCommandOpen = useUiStore((s) => s.setCommandOpen);
  const setMode = useThemeStore((s) => s.setMode);
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
  "flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded-none",
  "text-charcoal dark:text-cream",
  "data-[selected=true]:bg-terracotta data-[selected=true]:text-white",
  "aria-selected:bg-terracotta aria-selected:text-white",
);
