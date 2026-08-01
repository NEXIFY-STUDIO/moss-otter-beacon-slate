import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore, type ThemeMode } from "@/stores/use-theme-store";
import { cn } from "@/lib/utils";

const order: ThemeMode[] = ["light", "dark", "system"];

export function ThemeToggle({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const cycle = () => {
    const idx = order.indexOf(mode);
    const next = order[(idx + 1) % order.length] ?? "system";
    setMode(next);
  };

  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor;
  const label =
    mode === "dark" ? "Dark theme" : mode === "light" ? "Light theme" : "System theme";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to cycle.`}
      title={label}
      className={cn("shrink-0", className)}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </Button>
  );
}
