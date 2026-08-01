import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  applyResolved: (resolved: "light" | "dark") => void;
}

function resolveSystem(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyDocumentTheme(resolved: "light" | "dark"): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      resolved: "light",
      setMode: (mode) => {
        const resolved = mode === "system" ? resolveSystem() : mode;
        applyDocumentTheme(resolved);
        set({ mode, resolved });
      },
      applyResolved: (resolved) => {
        applyDocumentTheme(resolved);
        set({ resolved });
      },
    }),
    {
      name: "cosy-theme",
      partialize: (s) => ({ mode: s.mode }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const resolved =
          state.mode === "system" ? resolveSystem() : state.mode;
        applyDocumentTheme(resolved);
        state.applyResolved(resolved);
      },
    },
  ),
);

export function initThemeListeners(): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    const { mode, applyResolved } = useThemeStore.getState();
    if (mode === "system") {
      applyResolved(mq.matches ? "dark" : "light");
    }
  };
  mq.addEventListener("change", onChange);
  // Initial apply
  const { mode, applyResolved } = useThemeStore.getState();
  applyResolved(mode === "system" ? resolveSystem() : mode);
  return () => mq.removeEventListener("change", onChange);
}
