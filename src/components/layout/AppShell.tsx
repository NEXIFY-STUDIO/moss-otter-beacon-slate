import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * iPhone / mobile-safe full-viewport shell.
 * Styles live in `.app-shell` (styles.css): fixed + 100dvh + safe-area.
 */
export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): React.JSX.Element {
  return <div className={cn("app-shell", className)}>{children}</div>;
}
