import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { PublishDialog } from "@/components/shared/PublishDialog";
import { RejectionPoll } from "@/components/editor/RejectionPoll";
import { initThemeListeners } from "@/stores/use-theme-store";

export function AppProviders({ children }: { children: ReactNode }): React.JSX.Element {
  useEffect(() => {
    return initThemeListeners();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline shell optional */
    });
  }, []);

  return (
    <AuthProvider>
      {children}
      <CommandPalette />
      <PublishDialog />
      <RejectionPoll />
      <Toaster
        position="bottom-right"
        theme="system"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "border-2 border-charcoal/15 dark:border-cream/15 shadow-brutal-sm font-sans",
          },
        }}
      />
    </AuthProvider>
  );
}
