import { useEffect, type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { RejectionPoll } from "@/components/editor/RejectionPoll";
import { initThemeListeners } from "@/stores/use-theme-store";

export function AppProviders({ children }: { children: ReactNode }): React.JSX.Element {
  useEffect(() => {
    return initThemeListeners();
  }, []);

  return (
    <AuthProvider>
      {children}
      <CommandPalette />
      <RejectionPoll />
    </AuthProvider>
  );
}
